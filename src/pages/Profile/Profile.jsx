import React, { useContext, useEffect, useState } from "react";


import { getUserProfile, updateUserProfile } from "../../apis/private";
import { UserContext } from "../../context/UserContext";

import GoalList from "../../components/Goal/GoalList";
import AddGoal from "../../components/Goal/AddGoal";

export default function Profile() {
  const { user, token, setConnectedUser } = useContext(UserContext);
  const [formData, setFormData] = useState({ username: "", email: "" });
  const [showForm, setShowForm] = useState(false); // État pour contrôler l'affichage du formulaire

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
      setConnectedUser(updatedUser); // Met à jour le contexte utilisateur
      setShowForm(false); // Cache le formulaire après la mise à jour
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <main>
      <h2>Profil</h2>
      <GoalList />
      <AddGoal />

      {/* Bouton pour afficher le formulaire */}
      {!showForm && (
        <button onClick={() => setShowForm(true)}>Modifier le profil</button>
      )}

      {/* Affichage conditionnel du formulaire */}
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
          <button type="submit">Mettre à jour le profil</button>
          {/* Bouton pour cacher le formulaire */}
          <button type="button" onClick={() => setShowForm(false)}>
            Annuler
          </button>
        </form>
      )}
    </main>
  );
}
