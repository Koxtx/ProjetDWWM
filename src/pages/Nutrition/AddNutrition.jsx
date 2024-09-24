import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { getIngredients } from "../../apis/ingredients";
import { postNutrition } from "../../apis/nutrition";
import { UserContext } from "../../context/UserContext";
import styles from "./Nutrition.module.scss";

export default function AddNutrition() {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [mealName, setMealName] = useState("");
  const { token } = useContext(UserContext);

  useEffect(() => {
    async function fetchIngredients() {
      try {
        const data = await getIngredients(token);
        setIngredients(
          data.map((ingredient) => ({
            value: ingredient._id,
            label: ingredient.name,
            calories: ingredient.calories || 0,
            protein: ingredient.protein || 0,
            carbs: ingredient.carbs || 0,
            fat: ingredient.fat || 0,
          }))
        );
      } catch (error) {
        console.error("Échec du chargement des ingrédients :", error);
      }
    }
    fetchIngredients();
  }, [token]);

  const handleSelectIngredient = (selectedOptions) => {
    const selectedData = selectedOptions.map((option) => ({
      id: option.value,
      name: option.label,
      quantity: 100,
      calories:
        ingredients.find((ing) => ing.value === option.value).calories || 0,
      protein:
        ingredients.find((ing) => ing.value === option.value).protein || 0,
      carbs: ingredients.find((ing) => ing.value === option.value).carbs || 0,
      fat: ingredients.find((ing) => ing.value === option.value).fat || 0,
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
    <form onSubmit={handleSubmit} className={`${styles.addnutrition}`}>
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
        className={`mr-10 ${styles.select}`}
        s
        options={ingredients}
        onChange={handleSelectIngredient}
      />

      {selectedIngredients.length > 0 && (
        <div className={`${styles.qtite}`}>
          {selectedIngredients.map((ingredient) => (
            <div key={ingredient.id} className={`${styles.qtite}`}>
              <h4>{ingredient.name}</h4>
              <h5> Calories: {ingredient.calories}</h5>
              <p>
                Protein: {ingredient.protein}g, Carbs: {ingredient.carbs}g, Fat:{" "}
                {ingredient.fat}g
              </p>
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
            </div>
          ))}
        </div>
      )}

      <button className="btn btn-primary" type="submit">
        Créer le repas
      </button>
    </form>
  );
}
