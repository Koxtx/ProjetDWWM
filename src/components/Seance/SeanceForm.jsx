import React, { useContext, useState, useEffect } from "react";
import { SeanceContext } from "../../context/SeanceContext";
import { updateSeance, createSeance } from "../../apis/seance";
import ExerciseForm from "./components/ExerciceForm";

export default function SeanceForm({
  editSeance,
  setEditSeance,
  setAddingSeance,
  addingSeance,
}) {
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
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddExercise = () => {
    setFormState((prevState) => ({
      ...prevState,
      exercises: [...prevState.exercises, { name: "", sets: [], rest: 0 }],
    }));
  };

  const handleSaveExercise = (exercise, index) => {
    const newExercises = formState.exercises.map((ex, i) =>
      i === index ? exercise : ex
    );
    setFormState({ ...formState, exercises: newExercises });
  };

  const handleDeleteExercise = (index) => {
    const newExercises = formState.exercises.filter((_, i) => i !== index);
    setFormState({ ...formState, exercises: newExercises });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editSeance) {
      const updatedSeance = await updateSeance(editSeance._id, formState);
      setSeances(
        seances.map((s) => (s._id === editSeance._id ? updatedSeance : s))
      );
      setEditSeance(null);
      setAddingSeance(false);
    } else {
      const newSeance = await createSeance(formState);
      setSeances([...seances, newSeance]);
      setAddingSeance(false);
    }
    setFormState({
      name: "",
      exercises: [],
      day: "",
    });
  };

  const handleCancel = () => {
    setEditSeance(null);
    setAddingSeance(false);
    setFormState({
      name: "",
      exercises: [],
      day: "",
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={formState.name}
          onChange={handleChange}
          placeholder="Nom de la séance"
        />
        <select name="day" value={formState.day} onChange={handleChange}>
          <option value="">Sélectionnez un jour</option>
          <option value="Lundi">Lundi</option>
          <option value="Mardi">Mardi</option>
          <option value="Mercredi">Mercredi</option>
          <option value="Jeudi">Jeudi</option>
          <option value="Vendredi">Vendredi</option>
          <option value="Samedi">Samedi</option>
          <option value="Dimanche">Dimanche</option>
        </select>
        <h3>Exercices</h3>
        {formState.exercises.map((exercise, index) => (
          <div key={index}>
            <ExerciseForm
              exercise={exercise}
              onSave={(updatedExercise) =>
                handleSaveExercise(updatedExercise, index)
              }
              onDelete={() => handleDeleteExercise(index)}
            />
          </div>
        ))}
        <button type="button" onClick={handleAddExercise}>
          Ajouter un exercice
        </button>
        <button type="submit">
          {editSeance ? "Mettre à jour la séance" : "Ajouter la séance"}
        </button>
        <button type="button" onClick={handleCancel}>
          Annuler
        </button>
      </form>
    </div>
  );
}
