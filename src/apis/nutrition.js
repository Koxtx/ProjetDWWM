// src/apis/nutrition.js
const API_URL = "http://localhost:5000/api/nutrition";

export const postNutrition = async (nutritionData, token) => {
  const response = await fetch(
    "http://localhost:5000/api/nutrition/postnutrition",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token, // Assurez-vous que le token est bien passé ici
      },
      body: JSON.stringify(nutritionData),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to post nutrition");
  }

  return response.json();
};

export const getNutrition = async (token) => {
  const response = await fetch(`${API_URL}/`, {
    method: "GET",
    headers: {
      "x-auth-token": token,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch nutrition");
  }

  return response.json();
};
