import React, { useContext, useEffect, useState } from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import PaginatedWorkoutList from "../../components/Dashboard/PaginatedWorkoutList";
import { getUserProfile, updateUserProfile } from "../../apis/private";
import { UserContext } from "../../context/UserContext";
import ExerciseDashboard from "../../components/Dashboard/ExerciseDashboard";
import UserProgress from "../../components/Progress/UserProgress";

export default function Profile() {
  const { user, token, setConnectedUser } = useContext(UserContext);
  const [formData, setFormData] = useState({ username: "", email: "" });
  useEffect(() => {
    const loadProfile = async () => {
      const response = await getUserProfile(token);
      if (response) {
        setFormData({ username: response.username, email: response.email });
      }
    };
    loadProfile();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await updateUserProfile(formData, token);
      setConnectedUser(updatedUser); // Met à jour le contexte utilisateur
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };
  return (
    <main>
      <h2>Profile</h2>
      <UserProgress />
      <ExerciseDashboard />
      <Dashboard />
      <PaginatedWorkoutList />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <button type="submit">Update Profile</button>
      </form>
    </main>
  );
}
