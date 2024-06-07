import React from "react";
import { useOutletContext } from "react-router-dom";

export default function Favorites() {
  const { exercices, recettes, toggleLiked } = useOutletContext();
  return (
    <div className="mhFull">
      <h2>Exercice Favorites</h2>
      {exercices
        .filter((e) => e.liked !== false)
        .map((e) => (
          <div className={`card p-20 d-flex flex-column `}>
            <p>
              <span>Exercice : </span>
              {e.name}
            </p>
            <p>
              <span>Partie du corp : </span>
              {e.bodyPart}
            </p>
            <p>
              <span>Equipement : </span>
              {e.equipmentUsed}
            </p>
            <div className="d-flex justify-content-center align-items-center flex-fill">
              <img src={e.image} alt={e.name} />
            </div>
            <button
              onClick={() => toggleLiked(e._id)}
              className="btn btn-reverse-primary"
            >
              Retirer de vos favoris
            </button>
          </div>
        ))}
      <h2>Recettes Favorites</h2>
      {recettes
        .filter((r) => r.liked !== false)
        .map((r) => (
          <div className={`card p-20 d-flex flex-column `}>
            <p>
              <span>nom : </span>
              {r.name}
            </p>
            <p>
              <span>repas : </span>
              {r.mealType}
            </p>
            <p>
              <span>ingredients : </span>
              {r.ingredients.map((ingredient, index) => (
                <span key={index}>
                  {ingredient}
                  {index !== r.ingredients.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
            <p>
              <span>protein : </span>
              {r.proteinContent}
            </p>
            <p>
              <span>calories : </span>
              {r.calories}
            </p>
            <p>
              <span>preparation : </span>
              {r.preparation}
            </p>
            <div className="d-flex justify-content-center align-items-center flex-fill">
              <img src={r.imageLink} alt={r.name} />
            </div>
            <button className="btn btn-primary">Retirer de vos favoris</button>
          </div>
        ))}
    </div>
  );
}
