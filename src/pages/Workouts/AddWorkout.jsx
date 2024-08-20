import React, { useContext, useState } from "react";
import { WorkoutsContext } from "../../context/WorkoutsContext";

export default function AddWorkout() {
  const [exercises, setExercises] = useState([
    { name: "", sets: "", reps: "", weight: "" },
  ]);
  const { addWorkout } = useContext(WorkoutsContext);

  const handleChange = (index, field, value) => {
    const newExercises = exercises.slice();
    newExercises[index][field] = value;
    setExercises(newExercises);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addWorkout({ exercises });
  };
  return (
    <form onSubmit={handleSubmit}>
      {exercises.map((exercise, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Exercise name"
            value={exercise.name}
            onChange={(e) => handleChange(index, "name", e.target.value)}
          />
          <input
            type="number"
            placeholder="Sets"
            value={exercise.sets}
            onChange={(e) => handleChange(index, "sets", e.target.value)}
          />
          <input
            type="number"
            placeholder="Reps"
            value={exercise.reps}
            onChange={(e) => handleChange(index, "reps", e.target.value)}
          />
          <input
            type="number"
            placeholder="Weight"
            value={exercise.weight}
            onChange={(e) => handleChange(index, "weight", e.target.value)}
          />
        </div>
      ))}
      <button type="submit">Add Workout</button>
    </form>
  );
}
