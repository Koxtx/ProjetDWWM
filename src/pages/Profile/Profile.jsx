import React, { useContext, useEffect, useState } from "react";
import styles from "./Profile.module.scss";
import { getUserProfile, updateUserProfile } from "../../apis/private";
import { UserContext } from "../../context/UserContext";

import GoalList from "../../components/Goal/GoalList";
import AddGoal from "../../components/Goal/AddGoal";

export default function Profile() {
  const { user, token, setConnectedUser } = useContext(UserContext);
  const [formData, setFormData] = useState({ username: "", email: "" });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      const response = await getUserProfile(token);
      if (response) {
        setFormData({ username: response.username, email: response.email });
      }
    };
    loadProfile();
  }, [token]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await updateUserProfile(formData, token);
      setConnectedUser(updatedUser);
      setShowForm(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <main className="mhFull">
      <h2>{user.username}</h2>

      {!showForm && (
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          Modifier le profil
        </button>
      )}

      {showForm && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <button className="btn btn-primary" type="submit">
            Mettre à jour le profil
          </button>

          <button
            className="btn btn-primary"
            type="button"
            onClick={() => setShowForm(false)}
          >
            Annuler
          </button>
        </form>
      )}
      <AddGoal />
      <GoalList />
    </main>
  );
}
