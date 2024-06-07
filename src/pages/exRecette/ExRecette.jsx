import React, { useState } from "react";
import OneRecette from "./OneRecette";
import { NavLink, useOutletContext, useParams } from "react-router-dom";
import styles from "./ExRecette.module.scss";

export default function ExRecette() {
  const [filterRecette, setFilterRecette] = useState("");
  const { mealType } = useParams();
  // console.log(mealType);

  const { recettes } = useOutletContext();
  return (
    <main className={`${styles.main}`}>
      <h2 className="ml-10">Recettes :</h2>

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

      <div className="d-flex flex-wrap justify-content-center">
        {mealType
          ? recettes
              .filter((r) => r.mealType === mealType)
              .filter((r) => r.name.toLowerCase().startsWith(filterRecette))
              .map((r) => <OneRecette key={r._id} r={r} />)
          : recettes
              .filter((r) => r.name.toLowerCase().startsWith(filterRecette))
              .map((r) => <OneRecette key={r._id} r={r} />)}
      </div>
    </main>
  );
}
