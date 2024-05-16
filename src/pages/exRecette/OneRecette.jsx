import React from "react";
import styles from "./OneRecette.module.scss";

export default function OneRecette({ r }) {
  return (
    <div className={`card p-20 d-flex flex-column ${styles.teamCard}`}>
      <p className={`${styles.team}`}>
        <span>nom : </span>
        {r.name}
      </p>
      <p className={`${styles.team}`}>
        <span>repas : </span>
        {r.mealType}
      </p>
      <p className={`${styles.team}`}>
        <span>ingredients : </span>
        {r.ingredients}
      </p>
      <p className={`${styles.team}`}>
        <span>protein : </span>
        {r.proteinContent}
      </p>
      <p className={`${styles.team}`}>
        <span>calories : </span>
        {r.calorie}
      </p>
      <p className={`${styles.team}`}>
        <span>preparation : </span>
        {r.preparation}
      </p>
      <div className="d-flex justify-content-center align-items-center flex-fill">
        <img className={styles.logo} src={r.imageLink} alt="image" />
      </div>
    </div>
  );
}
