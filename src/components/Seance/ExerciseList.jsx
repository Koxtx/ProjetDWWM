// src/components/ExerciseList.js
import React, { useEffect, useState } from "react";

const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/exercices/")
      .then((response) => response.json())
      .then((data) => setExercises(data.results))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div>
      <h1>Exercise List</h1>
      <ul>
        {exercises.map((exercise) => (
          <li key={exercise.id}>{exercise.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ExerciseList;
