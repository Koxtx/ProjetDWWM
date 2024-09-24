import React, { useContext, useEffect, useState } from "react";
import { WorkoutsContext } from "../../context/WorkoutsContext";
import AddWorkout from "./AddWorkout";
import { getWorkouts } from "../../apis/workouts";
import { UserContext } from "../../context/UserContext";
import styles from "./Workout.module.scss";

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
        console.log("Workouts fetched:", data);
        setWorkouts(data);
      } catch (error) {
        console.error("Failed to fetch workouts:", error);
      }
    }

    fetchWorkouts();
  }, []);
  console.log("Workouts state après setWorkouts:", workouts);

  return (
    <main className="d-flex flex-column center flex-fill">
      <AddWorkout />
      <h2>Vos Séances </h2>
      <div className={`${styles.listeworkout}`}>
        {workouts.length === 0 ? (
          <p>No workouts found</p>
        ) : (
          workouts.slice(0, 5).map((workout) => (
            <div key={workout._id} className={`card ${styles.workout}`}>
              <h3>{workout.name}</h3>
              <ul>
                {workout.exercises.map((exercise) => (
                  <li key={exercise._id}>
                    {exercise.name} sets:{exercise.sets} <br /> reps:
                    {exercise.reps}
                    <br />
                    weight:{exercise.weight}kg
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
