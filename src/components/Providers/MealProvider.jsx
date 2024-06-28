import React, { useEffect, useState } from "react";
import { MealContext } from "../../context/MealContext";
import { getMeals, getIngredients } from "../../apis/meal";

export default function MealProvider({ children }) {
  const [meals, setMeals] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const mealsData = await getMeals();
        setMeals(mealsData || []);
      } catch (error) {
        console.error("Error:", error);
        setMeals([]); // Assurez-vous que meals est un tableau
      }
    };
    const fetchIngredients = async () => {
      try {
        const ingredientsData = await getIngredients();
        setIngredients(ingredientsData || []);
      } catch (error) {
        console.error("Error:", error);
        setIngredients([]); // Assurez-vous que ingredients est un tableau
      }
    };

    fetchMeals();
    fetchIngredients();
  }, []);

  return (
    <MealContext.Provider
      value={{ meals, setMeals, ingredients, setIngredients }}
    >
      {children}
    </MealContext.Provider>
  );
}
