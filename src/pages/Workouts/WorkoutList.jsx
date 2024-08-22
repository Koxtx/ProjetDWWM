import React, { useContext, useEffect, useState } from "react";
import { WorkoutsContext } from "../../context/WorkoutsContext";
import AddWorkout from "./AddWorkout";
import { getWorkouts } from "../../apis/workouts";
import { UserContext } from "../../context/UserContext";

export default function WorkoutList() {
  const [workouts, setWorkouts] = useState([]);
  const { token } = useContext(UserContext);

  useEffect(() => {
    async function fetchWorkouts() {
      if (!token) {
        console.error("No token available");
        return;
      }
      try {
        const data = await getWorkouts(token);
        setWorkouts(data);
      } catch (error) {
        console.error("Failed to fetch workouts:", error);
      }
    }
    fetchWorkouts();
  }, []);

  return (
    <main className="d-flex flex-column center flex-fill">
      <AddWorkout />
      <h2>Your Workouts</h2>
      {workouts.length === 0 ? (
        <p>No workouts found</p>
      ) : (
        workouts.map((workout) => (
          <div key={workout._id}>
            <h3>{workout.name}</h3>
            <ul>
              {workout.exercises.map((exercise) => (
                <li key={exercise._id}>{exercise.name}</li>
              ))}
            </ul>
          </div>
        ))
      )}
    </main>
  );
}
