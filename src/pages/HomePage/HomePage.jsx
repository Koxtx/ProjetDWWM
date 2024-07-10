import React, { useContext } from "react";
import styles from "./HomePage.module.scss";
import WomanHaltero from "../../image/woman-haltero.jpg";
import { NavLink } from "react-router-dom";
import DailySeance from "../../components/Seance/DailySeance";
import { SeanceContext } from "../../context/SeanceContext";

export default function HomePage() {
  const { seances, loading } = useContext(SeanceContext);
  const currentDay = new Date().toLocaleString("fr-FR", { weekday: "long" });
  const todaySeance = seances.find(
    (seance) => seance.day.toLowerCase() === currentDay.toLowerCase()
  );

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
          <NavLink to="/Recettes/lunch">Déjeuner</NavLink>
          <NavLink to="/Recettes/side dish">Accompagnement</NavLink>
          <NavLink to="/Recettes/antipasti">Antipasti</NavLink>
        </ul>
      </div>
    </main>
  );
}
