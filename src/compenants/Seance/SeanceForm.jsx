import React, { useContext, useEffect, useState } from "react";
import { SeanceContext } from "../../context/SeanceContext";
import { updateSeance } from "../../apis/seance";

export default function SeanceForm({ seance, setEditSeance }) {
  console.log(seance);
  const { seances, setSeances } = useContext(SeanceContext);
  const [formState, setFormState] = useState({
    name: "",
    exercises: [],
    day: "",
  });

  useEffect(() => {
    if (seances) {
      setFormState(seances);
    }
  }, [seances]);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formState);
    if (seances) {
      const updatedSeance = await updateSeance(seance._id, formState);
      setSeances(
        seances.map((s) => (s._id === seances._id ? updatedSeance : s))
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
        <input
          name="day"
          value={formState.day}
          onChange={handleChange}
          placeholder="Jour"
        />
        <button type="submit">Enregistrer</button>
        <button type="button" onClick={() => setEditSeance(null)}>
          Annuler
        </button>
      </form>
    </div>
  );
}
