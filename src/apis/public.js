// src/apis/public.js
const API_URL = "http://localhost:5000/api/public";

export const getPublicExercises = async () => {
  const response = await fetch(`${API_URL}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};
