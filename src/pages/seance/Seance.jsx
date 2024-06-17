import React from "react";
import souleveTerre from "../../image/souleveTerre.jpg";
import styles from "./Seance.module.scss";
import { NavLink } from "react-router-dom";
import SeanceList from "../../compenants/Seance/SeanceList";

export default function Seance() {
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
        <h2 className="mt-30 ml-10"> Seance :</h2>
      </section>
      <SeanceList />

      <section>
        <div>
          <ul>
            <NavLink end to="/Exercices">
              tous
            </NavLink>
            <NavLink to="/Exercices/Dos">Dos</NavLink>
            <NavLink to="/Exercices/Pectoraux">Pectauraux</NavLink>
            <NavLink to="/Exercices/Épaules">Épaules</NavLink>
            <NavLink to="/Exercices/Bras">Bras</NavLink>
            <NavLink to="/Exercices/Jambes">Jambes</NavLink>
            <NavLink to="/Exercices/Abdos">Abdos</NavLink>
          </ul>
        </div>
      </section>
    </main>
  );
}
