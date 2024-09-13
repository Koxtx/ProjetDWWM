import React, { useContext } from "react";
import styles from "./HomePage.module.scss";


import { UserContext } from "../../context/UserContext";
import GoalList from "../../components/Goal/GoalList";
import AddGoal from "../../components/Goal/AddGoal";
import ExerciseList from "../../components/Exercises/ExerciseList";
import AddExercisde from "../../components/Exercises/AddExercisde";
import SearchExercises from "../../components/Exercises/SearchExercises";

export default function HomePage() {
  const { user } = useContext(UserContext);

  return (
    <main>
     
      <GoalList />
      <AddGoal />
      <SearchExercises />
      <ExerciseList />
      <AddExercisde />
    </main>
  );
}
