import React, { useContext, useEffect } from "react";
import { WorkoutsContext } from "../../context/WorkoutsContext";

export default function WorkoutList() {
  const { workouts, fetchWorkouts, loading, token } =
    useContext(WorkoutsContext);
  useEffect(() => {
    if (token) {
      fetchWorkouts();
    }
  }, [fetchWorkouts, token]);
  if (loading) return <p>Loading...</p>;

  return (
    <main className="d-flex flex-column center flex-fill">
      <div>
        {workouts.map((workout) => (
          <div key={workout._id}>
            <h3>{workout.date}</h3>
            {workout.exercises.map((exercise, index) => (
              <div key={index}>
                <p>{exercise.name}</p>
                <p>{exercise.sets} sets</p>
                <p>{exercise.reps} reps</p>
                <p>{exercise.weight} kg</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}
