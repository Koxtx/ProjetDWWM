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
  try {
    console.log("Requête envoyée avec le token:", token); // Log du token

    const response = await fetch("http://localhost:5000/api/workout/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    });

    if (!response.ok) {
      console.error("Erreur HTTP:", response.status); // Log de l'erreur HTTP si elle survient
      throw new Error("Failed to fetch workouts");
    }

    const data = await response.json();
    console.log("Données récupérées depuis l'API:", data); // Log des données
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des séances:", error);
    throw error;
  }
};
