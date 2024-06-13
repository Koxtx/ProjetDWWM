import React, { useContext } from "react";
import styles from "./OneExercice.module.scss";
import { useOutletContext } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function OneExercices({ e }) {
  const { user } = useContext(UserContext);
  const { toggleLiked } = useOutletContext();
  return (
    <div className={`card p-20 d-flex flex-column ${styles.exerciceCard}`}>
      <p className={`${styles.exercice}`}>
        <span>Exercice : </span>
        {e.name}
      </p>
      <p className={`${styles.exercice}`}>
        <span>Partie du corp : </span>
        {e.bodyPart}
      </p>
      <p className={`${styles.exercice}`}>
        <span>Equipement : </span>
        {e.equipmentUsed}
      </p>
      <div className="d-flex justify-content-center align-items-center flex-fill">
        <img className={styles.logo} src={e.image} alt={e.name} />
      </div>
      {user ? (
        <button
          onClick={() => toggleLiked(e._id)}
          className="btn btn-reverse-primary"
        >
          {e.liked ? "Retirer de vos favoris" : "Ajouter à vos favoris"}
        </button>
      ) : null}
    </div>
  );
}
