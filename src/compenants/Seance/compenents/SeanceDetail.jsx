import React, { useEffect, useState } from "react";
import ExerciceForm from "./compenents/ExerciceForm";

export default function SeanceDetail({ seance, onSeanceUpdate }) {
  const [editingExercise, setEditingExercise] = useState(null);
  const [addingExercise, setAddingExercise] = useState(false);

  const handleEditExercise = (exercise) => {
    setEditingExercise(exercise);
  };

  const handleDeleteExercise = async (exerciseId) => {
    try {
      await fetch(
        `http://localhost:5000/api/seances/${seance._id}/exercises/${exerciseId}`,
        {
          method: "DELETE",
        }
      );
      onSeanceUpdate();
    } catch (error) {
      console.error("Error deleting exercise:", error);
    }
  };

  const handleSaveExercise = async (exercise) => {
    const url = exercise._id
      ? `http://localhost:5000/api/seances/${seance._id}/exercises/${exercise._id}`
      : `http://localhost:5000/api/seances/${seance._id}/exercises`;

    try {
      const response = await fetch(url, {
        method: exercise._id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(exercise),
      });
      if (response.ok) {
        setEditingExercise(null);
        setAddingExercise(false);
        onSeanceUpdate();
      }
    } catch (error) {
      console.error("Error saving exercise:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/seances/${seance._id}`
        );
        const data = await response.json();
      } catch (error) {
        console.error("Error fetching session data:", error);
      }
    };
    fetchData();
  }, [seance._id]);

  return (
    <>
      <h2>{seance.name}</h2>
      <ul>
        {seance.exercises.map((exercise) => (
          <li key={exercise._id}>
            {exercise.name}: {exercise.sets} sets, {exercise.reps} reps,{" "}
            {exercise.rest}s rest, {exercise.weight}kg
            <button onClick={() => handleEditExercise(exercise)}>Edit</button>
            <button onClick={() => handleDeleteExercise(exercise._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      {editingExercise && (
        <ExerciceForm exercise={editingExercise} onSave={handleSaveExercise} />
      )}
      {addingExercise ? (
        <ExerciceForm onSave={handleSaveExercise} />
      ) : (
        <button onClick={() => setAddingExercise(true)}>Add Exercise</button>
      )}
    </>
  );
}
