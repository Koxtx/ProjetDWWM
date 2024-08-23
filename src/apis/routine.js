const API_URL = "http://localhost:5000/api/routine";

export async function addRoutine(userId, name, exercises, token) {
  const response = await fetch(`${API_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token, // Ajout du token ici
    },
    body: JSON.stringify({ userId, name, exercises }),
  });

  if (response.ok) {
    const routine = await response.json();
    console.log("Routine ajoutée:", routine);
    return routine;
  } else {
    console.error("Erreur lors de l'ajout de la routine");
  }
}
export async function getRoutines(userId, token) {
  const response = await fetch(`${API_URL}/`, {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token, // Ajout du token ici
    },
  });

  if (response.ok) {
    const routines = await response.json();
    console.log("Routines de l'utilisateur:", routines);
    return routines;
  } else {
    console.error("Erreur lors de la récupération des routines");
  }
}
