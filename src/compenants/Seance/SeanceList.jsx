import React, { useContext, useEffect, useState } from "react";
import { SeanceContext } from "../../context/SeanceContext";
import { getSeancesFromApi, deleteSeance } from "../../apis/seance";
import SeanceForm from "./compenents/SeanceForm";
import Programme from "./compenents/Programme";
import DailySeance from "./compenents/DailySeance";
import SeanceDetail from "./compenents/SeanceDetail";

export default function SeanceList() {
  const { seances, setSeances } = useContext(SeanceContext);
  const [editSeance, setEditSeance] = useState(null);
  const [selectedSeance, setSelectedSeance] = useState(null);

  useEffect(() => {
    async function getSeances() {
      const data = await getSeancesFromApi();
      setSeances(data);
    }
    getSeances();
  }, [setSeances]);

  const handleEdit = (seance) => {
    setEditSeance(seance);
  };

  const handleDelete = async (id) => {
    await deleteSeance(id);
    setSeances(seances.filter((seance) => seance._id !== id));
  };

  const handleSelectSeance = (seance) => {
    setSelectedSeance(seance);
  };

  console.log(selectedSeance);

  return (
    <div>
      <div>
        <h3>Programme:</h3>
        <Programme
          seances={seances}
          onSelectSeance={handleSelectSeance}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          editSeance={editSeance}
          setEditSeance={setEditSeance}
        />
      </div>
      <div>
        <h3>Seance du jour:</h3>
        <DailySeance
          seance={selectedSeance}
          onSeanceUpdate={() => setSelectedSeance(null)}
        />
      </div>
      <div>
        {selectedSeance && (
          <SeanceDetail
            seance={selectedSeance}
            onSeanceUpdate={() => setSelectedSeance(null)}
          />
        )}
      </div>
    </div>
  );
}
