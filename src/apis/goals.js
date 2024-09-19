const API_URL = "http://localhost:5000/api/goal";

export const postGoal = async (goalData, token) => {
  const response = await fetch(`${API_URL}/postgoal`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
    body: JSON.stringify(goalData), // Inclut les nouveaux champs `targetType`, `reps`, `weight`
  });
  return response.json();
};


export const putGoal = async (goalId, progress, token) => {
  const response = await fetch(`${API_URL}/putgoal/${goalId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
    body: JSON.stringify({ progress }),
  });
  return response.json();
};

export const getGoals = async (token) => {
  const response = await fetch(`${API_URL}/`, {
    method: "GET",
    headers: {
      "x-auth-token": token,
    },
  });
  return response.json();
};
