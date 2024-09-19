import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
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
        const data = await getIngredients(token);
        setIngredients(data.map(ingredient => ({ value: ingredient._id, label: ingredient.name })));
      } catch (error) {
        console.error("Échec du chargement des ingrédients :", error);
      }
    }
    fetchIngredients();
  }, [token]);

  const handleSelectIngredient = (selectedOptions) => {
    const selectedData = selectedOptions.map(option => ({
      id: option.value,
      name: option.label,
      quantity: 100, // Quantité par défaut
      calories: ingredients.find(ing => ing.value === option.value).calories || 0,
      protein: ingredients.find(ing => ing.value === option.value).protein || 0,
      carbs: ingredients.find(ing => ing.value === option.value).carbs || 0,
      fat: ingredients.find(ing => ing.value === option.value).fat || 0,
    }));

    setSelectedIngredients(selectedData);
  };

  const handleIngredientChange = (id, field, value) => {
    setSelectedIngredients((prev) =>
      prev.map((ingredient) =>
        ingredient.id === id ? { ...ingredient, [field]: value } : ingredient
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mealName || selectedIngredients.length === 0) {
      console.error("Le nom du repas et les ingrédients sont requis");
      return;
    }

    const newMeal = {
      name: mealName,
      ingredients: selectedIngredients.map((ingredient) => ({
        ingredient: ingredient.id,
        quantity: ingredient.quantity,
        calories: ingredient.calories,
        protein: ingredient.protein,
        carbs: ingredient.carbs,
        fat: ingredient.fat,
      })),
    };

    try {
      const response = await postNutrition(newMeal, token);
      console.log("Repas créé :", response);
    } catch (error) {
      console.error("Échec de la création du repas :", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nom du repas"
        value={mealName}
        onChange={(e) => setMealName(e.target.value)}
        required
      />

      <label>Choisir des ingrédients :</label>
      <Select
        isMulti
        options={ingredients}
        onChange={handleSelectIngredient}
      />

      {selectedIngredients.length > 0 && (
        <div>
          {selectedIngredients.map((ingredient) => (
            <div key={ingredient.id} className="ingredient-card">
              <h4>{ingredient.name}</h4>
              <label>
                Quantité (g):
                <input
                  type="number"
                  value={ingredient.quantity}
                  onChange={(e) =>
                    handleIngredientChange(
                      ingredient.id,
                      "quantity",
                      e.target.value
                    )
                  }
                  required
                />
              </label>
              {/* Vous pouvez également afficher et modifier les valeurs nutritionnelles si nécessaire */}
            </div>
          ))}
        </div>
      )}

      <button type="submit">Créer le repas</button>
    </form>
  );
}
