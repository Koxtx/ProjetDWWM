const BASE_URL = "http://localhost:5000/api/seances";

export async function getSeancesFromApi() {
  try {
    const response = await fetch(`${BASE_URL}/`);
    const seances = await response.json();
    return seances;
  } catch (error) {
    console.error(error);
  }
}

export async function createSeance(seance) {
  try {
    const response = await fetch(`${BASE_URL}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(seance),
    });
    const newSeance = await response.json();
    return newSeance;
  } catch (error) {
    console.error(error);
  }
}

export async function updateSeance(id, seance) {
  console.log(id, seance);
  try {
    const response = await fetch(`${BASE_URL}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, seance }),
    });
    const updatedSeance = await response.json();
    return updatedSeance;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteSeance(id) {
  try {
    await fetch(`${BASE_URL}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
  } catch (error) {
    console.error(error);
  }
}
