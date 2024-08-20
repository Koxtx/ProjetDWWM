import React, { useContext, useEffect, useState } from "react";
import { WorkoutsContext } from "../../context/WorkoutsContext";

export default function PaginatedWorkoutList() {
  const { workouts, fetchWorkouts } = useContext(WorkoutsContext);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchWorkouts(page);
  }, []);
  return (
    <div>
      {workouts.map((workout) => (
        <div key={workout._id}>
          <h3>{new Date(workout.date).toLocaleDateString()}</h3>
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
      <button onClick={() => setPage(page > 1 ? page - 1 : 1)}>Previous</button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
}
