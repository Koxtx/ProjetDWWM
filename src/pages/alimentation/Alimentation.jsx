import React from "react";
import oeufs from "../../image/oeufs.jpg";
import styles from "./Alimentation.module.scss";
import { NavLink } from "react-router-dom";

export default function Alimentation() {
  return (
    <main className="mhFull">
      <section>
        <img src={oeufs} className={`${styles.image}`} alt="oeufs" />
      </section>
      <section>
        <h2 className="mt-30 ml-10"> Alimentation :</h2>
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
            <NavLink end to="/Recettes">
              tous
            </NavLink>
            <NavLink to="/Recettes/Petit-déjeuner">Petit-déjeuner</NavLink>
            <NavLink to="/Recettes/Déjeuner">Déjeuner</NavLink>
            <NavLink to="/Recettes/Collation">Collation</NavLink>
            <NavLink to="/Recettes/Dîner">Dîner</NavLink>
            <NavLink to="/Recettes/Dessert">Dessert</NavLink>
          </ul>
        </div>
      </section>
    </main>
  );
}
