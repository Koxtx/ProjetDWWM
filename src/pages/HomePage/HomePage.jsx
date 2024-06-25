import React, { useContext, useState, useEffect } from "react";
import styles from "./HomePage.module.scss";
import WomanHaltero from "../../image/woman-haltero.jpg";
import { NavLink } from "react-router-dom";
import DailySeance from "../../components/Seance/DailySeance";
import { SeanceContext } from "../../context/SeanceContext";
import { getLastWeekPRs } from "../../apis/pr";

export default function HomePage() {
  const { seances, loading } = useContext(SeanceContext);
  const currentDay = new Date().toLocaleString("fr-FR", { weekday: "long" });
  const todaySeance = seances.find(
    (seance) => seance.day.toLowerCase() === currentDay.toLowerCase()
  );

  const [lastWeekPerformances, setLastWeekPerformances] = useState([]);

  useEffect(() => {
    if (todaySeance) {
      const exerciseIds = todaySeance.exercises.map((exercise) => exercise._id);

      getLastWeekPRs({ exerciseIds })
        .then((prs) => {
          setLastWeekPerformances(prs);
        })
        .catch((error) => {
          console.error("Error fetching last week performances:", error);
          setLastWeekPerformances([]);
        });
    } else {
      setLastWeekPerformances([]);
    }
  }, [todaySeance]);

  if (loading) {
    return <p>Chargement des séances...</p>;
  }

  return (
    <main>
      <section>
        <img
          src={WomanHaltero}
          className={`${styles.image}`}
          alt="Woman haltero"
        />
      </section>
      <section className="mb-20 mt-30 d-flex flex-column">
        <h3>Séance du jour :</h3>
        <DailySeance seance={todaySeance} />
      </section>

      <section className="mb-20 mt-30 d-flex flex-column">
        <h3>Performance précédente :</h3>
        {lastWeekPerformances.length > 0 ? (
          <ul>
            {lastWeekPerformances.map((pr) => (
              <li key={pr._id}>
                <p>Exercise ID: {pr.exerciseId}</p>
                <p>Best Reps: {pr.bestReps}</p>
                <p>Best Weight: {pr.bestWeight}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>
            Aucune performance de la semaine dernière trouvée ou c'est la
            première fois que vous effectuez cette séance aujourd'hui.
          </p>
        )}
      </section>

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
      <div>
        <ul>
          <NavLink end to="/Recettes">
            Tous
          </NavLink>
          <NavLink to="/Recettes/Petit-déjeuner">Petit-déjeuner</NavLink>
          <NavLink to="/Recettes/Déjeuner">Déjeuner</NavLink>
          <NavLink to="/Recettes/Collation">Collation</NavLink>
          <NavLink to="/Recettes/Dîner">Dîner</NavLink>
          <NavLink to="/Recettes/Dessert">Dessert</NavLink>
        </ul>
      </div>
    </main>
  );
}
