import React, { useContext } from "react";
import { MealContext } from "../../context/MealContext";

export default function Progress() {
  const { meals, goals } = useContext(MealContext);

  const totalConsumed = meals.reduce(
    (acc, meal) => ({
      calories: acc.calories + meal.totalCalories,
      protein: acc.protein + meal.totalProtein,
      carbs: acc.carbs + meal.totalCarbs,
      fat: acc.fat + meal.totalFat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  return (
    <div>
      <h2>Progrès des objectifs</h2>
      <p>
        Calories consommées: {totalConsumed.calories} / {goals.dailyCalories}
      </p>
      <p>
        Protéines consommées: {totalConsumed.protein}g / {goals.dailyProtein}g
      </p>
      <p>
        Glucides consommés: {totalConsumed.carbs}g / {goals.dailyCarbs}g
      </p>
      <p>
        Lipides consommés: {totalConsumed.fat}g / {goals.dailyFat}g
      </p>
    </div>
  );
}
