import React, { useContext, useEffect, useState } from "react";
import souleveTerre from "../../image/souleveTerre.jpg";
import styles from "./Seance.module.scss";
import { NavLink } from "react-router-dom";
import Programme from "../../compenants/Seance/Programme";
import DailySeance from "../../compenants/Seance/DailySeance";
import { deleteSeance, getSeancesFromApi } from "../../apis/seance";
import { SeanceContext } from "../../context/SeanceContext";
import AddSeance from "../../compenants/Seance/compenents/AddSeance";
import EditSeance from "../../compenants/Seance/compenents/EditSeance";

export default function Seance() {
  const { seances, setSeances } = useContext(SeanceContext);
  const [editSeance, setEditSeance] = useState(null);
  const [selectedSeance, setSelectedSeance] = useState(null);
  const [addingSeance, setAddingSeance] = useState(false);
  console.log(seances);
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

  return (
    <main className="mhFull">
      <section>
        <img
          src={souleveTerre}
          className={`${styles.image}`}
          alt="Woman haltero"
        />
      </section>
      <section>
        <h2 className="mt-30 ml-10"> Séance :</h2>
      </section>
      <div>
        <div>
          <h3>Programme:</h3>
          <Programme
            seances={seances}
            onSelectSeance={handleSelectSeance}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
          {addingSeance ? (
            <AddSeance setAddingSeance={setAddingSeance} />
          ) : (
            <button onClick={() => setAddingSeance(true)}>
              Ajouter une Séance
            </button>
          )}
        </div>
        <div>
          <h3>Seance du jour:</h3>
          <DailySeance
            seance={selectedSeance}
            onSeanceUpdate={() => setSelectedSeance(null)}
          />
        </div>
      </div>

      <section>
        <div>
          <ul>
            <NavLink end to="/Exercices">
              Tous
            </NavLink>
            <NavLink to="/Exercices/Dos">Dos</NavLink>
            <NavLink to="/Exercices/Pectoraux">Pectoraux</NavLink>
            <NavLink to="/Exercices/Épaules">Épaules</NavLink>
            <NavLink to="/Exercices/Bras">Bras</NavLink>
            <NavLink to="/Exercices/Jambes">Jambes</NavLink>
            <NavLink to="/Exercices/Abdos">Abdos</NavLink>
          </ul>
        </div>
      </section>

      {editSeance && (
        <EditSeance editSeance={editSeance} setEditSeance={setEditSeance} />
      )}
    </main>
  );
}
