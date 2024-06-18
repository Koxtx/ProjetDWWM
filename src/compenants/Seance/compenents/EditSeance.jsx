import React, { useContext, useEffect, useState } from "react";
import { SeanceContext } from "../../../context/SeanceContext";
import { updateSeance } from "../../../apis/seance";
import ExerciseForm from "./ExerciceForm";

export default function EditSeance({ editSeance, setEditSeance }) {
  const { seances, setSeances } = useContext(SeanceContext);
  const [formState, setFormState] = useState({
    name: "",
    exercises: [],
    day: "",
  });

  useEffect(() => {
    if (editSeance) {
      setFormState(editSeance);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedSeance = await updateSeance(editSeance._id, formState);
    setSeances(
      seances.map((s) => (s._id === editSeance._id ? updatedSeance : s))
    );
    setEditSeance(null);
  };

  const handleAddExercise = (exercise) => {
    setFormState({
      ...formState,
      exercises: [...formState.exercises, exercise],
    });
  };

  const handleEditExercise = (updatedExercise, index) => {
    const updatedExercises = [...formState.exercises];
    updatedExercises[index] = updatedExercise;
    setFormState({ ...formState, exercises: updatedExercises });
  };

  const handleDeleteExercise = (index) => {
    const newExercises = formState.exercises.filter((_, i) => i !== index);
    setFormState({ ...formState, exercises: newExercises });
  };

  const handleCancel = () => {
    setEditSeance(null);
  };

  const days = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={formState.name}
          onChange={handleChange}
          placeholder="Nom de la séance"
        />

        <h3>Exercises</h3>
        {formState.exercises.map((exercise, index) => (
          <div key={index}>
            <ExerciseForm
              exercise={exercise}
              onSave={(updatedExercise) =>
                handleEditExercise(updatedExercise, index)
              }
            />
            <button onClick={() => handleDeleteExercise(index)}>
              Supprimer l'exercice
            </button>
          </div>
        ))}
        <ExerciseForm onSave={handleAddExercise} />
        <button type="submit">Enregistrer les modifications</button>
        <button type="button" onClick={handleCancel}>
          Annuler
        </button>
      </form>
    </div>
  );
}
