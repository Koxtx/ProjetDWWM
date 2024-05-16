import React from "react";
import styles from "./Exemple.module.scss";
import ExExos from "../../image/ExExos.jpg";
import ExRecette from "../../image/ExRecette.jpg";
import { NavLink } from "react-router-dom";

export default function Exemple({ titre }) {
  const backgroundImage = titre === "Recettes" ? ExRecette : ExExos;
  return (
    <div className={`d-flex center ${styles.div}`}>
      <NavLink
        className={` btn card ${styles.card}`}
        style={{ backgroundImage: `url(${backgroundImage})` }}
        to={`/${titre}`}
      >
        <div>
          <h3 className="flex-fill" style={{ color: "white" }}>
            {titre} :
          </h3>
        </div>
      </NavLink>
    </div>
  );
}
