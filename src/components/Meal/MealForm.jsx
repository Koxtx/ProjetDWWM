import React, { useContext, useState } from "react";
import { MealContext } from "../../context/MealContext";
import { postMeal } from "../../apis/meal";

export default function MealForm() {
  const { meals, setMeals, ingredients } = useContext(MealContext);
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [option, setOption] = useState("simple");
  const [meal, setMeal] = useState({
    name: "",
    ingredients: [],
    totalCalories: "",
    totalProtein: "",
    totalCarbs: "",
    totalFat: "",
  });

  const handleMealChange = (e) => {
    const { name, value } = e.target;
    setMeal({ ...meal, [name]: value });
  };

  const handleIngredientChange = (e) => {
    setSelectedIngredient(e.target.value);
  };

  const addIngredient = () => {
    if (selectedIngredient) {
      const ingredient = ingredients.find(
        (ing) => ing._id === selectedIngredient
      );
      if (ingredient) {
        setMeal({ ...meal, ingredients: [...meal.ingredients, ingredient] });
        setSelectedIngredient("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newMeal = await postMeal(meal);
      setMeals([...meals, newMeal]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Suivi de l'Alimentation</h1>
      <div>
        <button onClick={() => setOption("simple")}>Simple</button>
        <button onClick={() => setOption("detailed")}>Détaillé</button>
        <button onClick={() => setOption("common")}>Commun</button>
      </div>

      {option === "simple" && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={meal.name}
            onChange={handleMealChange}
            placeholder="Nom du repas"
            required
          />
          <input
            type="number"
            name="totalCalories"
            value={meal.totalCalories}
            onChange={handleMealChange}
            placeholder="Calories"
            required
          />
          <input
            type="number"
            name="totalProtein"
            value={meal.totalProtein}
            onChange={handleMealChange}
            placeholder="Protéines"
            required
          />
          <input
            type="number"
            name="totalCarbs"
            value={meal.totalCarbs}
            onChange={handleMealChange}
            placeholder="Glucides"
            required
          />
          <input
            type="number"
            name="totalFat"
            value={meal.totalFat}
            onChange={handleMealChange}
            placeholder="Lipides"
            required
          />
          <button type="submit">Ajouter le repas</button>
        </form>
      )}

      {option === "detailed" && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={meal.name}
            onChange={handleMealChange}
            placeholder="Nom du repas"
            required
          />
          <h3>Ingrédients</h3>
          {meal.ingredients.map((ing, index) => (
            <div key={index}>
              {ing.name} - {ing.calories} Calories, {ing.protein}g Protéines,{" "}
              {ing.carbs}g Glucides, {ing.fat}g Lipides
            </div>
          ))}
          <select value={selectedIngredient} onChange={handleIngredientChange}>
            <option value="" disabled>
              Sélectionner un ingrédient
            </option>
            {ingredients.map((ingredient) => (
              <option key={ingredient._id} value={ingredient._id}>
                {ingredient.name} - {ingredient.calories} Calories,{" "}
                {ingredient.protein}g Protéines, {ingredient.carbs}g Glucides,{" "}
                {ingredient.fat}g Lipides
              </option>
            ))}
          </select>
          <button type="button" onClick={addIngredient}>
            Ajouter l'ingrédient
          </button>
          <button type="submit">Ajouter le repas</button>
        </form>
      )}

      {option === "common" && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={meal.name}
            onChange={handleMealChange}
            placeholder="Nom du repas"
            required
          />
          <h3>Ingrédients Communs</h3>
          {meal.ingredients.map((ing, index) => (
            <div key={index}>
              {ingredients.find((i) => i._id === ing._id)?.name}
            </div>
          ))}
          <select value={selectedIngredient} onChange={handleIngredientChange}>
            <option value="" disabled>
              Sélectionner un ingrédient
            </option>
            {ingredients.map((ingredient) => (
              <option key={ingredient._id} value={ingredient._id}>
                {ingredient.name} - {ingredient.calories} Calories,{" "}
                {ingredient.protein}g Protéines, {ingredient.carbs}g Glucides,{" "}
                {ingredient.fat}g Lipides
              </option>
            ))}
          </select>
          <button type="button" onClick={addIngredient}>
            Ajouter l'ingrédient
          </button>
          <button type="submit">Ajouter le repas</button>
        </form>
      )}
    </div>
  );
}
