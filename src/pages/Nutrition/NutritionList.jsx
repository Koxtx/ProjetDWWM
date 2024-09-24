import React, { useContext, useEffect, useState } from "react";
import styles from "./Nutrition.module.scss";
import AddNutrition from "./AddNutrition";
import { getNutrition } from "../../apis/nutrition";
import { UserContext } from "../../context/UserContext";

export default function NutritionList() {
  const [meals, setMeals] = useState([]);
  const { token } = useContext(UserContext);

  useEffect(() => {
    async function fetchMeals() {
      try {
        const data = await getNutrition(token);
        if (Array.isArray(data)) {
          setMeals(data);
        } else {
          console.error("Unexpected data format:", data);
        }
      } catch (error) {
        console.error("Failed to fetch meals:", error);
      }
    }
    fetchMeals();
  }, []);

  return (
    <main className="d-flex flex-column center flex-fill">
      <AddNutrition />
      <h2>Your Meals</h2>
      <div className={`${styles.listenutrition}`}>
        {meals.length === 0 ? (
          <p>No meals found or failed to load meals.</p>
        ) : (
          meals.map((meal) => (
            <div key={meal._id} className={`card ${styles.nutrition}`}>
              <h3>{meal.name}</h3>
              <ul>
                {meal.ingredients.map((ingredient) => (
                  <li key={ingredient.ingredient}>
                    {ingredient.ingredient.name}
                  </li>
                ))}
              </ul>
              <p>Total Calories: {meal.totalCalories}</p>
              <p>
                Protein: {meal.totalProtein}g, Carbs: {meal.totalCarbs}g, Fat:{" "}
                {meal.totalFat}g
              </p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
