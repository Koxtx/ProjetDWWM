import React, { useContext, useEffect, useState } from "react";
import { SeanceContext } from "../../context/SeanceContext";
import { getSeancesFromApi, deleteSeance } from "../../apis/seance";
import SeanceForm from "./SeanceForm";

export default function SeanceList() {
  const { seances, setSeances } = useContext(SeanceContext);
  const [editSeance, setEditSeance] = useState(null);

  useEffect(() => {
    async function getSeances() {
      const data = await getSeancesFromApi();
      setSeances(data);
      console.log(data);
    }
    getSeances();
  }, []);
  const handleEdit = (seance) => {
    setEditSeance(seance);
  };
  const handleDelete = async (id) => {
    await deleteSeance(id);
    setSeances(seances.filter((seance) => seance._id !== id));
  };

  return (
    <div>
      <h3>Liste des Séances</h3>
      <ul>
        {seances.map((seance) => (
          <>
            <li key={seance._id}>
              {seance.name}
              <button onClick={() => handleEdit(seance)}>Éditer</button>
              <button onClick={() => handleDelete(seance._id)}>
                Supprimer
              </button>
            </li>
            {editSeance && (
              <SeanceForm
                editSeance={editSeance}
                setEditSeance={setEditSeance}
                seance={seance}
              />
            )}
          </>
        ))}
      </ul>
    </div>
  );
}
