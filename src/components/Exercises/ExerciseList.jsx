import React, { useContext, useState } from "react";
import { ExerciseContext } from "../../context/ExerciseContext";
import parse from "html-react-parser";
import styles from "./Exercise.module.scss";

export default function ExerciseList() {
  const { exercises, loading } = useContext(ExerciseContext);

  // États pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 5; // Nombre d'exercices par page

  if (loading) return <p>Loading...</p>;

  // Logique de pagination
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );

  // Navigation de page
  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  // Limiter les boutons de navigation
  const isNextDisabled = indexOfLastExercise >= exercises.length;
  const isPrevDisabled = currentPage === 1;

  return (
    <div>
      <div className={`${styles.liste}`}>
        {currentExercises.length === 0 ? (
          <p>No exercises found</p>
        ) : (
          currentExercises.map((exercise) => (
            <div
              key={exercise._id}
              className={`card dflex flex-column center ${styles.card}`}
            >
              <img src={exercise.imageUrl} alt={exercise.name} />
              <h3>{exercise.name}</h3>
              <p>Primary Muscle: {exercise.primaryMuscle}</p>
              <p>
                Secondary Muscles:{" "}
                {exercise.secondaryMuscles.length
                  ? exercise.secondaryMuscles.join(", ")
                  : "None"}
              </p>
              <p>Equipment: {exercise.equipment || "None"}</p>
              <p>
                Description:{" "}
                {parse(exercise.description || <p>No description available</p>)}
              </p>
            </div>
          ))
        )}
      </div>
      <div className="d-flex flex-row center mb-10">
        <button
          className="btn btn-primary mr-15"
          onClick={prevPage}
          disabled={isPrevDisabled}
        >
          Précédent
        </button>
        <span>
          Page {currentPage} / {Math.ceil(exercises.length / exercisesPerPage)}
        </span>
        <button
          className="btn btn-primary ml-10"
          onClick={nextPage}
          disabled={isNextDisabled}
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
