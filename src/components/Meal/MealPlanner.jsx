import React, { useState } from "react";
import { generateMealPlan } from "../../apis/goal";

export default function MealPlanner() {
  const [timeFrame, setTimeFrame] = useState("day");
  const [targetCalories, setTargetCalories] = useState(2000);
  const [diet, setDiet] = useState("");
  const [exclude, setExclude] = useState("");
  const [mealPlan, setMealPlan] = useState(null);
  const [error, setError] = useState("");

  const handleGeneratePlan = async () => {
    try {
      const data = await generateMealPlan({
        timeFrame,
        targetCalories,
        diet,
        exclude,
      });
      setMealPlan(data);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Planification des repas</h2>
      <select value={timeFrame} onChange={(e) => setTimeFrame(e.target.value)}>
        <option value="day">Jour</option>
        <option value="week">Semaine</option>
      </select>
      <input
        type="number"
        value={targetCalories}
        onChange={(e) => setTargetCalories(e.target.value)}
        placeholder="Calories cibles"
      />
      <input
        type="text"
        value={diet}
        onChange={(e) => setDiet(e.target.value)}
        placeholder="Régime alimentaire (optionnel)"
      />
      <input
        type="text"
        value={exclude}
        onChange={(e) => setExclude(e.target.value)}
        placeholder="Exclure ingrédients (optionnel)"
      />
      <button onClick={handleGeneratePlan}>Générer le plan</button>
      {error && <p className="error">{error}</p>}
      {mealPlan && (
        <div>
          {mealPlan.meals.map((meal, index) => (
            <div key={index}>
              <h3>{meal.title}</h3>
              <p>Prêt en {meal.readyInMinutes} minutes</p>
              <p>
                Calories:{" "}
                {
                  meal.nutrition.nutrients.find(
                    (nutrient) => nutrient.name === "Calories"
                  ).amount
                }
              </p>
              <img src={meal.image} alt={meal.title} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
