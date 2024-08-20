import React, { useContext } from "react";
import styles from "./HomePage.module.scss";
import WomanHaltero from "../../image/woman-haltero.jpg";

import { UserContext } from "../../context/UserContext";
import GoalList from "../../components/Goal/GoalList";
import AddGoal from "../../components/Goal/AddGoal";
import ExerciseList from "../../components/Exercises/ExerciseList";
import AddExercisde from "../../components/Exercises/AddExercisde";

export default function HomePage() {
  const { user } = useContext(UserContext);

  return (
    <main>
      <section>
        <img
          src={WomanHaltero}
          className={`${styles.image}`}
          alt="Woman haltero"
        />
      </section>
      <GoalList />
      <AddGoal />
      <ExerciseList />
      <AddExercisde />
    </main>
  );
}
