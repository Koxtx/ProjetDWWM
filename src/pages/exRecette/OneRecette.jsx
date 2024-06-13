import React, { useContext } from "react";
import styles from "./OneRecette.module.scss";
import { useOutletContext } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function OneRecette({ r }) {
  const { user } = useContext(UserContext);
  const { toggleLiked } = useOutletContext();
  return (
    <div className={`card p-20 d-flex flex-column ${styles.recetteCard}`}>
      <p className={`${styles.recette}`}>
        <span>nom : </span>
        {r.name}
      </p>
      <p className={`${styles.recette}`}>
        <span>repas : </span>
        {r.mealType}
      </p>
      <p className={`${styles.recette}`}>
        <span>ingredients : </span>
        {r.ingredients.map((ingredient, index) => (
          <span key={index}>
            {ingredient}
            {index !== r.ingredients.length - 1 ? ", " : ""}
          </span>
        ))}
      </p>
      <p className={`${styles.recette}`}>
        <span>protein : </span>
        {r.proteinContent}
      </p>
      <p className={`${styles.recette}`}>
        <span>calories : </span>
        {r.calories}
      </p>
      <p className={`${styles.recette}`}>
        <span>preparation : </span>
        {r.preparation}
      </p>
      <div className="d-flex justify-content-center align-items-center flex-fill">
        <img className={styles.logo} src={r.imageLink} alt={r.name} />
      </div>
      {user ? (
        <button onClick={() => toggleLiked(r._id)} className="btn btn-primary">
          {r.liked ? "Retirer de vos favoris" : "Ajouter à vos favoris"}
        </button>
      ) : null}
    </div>
  );
}
