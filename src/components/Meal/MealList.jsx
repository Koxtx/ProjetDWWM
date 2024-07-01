import React, { useContext } from "react";
import { MealContext } from "../../context/MealContext";

export default function MealList() {
  const { meals } = useContext(MealContext);

  return (
    <div>
      <h2>Liste des Repas</h2>
      {meals && meals.length > 0 ? (
        meals.map((meal) => (
          <div key={meal._id}>
            <h3>{meal.name}</h3>
            {meal.ingredients && meal.ingredients.length > 0 && (
              <div>
                <h4>Ingrédients :</h4>
                <ul>
                  {meal.ingredients.map((ingredient, index) => (
                    <li key={index}>
                      {ingredient.name} - {ingredient.calories} Calories,{" "}
                      {ingredient.protein}g Protéines, {ingredient.carbs}g
                      Glucides, {ingredient.fat}g Lipides
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <p>
              Total : {meal.totalCalories} Calories, {meal.totalProtein}g
              Protéines, {meal.totalCarbs}g Glucides, {meal.totalFat}g Lipides
            </p>
            <p>Date : {new Date(meal.date).toLocaleDateString()}</p>
          </div>
        ))
      ) : (
        <p>Aucun repas enregistré.</p>
      )}
    </div>
  );
}
