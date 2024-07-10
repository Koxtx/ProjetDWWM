const BASE_URL = "http://localhost:5000/api/users";

export async function signup(values) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/users/inscription`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );

    const message = await response.json();
    return message;
  } catch (error) {
    console.error(error);
  }
}

export async function signin(values) {
  try {
    const response = await fetch(`http://localhost:5000/api/users/connexion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const newUser = await response.json();
    return newUser;
  } catch (error) {
    console.error(error);
  }
}

export async function passwordUsers(values) {
  try {
    const response = await fetch(`${BASE_URL}/forgetpassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const message = await response.json();
    return message;
  } catch (error) {
    console.error(error);
  }
}

export async function resetpassword(values) {
  console.log("API USERS FRONT", values);
  try {
    const response = await fetch(`${BASE_URL}/resetpassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const message = await response.json();
    return message;
  } catch (error) {
    console.error(error);
  }
}
export async function addFavorite(userId, itemId, itemType) {
  try {
    const response = await fetch(`${BASE_URL}/addFavorite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, itemId, itemType }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const addFavorite = await response.json();
    return addFavorite;
  } catch (error) {
    console.error("Error adding favorite:", error);
  }
}

export async function removeFavorite(userId, itemId, itemType) {
  try {
    const response = await fetch(`${BASE_URL}/removeFavorite`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, itemId, itemType }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const removeFavorite = await response.json();
    return removeFavorite;
  } catch (error) {
    console.error("Error removing favorite:", error);
  }
}
