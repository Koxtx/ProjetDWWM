import React, { useState, useContext, useEffect } from "react";
import { MealContext } from "../../context/MealContext";

export default function GoalForm() {
  const { goals, saveGoals } = useContext(MealContext);
  const [goal, setGoal] = useState(goals);

  useEffect(() => {
    setGoal(goals);
  }, [goals]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGoal({ ...goal, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveGoals(goal);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Définir des objectifs</h2>
      <input
        type="number"
        name="dailyCalories"
        value={goal.dailyCalories}
        onChange={handleChange}
        placeholder="Objectif de calories"
        required
      />
      <input
        type="number"
        name="dailyProtein"
        value={goal.dailyProtein}
        onChange={handleChange}
        placeholder="Objectif de protéines"
        required
      />
      <input
        type="number"
        name="dailyCarbs"
        value={goal.dailyCarbs}
        onChange={handleChange}
        placeholder="Objectif de glucides"
        required
      />
      <input
        type="number"
        name="dailyFat"
        value={goal.dailyFat}
        onChange={handleChange}
        placeholder="Objectif de lipides"
        required
      />
      <button type="submit">Définir les objectifs</button>
    </form>
  );
}
