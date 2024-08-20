import React, { useContext, useState } from "react";
import { postNutrition, getNutrition } from "../../apis/nutrition";
import { UserContext } from "../../context/UserContext";
import { NutritionContext } from "../../context/NutritionContext";

export default function NutritionProvider({ children }) {
  const [nutritionData, setNutritionData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(UserContext);
  const fetchNutrition = async () => {
    setLoading(true);
    if (token) {
      const response = await getNutrition(token);
      setNutritionData(response || []);
    } else {
      console.error("No token available");
    }
    setLoading(false);
  };

  const addNutrition = async (mealData) => {
    try {
      const response = await postNutrition(mealData, token);
      console.log("Response from server:", response); // Vérifiez la réponse ici
      setNutritionData((prevData) => [...prevData, response]);
    } catch (error) {
      console.error("Failed to add nutrition:", error);
    }
  };
  return (
    <NutritionContext.Provider
      value={{ nutritionData, fetchNutrition, addNutrition, loading }}
    >
      {children}
    </NutritionContext.Provider>
  );
}
