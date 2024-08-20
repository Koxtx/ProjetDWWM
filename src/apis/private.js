// src/apis/private.js
const API_URL = "http://localhost:5000/api/private";

export const getUserProfile = async (token) => {
  const response = await fetch(`${API_URL}/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  });
  return response.json();
};

export const updateUserProfile = async (userData, token) => {
  const response = await fetch(`${API_URL}/putprofile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Failed to update profile");
  }

  return response.json();
};
