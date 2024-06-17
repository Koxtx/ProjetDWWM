import React from "react";
import SeanceForm from "./SeanceForm";

export default function Programme({
  seances,
  onSelectSeance,
  handleEdit,
  editSeance,
  setEditSeance,
  handleDelete,
}) {
  const days = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];
  console.log(seances);

  return (
    <div className="programme d-flex flex-row">
      {days.map((day) => (
        <div key={day} className="day p-10">
          <h2>{day}</h2>
          {seances
            .filter((seance) => seance.day === day)
            .map((seance) => (
              <div key={seance._id}>
                <p>Nom de la séance : {seance.name}</p>
                <p>Nombre d'exercices : {seance.exercises.length}</p>
                <ul>
                  {seance.exercises.map((exercise) => (
                    <li key={exercise._id}>
                      <p>Nom de l'exercice : {exercise.name}</p>
                      <p>Nombre de répétitions : {exercise.sets.length}</p>
                      <p>Temps de repos : {exercise.rest}</p>
                    </li>
                  ))}
                </ul>
                <button onClick={() => handleEdit(seance)}>Éditer</button>
                <button onClick={() => handleDelete(seance._id)}>
                  Supprimer
                </button>
              </div>
            ))}
        </div>
      ))}
      {editSeance && (
        <SeanceForm editSeance={editSeance} setEditSeance={setEditSeance} />
      )}
    </div>
  );
}
