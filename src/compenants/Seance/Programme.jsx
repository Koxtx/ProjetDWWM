import React from "react";

export default function Programme({
  seances,
  onSelectSeance,
  handleEdit,
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
                      <p>Exercice : {exercise.name}</p>
                      <p>Nombre de séries : {exercise.sets.length}</p>
                      <p>Temps de repos : {exercise.rest} secondes</p>
                      <ul>
                        {exercise.sets.map((set, idx) => (
                          <li key={idx}>
                            <p>Nombre de Répétitions : {set.reps}</p>
                            <p>
                              Poids utilisé :{" "}
                              {set.weight === 0
                                ? "poids de corps"
                                : `${set.weight} kg`}
                            </p>
                          </li>
                        ))}
                      </ul>
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
    </div>
  );
}
