import React from "react";
import souleveTerre from "../../image/souleveTerre.jpg";
import styles from "./Seance.module.scss";
import { NavLink } from "react-router-dom";

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
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio? Est,
          totam id. Eius voluptas enim repellendus quisquam totam! Natus quis
          error minima perferendis, tempora id odit ipsum. Praesentium dolor
          omnis consectetur quibusdam illo esse at labore? Accusantium
          reiciendis praesentium, ratione ipsa repellat rem ut natus? Saepe,
          doloribus pariatur unde natus voluptas enim placeat exercitationem?
          Distinctio maiores omnis neque esse excepturi doloremque rerum quas!
          Tenetur illo rerum, error quaerat blanditiis aspernatur? Voluptas,
          suscipit. Reprehenderit accusantium neque accusamus! Quam nesciunt
          magni nihil neque.
        </p>
      </section>
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
