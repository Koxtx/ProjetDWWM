import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
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
        setExercises(data.map(exercise => ({ value: exercise._id, label: exercise.name })));
      } catch (error) {
        console.error("Échec du chargement des exercices:", error);
      }
    }

    if (token) {
      fetchExercises();
    } else {
      console.error("Aucun token disponible pour récupérer les exercices");
    }
  }, [token]);

  const handleSelectExercise = (selectedOptions) => {
    const selectedData = selectedOptions.map(option => ({
      id: option.value,
      name: option.label,
      sets: 0,
      reps: 0,
      weight: 0,
    }));

    setSelectedExercises(selectedData);
  };

  const handleExerciseChange = (id, field, value) => {
    setSelectedExercises((prev) =>
      prev.map((exercise) =>
        exercise.id === id ? { ...exercise, [field]: value } : exercise
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      console.error("Aucun token disponible");
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
      console.log("Entraînement créé:", response);
    } catch (error) {
      console.error("Échec de la création de l'entraînement:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nom de l'entraînement"
        value={workoutName}
        onChange={(e) => setWorkoutName(e.target.value)}
        required
      />

      <label>Choisir des exercices :</label>
      <Select
        isMulti
        options={exercises}
        onChange={handleSelectExercise}
      />

      {selectedExercises.length > 0 && (
        <div>
          {selectedExercises.map((exercise) => (
            <div key={exercise.id} className="exercise-card">
              <h4>{exercise.name}</h4>
              <label>
                Séries:
                <input
                  type="number"
                  value={exercise.sets}
                  onChange={(e) =>
                    handleExerciseChange(exercise.id, "sets", e.target.value)
                  }
                  required
                />
              </label>
              <label>
                Répétitions:
                <input
                  type="number"
                  value={exercise.reps}
                  onChange={(e) =>
                    handleExerciseChange(exercise.id, "reps", e.target.value)
                  }
                  required
                />
              </label>
              <label>
                Poids (kg):
                <input
                  type="number"
                  value={exercise.weight}
                  onChange={(e) =>
                    handleExerciseChange(exercise.id, "weight", e.target.value)
                  }
                  required
                />
              </label>
            </div>
          ))}
        </div>
      )}

      <button type="submit">Créer l'entraînement</button>
    </form>
  );
}
