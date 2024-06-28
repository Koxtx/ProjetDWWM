const BASE_URL = "http://localhost:5000/api/alimentation";

export async function getMeals() {
  try {
    const response = await fetch(`${BASE_URL}/meals`);
    const meals = await response.json();
    return Array.isArray(meals) ? meals : [];
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export async function getIngredients() {
  try {
    const response = await fetch(`${BASE_URL}/ingredients`);
    const ingredients = await response.json();
    return Array.isArray(ingredients) ? ingredients : [];
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export async function postMeal(meal) {
  try {
    const response = await fetch(`${BASE_URL}/meals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(meal),
    });
    const newMeal = await response.json();
    return newMeal;
  } catch (error) {
    console.error("Error:", error);
  }
}
