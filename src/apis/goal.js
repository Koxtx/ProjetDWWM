const BASE_URL = "http://localhost:5000/api/recettes";

export async function getGoals() {
  try {
    const response = await fetch(`${BASE_URL}/goals`);
    const goals = await response.json();
  } catch (error) {
    console.error("Error", error);
  }
}

export async function postGoal(goal) {
  try {
    const response = await fetch(`${BASE_URL}/goals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(goal),
    });
    const newGoal = await response.json();
    return newGoal;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function updateGoal(_id, goal) {
  try {
    const response = await fetch(`${BASE_URL}/goals/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(goal),
    });
    const updatedGoal = await response.json();
    return updatedGoal;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteGoal(goal, _id) {
  try {
    await fetch(`${BASE_URL}/goals/${_id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error(error);
  }
}

export async function fetchRecipesByNutrients({
  minCarbs,
  maxCarbs,
  minProtein,
  maxProtein,
}) {
  try {
    const response = await fetch(
      `${BASE_URL}/searchByNutrients?minCarbs=${minCarbs}&maxCarbs=${maxCarbs}&minProtein=${minProtein}&maxProtein=${maxProtein}`
    );
    const data = await response.json();
    if (data.message) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    console.error("Error fetching recipes by nutrients:", error);
    throw error;
  }
}

export async function fetchFoodInfo(foodId) {
  try {
    const response = await fetch(`${BASE_URL}/food/info?foodId=${foodId}`);
    const data = await response.json();
    if (data.message) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    console.error("Error fetching food information:", error);
    throw error;
  }
}

export async function convertUnits({
  ingredientName,
  sourceAmount,
  sourceUnit,
  targetUnit,
}) {
  try {
    const response = await fetch(
      `${BASE_URL}/food/convert?ingredientName=${ingredientName}&sourceAmount=${sourceAmount}&sourceUnit=${sourceUnit}&targetUnit=${targetUnit}`
    );
    const data = await response.json();
    if (data.message) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    console.error("Error converting units:", error);
    throw error;
  }
}

export async function generateMealPlan({
  timeFrame,
  targetCalories,
  diet,
  exclude,
}) {
  try {
    const response = await fetch(
      `${BASE_URL}/mealplanner?timeFrame=${timeFrame}&targetCalories=${targetCalories}&diet=${diet}&exclude=${exclude}`
    );
    const data = await response.json();
    if (data.message) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    console.error("Error generating meal plan:", error);
    throw error;
  }
}
