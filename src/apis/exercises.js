// src/apis/exercises.js
const API_URL = "http://localhost:5000/api/exercice";

export const getExercises = async (token) => {
  const response = await fetch(`${API_URL}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token, // Ajout du token ici
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch exercises");
  }

  return response.json();
};

export const postExercise = async (exerciseData, token) => {
  const response = await fetch(`${API_URL}/postexercice`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
    body: JSON.stringify(exerciseData),
  });
  return response.json();
};

export const putExercise = async (exerciseId, exerciseData, token) => {
  const response = await fetch(`${API_URL}/putexercice/${exerciseId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
    body: JSON.stringify(exerciseData),
  });
  return response.json();
};

export const deleteExercise = async (exerciseId, token) => {
  const response = await fetch(`${API_URL}/deletexercice/${exerciseId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  });
  return response.json();
};
