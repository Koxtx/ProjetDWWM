// src/apis/workouts.js
const API_URL = "http://localhost:5000/api/workout";

export const postWorkout = async (workoutData, token) => {
  const response = await fetch(`${API_URL}/postworkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
    body: JSON.stringify(workoutData),
  });
  return response.json();
};

export const getWorkouts = async (token) => {
  const response = await fetch("http://localhost:5000/api/workout/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token, // Assurez-vous que le token est correctement passé ici
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch workouts");
  }

  return response.json();
};
