import React, { useContext } from "react";
import styles from "./HomePage.module.scss";

import { UserContext } from "../../context/UserContext";

import ExerciseList from "../../components/Exercises/ExerciseList";
import AddExercisde from "../../components/Exercises/AddExercisde";
import SearchExercises from "../../components/Exercises/SearchExercises";

export default function HomePage() {
  const { user } = useContext(UserContext);

  return (
    <main>
      <div className={`d-flex flex-row center mt-30 ${styles.filter}`}>
        <AddExercisde />
        <SearchExercises />
      </div>
      <ExerciseList />
    </main>
  );
}
