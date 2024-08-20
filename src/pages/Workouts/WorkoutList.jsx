import React, { useContext, useEffect, useState } from "react";
import { WorkoutsContext } from "../../context/WorkoutsContext";
import AddWorkout from "./AddWorkout";

export default function WorkoutList() {
  const { workouts, fetchWorkouts, loading, token } =
    useContext(WorkoutsContext);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("date");
  const [order, setOrder] = useState("asc");
  const [applySort, setApplySort] = useState(false);
  useEffect(() => {
    if (applySort) {
      fetchWorkouts(page, 10, sortBy, order);
      setApplySort(false); // Réinitialise le bouton après l'application du tri
    }
  }, [page, sortBy, order, fetchWorkouts]);

  const handleApplySort = () => {
    console.log("Sort applied:", sortBy, order);
    setApplySort(true); // Déclenche l'effet de tri
  };

  if (loading)
    return <p className="d-flex flex-column center flex-fill">Loading...</p>;

  return (
    <main className="d-flex flex-column center flex-fill">
      <AddWorkout />
      <div>
        <label>
          Sort By:
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date">Date</option>
            <option value="name">Name</option>
          </select>
        </label>
        <label>
          Order:
          <select value={order} onChange={(e) => setOrder(e.target.value)}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
        <button onClick={handleApplySort}>Apply Sort</button>
      </div>
      <div className="d-flex flex-row mr-15 center flex-fill">
        {workouts.map((workout) => (
          <div key={workout._id} className="workout-item ">
            <h3>{new Date(workout.date).toLocaleDateString()}</h3>
            {workout.exercises && workout.exercises.length > 0 ? (
              <ul>
                {workout.exercises.map((exercise, index) => (
                  <li key={index} className="exercise-item">
                    <p>
                      <strong>Exercise Name:</strong> {exercise.name}
                    </p>
                    <p>
                      <strong>Sets:</strong> {exercise.sets}
                    </p>
                    <p>
                      <strong>Reps:</strong> {exercise.reps}
                    </p>
                    <p>
                      <strong>Weight:</strong> {exercise.weight} kg
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No exercises found for this workout.</p>
            )}
          </div>
        ))}
      </div>
      <div>
        <button onClick={() => setPage(page > 1 ? page - 1 : 1)}>
          Previous
        </button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </main>
  );
}
