import React, { useContext, useEffect, useState } from "react";
import { WorkoutsContext } from "../../context/WorkoutsContext";
import { postWorkout } from "../../apis/workouts";
import { getExercises } from "../../apis/exercises";
import { UserContext } from "../../context/UserContext";

export default function AddWorkout() {
  const [exercises, setExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [workoutName, setWorkoutName] = useState("");
  const { token } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      console.error("No token available");
      return;
    }
    try {
      const workoutData = { name: workoutName, exercises: selectedExercises };
      const response = await postWorkout(workoutData, token); // Passez le token ici
      console.log("Workout created:", response);
    } catch (error) {
      console.error("Failed to create workout:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Workout Name"
        value={workoutName}
        onChange={(e) => setWorkoutName(e.target.value)}
      />
      {exercises.map((exercise) => (
        <div key={exercise._id}>
          <label>
            <input
              type="checkbox"
              value={exercise._id}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedExercises([...selectedExercises, exercise._id]);
                } else {
                  setSelectedExercises(
                    selectedExercises.filter((id) => id !== exercise._id)
                  );
                }
              }}
            />
            {exercise.name}
          </label>
        </div>
      ))}
      <button type="submit">Create Workout</button>
    </form>
  );
}
