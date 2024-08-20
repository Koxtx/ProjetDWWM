// src/apis/nutrition.js
const API_URL = "http://localhost:5000/api/nutrition";

// src/apis/nutrition.js
export const postNutrition = async (mealData, token) => {
  const response = await fetch(`${API_URL}/postnutrition`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
    body: JSON.stringify({
      meals: [mealData], // Assurez-vous que 'meals' est un tableau contenant le repas
    }),
  });
  return response.json();
};

export const getNutrition = async (token) => {
  const response = await fetch(`${API_URL}/`, {
    method: "GET",
    headers: {
      "x-auth-token": token,
    },
  });
  return response.json();
};
