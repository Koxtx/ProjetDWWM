const BASE_URL = "http://localhost:5000/api/prs";

export async function getPRs() {
  try {
    const response = await fetch(`${BASE_URL}/`);
    const prs = await response.json();
    return prs;
  } catch (error) {
    console.error(error);
  }
}

export async function createPR(pr) {
  try {
    const response = await fetch(`${BASE_URL}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pr),
    });
    const newPR = await response.json();
    return newPR;
  } catch (error) {
    console.error(error);
  }
}

export async function updatePR(id, pr) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pr),
    });
    const updatedPR = await response.json();
    return updatedPR;
  } catch (error) {
    console.error(error);
  }
}

export async function deletePR(id) {
  try {
    await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error(error);
  }
}
