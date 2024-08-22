import React, { useContext, useEffect, useState } from "react";
import { getIngredients } from "../../apis/ingredients";
import { postNutrition } from "../../apis/nutrition";
import { UserContext } from "../../context/UserContext";

export default function AddNutrition() {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [mealName, setMealName] = useState("");
  const { token } = useContext(UserContext);

  useEffect(() => {
    async function fetchIngredients() {
      try {
        const data = await getIngredients(token); // Passez le token pour récupérer les ingrédients
        setIngredients(data);
      } catch (error) {
        console.error("Failed to fetch ingredients:", error);
      }
    }
    fetchIngredients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification des données avant l'envoi
    if (!mealName || selectedIngredients.length === 0) {
      console.error("Meal name and ingredients are required");
      return;
    }

    const newMeal = {
      name: mealName,
      ingredients: selectedIngredients.map((id) => ({
        ingredient: id,
        quantity: 100, // exemple : quantité fixe ou obtenue depuis l'interface
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
      })),
    };

    try {
      const response = await postNutrition(newMeal, token);
      console.log("Meal created:", response);
    } catch (error) {
      console.error("Failed to create meal:", error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Meal Name"
        value={mealName}
        onChange={(e) => setMealName(e.target.value)}
      />
      {ingredients.map((ingredient) => (
        <div key={ingredient._id}>
          <label>
            <input
              type="checkbox"
              value={ingredient._id}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedIngredients([
                    ...selectedIngredients,
                    ingredient._id,
                  ]);
                } else {
                  setSelectedIngredients(
                    selectedIngredients.filter((id) => id !== ingredient._id)
                  );
                }
              }}
            />
            {ingredient.name}
          </label>
        </div>
      ))}
      <button type="submit">Create Meal</button>
    </form>
  );
}
