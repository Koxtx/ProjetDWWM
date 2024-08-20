import React, { useContext, useEffect } from "react";
import { NutritionContext } from "../../context/NutritionContext";
import AddNutrition from "./AddNutrition";

export default function NutritionList() {
  const { nutritionData, fetchNutrition, loading } =
    useContext(NutritionContext);

  useEffect(() => {
    fetchNutrition();
  }, []);

  if (loading)
    return <p className="d-flex flex-column center flex-fill">Loading...</p>;
  return (
    <main className="d-flex flex-column center flex-fill">
      <AddNutrition />
      {nutritionData.length > 0 ? (
        nutritionData.map((nutritionItem) => (
          <div key={nutritionItem._id}>
            <h3>Date: {new Date(nutritionItem.date).toLocaleDateString()}</h3>
            {nutritionItem.meals.length > 0 ? (
              nutritionItem.meals.map((meal, index) => (
                <div key={index}>
                  <p>
                    <strong>Meal:</strong> {meal.name}
                  </p>
                  <p>
                    <strong>Calories:</strong> {meal.calories}
                  </p>
                  <p>
                    <strong>Protein:</strong> {meal.protein}g
                  </p>
                  <p>
                    <strong>Carbs:</strong> {meal.carbs}g
                  </p>
                  <p>
                    <strong>Fat:</strong> {meal.fat}g
                  </p>
                </div>
              ))
            ) : (
              <p>No meals found</p>
            )}
          </div>
        ))
      ) : (
        <p>No nutrition data found</p>
      )}
    </main>
  );
}
