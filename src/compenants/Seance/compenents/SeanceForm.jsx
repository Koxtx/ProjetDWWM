import React, { useContext, useEffect, useState } from "react";
import { SeanceContext } from "../../../context/SeanceContext";
import { updateSeance, createSeance } from "../../../apis/seance";

export default function SeanceForm({ editSeance, setEditSeance }) {
  const { seances, setSeances } = useContext(SeanceContext);
  const [formState, setFormState] = useState({
    name: "",
    exercises: [],
    day: "",
  });

  useEffect(() => {
    if (editSeance) {
      setFormState(editSeance);
    }
  }, [editSeance]);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editSeance) {
      const updatedSeance = await updateSeance(editSeance._id, formState);
      setSeances(
        seances.map((s) => (s._id === editSeance._id ? updatedSeance : s))
      );
    } else {
      const newSeance = await createSeance(formState);
      setSeances([...seances, newSeance]);
    }
    setEditSeance(null);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={formState.name}
          onChange={handleChange}
          placeholder="Nom de la séance"
        />

        <select
          value={formState.day}
          name="day"
          id="day"
          onChange={handleChange}
        >
          <option value="Lundi">Lundi</option>
          <option value="Mardi">Mardi</option>
          <option value="Mercredi">Mercredi</option>
          <option value="Jeudi">Jeudi</option>
          <option value="Vendredi">Vendredi</option>
          <option value="Samedi">Samedi</option>
          <option value="Dimanche">Dimanche</option>
        </select>

        <button type="submit">Enregistrer</button>
        <button type="button" onClick={() => setEditSeance(null)}>
          Annuler
        </button>
      </form>
    </div>
  );
}
