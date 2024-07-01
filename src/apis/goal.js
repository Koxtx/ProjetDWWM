const BASE_URL = "http://localhost:5000/api/alimentation";

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
