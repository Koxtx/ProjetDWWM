const API_URL = "http://localhost:5000/api/ingredient";

export const getIngredients = async (token) => {
  const response = await fetch(`${API_URL}/`, {
    method: "GET",
    headers: {
      "x-auth-token": token,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch ingredients");
  }

  return response.json();
};

export const postIngredient = async (ingredientData, token) => {
  const response = await fetch(`${API_URL}/postingredient`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
    body: JSON.stringify(ingredientData),
  });
  return response.json();
};
