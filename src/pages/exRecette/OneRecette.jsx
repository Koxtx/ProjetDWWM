import React, { useContext } from "react";
import styles from "./OneRecette.module.scss";
import { useOutletContext } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import parse from "html-react-parser";

export default function OneRecette({ r }) {
  const { user } = useContext(UserContext);
  const { toggleLiked } = useOutletContext();

  const translateMealType = (mealType) => {
    switch (mealType?.toLowerCase()) {
      case "lunch":
        return "Déjeuner";
      case "antipasti":
        return "Antipasti";
      case "side dish":
        return "Accompagnement";
      default:
        return mealType;
    }
  };

  return (
    <div className={`card p-20 d-flex flex-column ${styles.recetteCard}`}>
      <h3 className={styles.recetteName}>{r.name}</h3>
      <p className={styles.recetteType}>
        <strong>Repas :</strong> {translateMealType(r.mealType)}
      </p>
      <p className={styles.recetteIngredients}>
        <strong>Ingrédients :</strong> {r.ingredients.join(", ")}
      </p>
      <p className={styles.recetteProtein}>
        <strong>Protéines :</strong> {r.proteinContent || "N/A"} g
      </p>
      <p className={styles.recetteCalories}>
        <strong>Calories :</strong> {r.calorie || "N/A"} kcal
      </p>
      <div className={styles.recettePreparation}>
        <strong>Préparation :</strong> {parse(r.preparation || "")}
      </div>
      <div className="d-flex justify-content-center align-items-center flex-fill">
        <img className={styles.logo} src={r.imageLink} alt={r.name} />
      </div>
      {user ? (
        <button onClick={() => toggleLiked(r.id)} className="btn btn-primary">
          {r.liked ? "Retirer de vos favoris" : "Ajouter à vos favoris"}
        </button>
      ) : null}
    </div>
  );
}
