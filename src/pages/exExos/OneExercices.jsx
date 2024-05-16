import React from "react";
import styles from "./OneExercice.module.scss";

export default function OneExercices({ e }) {
  return (
    <div className={`card p-20 d-flex flex-column ${styles.teamCard}`}>
      <p className={`${styles.team}`}>
        <span>Exercice : </span>
        {e.name}
      </p>
      <p className={`${styles.team}`}>
        <span>Partie du corp : </span>
        {e.bodyPart}
      </p>
      <p className={`${styles.team}`}>
        <span>Equipement : </span>
        {e.equipmentUsed}
      </p>
      <div className="d-flex justify-content-center align-items-center flex-fill">
        <img className={styles.logo} src={e.image} alt="image" />
      </div>
    </div>
  );
}
