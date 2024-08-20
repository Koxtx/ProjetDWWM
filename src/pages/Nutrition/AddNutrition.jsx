import React, { useContext, useState } from "react";
import { NutritionContext } from "../../context/NutritionContext";

export default function AddNutrition() {
  const [meal, setMeal] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");
  const { addNutrition } = useContext(NutritionContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addNutrition({ name: meal, calories, protein, carbs, fat });
    setMeal("");
    setCalories("");
    setProtein("");
    setCarbs("");
    setFat("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Meal"
        value={meal}
        onChange={(e) => setMeal(e.target.value)}
      />
      <input
        type="number"
        placeholder="Calories"
        value={calories}
        onChange={(e) => setCalories(e.target.value)}
      />
      <input
        type="number"
        placeholder="Protein"
        value={protein}
        onChange={(e) => setProtein(e.target.value)}
      />
      <input
        type="number"
        placeholder="Carbs"
        value={carbs}
        onChange={(e) => setCarbs(e.target.value)}
      />
      <input
        type="number"
        placeholder="Fat"
        value={fat}
        onChange={(e) => setFat(e.target.value)}
      />
      <button type="submit">Add Nutrition</button>
    </form>
  );
}
