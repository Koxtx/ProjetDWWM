import React, { useContext, useEffect, useState } from "react";
import { postWorkout } from "../../apis/workouts";
import { getExercises } from "../../apis/exercises";
import { UserContext } from "../../context/UserContext";

export default function AddWorkout() {
  const [exercises, setExercises] = useState([]);
  const [workoutName, setWorkoutName] = useState("");
  const [selectedExercises, setSelectedExercises] = useState([]);
  const { token } = useContext(UserContext);

  useEffect(() => {
    async function fetchExercises() {
      try {
        const data = await getExercises(token);
        setExercises(data);
      } catch (error) {
        console.error("Failed to fetch exercises:", error);
      }
    }

    if (token) {
      fetchExercises();
    } else {
      console.error("No token available to fetch exercises");
    }
  }, [token]);

  const handleExerciseChange = (id, field, value) => {
    setSelectedExercises((prev) =>
      prev.map((exercise) =>
        exercise.id === id ? { ...exercise, [field]: value } : exercise
      )
    );
  };

  const handleSelectExercise = (id) => {
    if (selectedExercises.some((exercise) => exercise.id === id)) {
      setSelectedExercises((prev) =>
        prev.filter((exercise) => exercise.id !== id)
      );
    } else {
      setSelectedExercises((prev) => [
        ...prev,
        { id, sets: 0, reps: 0, weight: 0 },
      ]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      console.error("No token available");
      return;
    }

    const workoutData = {
      name: workoutName,
      exercises: selectedExercises.map((exercise) => ({
        exercise: exercise.id,
        sets: exercise.sets,
        reps: exercise.reps,
        weight: exercise.weight,
      })),
    };

    try {
      const response = await postWorkout(workoutData, token);
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
        required
      />

      {exercises.map((exercise) => (
        <div key={exercise._id}>
          <label>
            <input
              type="checkbox"
              onChange={() => handleSelectExercise(exercise._id)}
            />
            {exercise.name}
          </label>

          {selectedExercises.some((e) => e.id === exercise._id) && (
            <div>
              <label>
                Sets:
                <input
                  type="number"
                  value={
                    selectedExercises.find((e) => e.id === exercise._id).sets
                  }
                  onChange={(e) =>
                    handleExerciseChange(exercise._id, "sets", e.target.value)
                  }
                  required
                />
              </label>
              <label>
                Reps:
                <input
                  type="number"
                  value={
                    selectedExercises.find((e) => e.id === exercise._id).reps
                  }
                  onChange={(e) =>
                    handleExerciseChange(exercise._id, "reps", e.target.value)
                  }
                  required
                />
              </label>
              <label>
                Weight (kg):
                <input
                  type="number"
                  value={
                    selectedExercises.find((e) => e.id === exercise._id).weight
                  }
                  onChange={(e) =>
                    handleExerciseChange(exercise._id, "weight", e.target.value)
                  }
                  required
                />
              </label>
            </div>
          )}
        </div>
      ))}
      <button type="submit">Create Workout</button>
    </form>
  );
}
