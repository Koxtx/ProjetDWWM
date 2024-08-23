const API_URL = "http://localhost:5000/api/progress";

export async function addProgress(userId, weight, reps, exerciseId, token) {
  const response = await fetch(`${API_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token, // Ajout du token ici
    },
    body: JSON.stringify({ userId, weight, reps, exerciseId }),
  });

  if (response.ok) {
    const progress = await response.json();
    console.log("Progrès ajouté:", progress);
    return progress;
  } else {
    console.error("Erreur lors de l'ajout des progrès");
  }
}
export async function getProgress(userId, token) {
  const response = await fetch(`${API_URL}/`, {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  });

  if (response.ok) {
    const progress = await response.json();
    console.log("Progrès de l'utilisateur:", progress);
    return progress;
  } else {
    console.error("Erreur lors de la récupération des progrès");
  }
}
