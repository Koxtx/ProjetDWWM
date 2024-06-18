import React, { useContext, useState } from "react";
import { SeanceContext } from "../../../context/SeanceContext";
import { createSeance } from "../../../apis/seance";
import ExerciseForm from "./ExerciceForm";

export default function AddSeance({ setAddingSeance }) {
  const { seances, setSeances } = useContext(SeanceContext);
  const [formState, setFormState] = useState({
    name: "",
    exercises: [],
    day: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newSeance = await createSeance(formState);
    setSeances([...seances, newSeance]);
    setAddingSeance(false);
  };

  const handleAddExercise = (exercise) => {
    setFormState({
      ...formState,
      exercises: [...formState.exercises, exercise],
    });
  };

  const handleDeleteExercise = (index) => {
    const newExercises = formState.exercises.filter((_, i) => i !== index);
    setFormState({ ...formState, exercises: newExercises });
  };

  const handleCancel = () => {
    setAddingSeance(false);
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
        <select name="day" value={formState.day} onChange={handleChange}>
          <option value="">Sélectionnez un jour</option>
          {days.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
        <h3>Exercises</h3>
        {formState.exercises.map((exercise, index) => (
          <div key={index}>
            <ExerciseForm
              exercise={exercise}
              onSave={(updatedExercise) => handleAddExercise(updatedExercise)}
            />
            <button onClick={() => handleDeleteExercise(index)}>
              Supprimer l'exercice
            </button>
            {console.log(formState)}
          </div>
        ))}
        <ExerciseForm onSave={handleAddExercise} />
        <button type="submit">Ajouter la séance</button>
        <button type="button" onClick={handleCancel}>
          Annuler
        </button>{" "}
      </form>
    </div>
  );
}
