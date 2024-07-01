import React, { useEffect, useState } from "react";
import { MealContext } from "../../context/MealContext";
import { getMeals, getIngredients } from "../../apis/meal";
import { getGoals, postGoal, updateGoal, deleteGoal } from "../../apis/goal";

export default function MealProvider({ children }) {
  const [meals, setMeals] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [goals, setGoals] = useState({
    dailyCalories: 0,
    dailyProtein: 0,
    dailyCarbs: 0,
    dailyFat: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mealsData = await getMeals();
        const ingredientsData = await getIngredients();
        const goalsData = await getGoals();

        setMeals(mealsData);
        setIngredients(ingredientsData);

        if (Array.isArray(goalsData) && goalsData.length > 0) {
          setGoals(goalsData[0]); // Assuming a single goal object for simplicity
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  const saveGoals = async (newGoals) => {
    try {
      let savedGoal;
      if (goals._id) {
        savedGoal = await updateGoal(goals._id, newGoals);
      } else {
        savedGoal = await postGoal(newGoals);
      }
      setGoals(savedGoal);
    } catch (error) {
      console.error("Error saving goals", error);
    }
  };
  return (
    <MealContext.Provider
      value={{
        meals,
        setMeals,
        ingredients,
        setIngredients,
        goals,
        setGoals,
        saveGoals,
      }}
    >
      {children}
    </MealContext.Provider>
  );
}
