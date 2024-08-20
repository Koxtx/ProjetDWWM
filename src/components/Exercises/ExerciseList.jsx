import React, { useContext } from "react";
import { ExerciseContext } from "../../context/ExerciseContext";

export default function ExerciseList() {
  const { exercises, updateExercise, removeExercise, loading } =
    useContext(ExerciseContext);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {exercises.map((exercise) => (
        <div key={exercise._id}>
          <h3>{exercise.name}</h3>
          <p>Primary Muscle: {exercise.primaryMuscle}</p>
          <p>Secondary Muscles: {exercise.secondaryMuscles.join(", ")}</p>
          <p>Equipment: {exercise.equipment}</p>
          <p>Description: {exercise.description}</p>
          <img
            src={exercise.imageUrl}
            alt={exercise.name}
            style={{ width: "100px" }}
          />
          <button
            onClick={() =>
              updateExercise(exercise._id, { ...exercise, name: "New Name" })
            }
          >
            Update
          </button>
          <button onClick={() => removeExercise(exercise._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
