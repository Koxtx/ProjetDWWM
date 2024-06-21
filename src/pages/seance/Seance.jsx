import React, { useContext, useEffect, useState } from "react";
import souleveTerre from "../../image/souleveTerre.jpg";
import styles from "./Seance.module.scss";
import { NavLink } from "react-router-dom";
import Programme from "../../components/Seance/Programme";
import DailySeance from "../../components/Seance/DailySeance";
import { deleteSeance, getSeancesFromApi } from "../../apis/seance";
import { SeanceContext } from "../../context/SeanceContext";
import AddSeance from "../../components/Seance/components/AddSeance";
import EditSeance from "../../components/Seance/components/EditSeance";

export default function Seance() {
  const { seances, setSeances } = useContext(SeanceContext);
  const [editSeance, setEditSeance] = useState(null);
  const [selectedSeance, setSelectedSeance] = useState(null);
  const [addingSeance, setAddingSeance] = useState(false);
  console.log(seances);
  useEffect(() => {
    async function fetchSeances() {
      try {
        const data = await getSeancesFromApi();
        setSeances(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des séances:", error);
      }
    }
    fetchSeances();
  }, []);

  const handleEdit = (seance) => {
    setEditSeance(seance);
  };

  const handleDelete = async (id) => {
    try {
      await deleteSeance(id);
      setSeances(seances.filter((seance) => seance._id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression de la séance:", error);
    }
  };

  const handleSelectSeance = (seance) => {
    setSelectedSeance(seance);
  };

  const currentDay = new Date().toLocaleString("fr-FR", { weekday: "long" });

  const todaySeance = seances.find(
    (seance) => seance.day.toLowerCase() === currentDay.toLowerCase()
  );

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
          <DailySeance seance={todaySeance} />
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
