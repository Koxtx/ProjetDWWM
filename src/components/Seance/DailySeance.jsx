import React from "react";

const DailySeance = ({ seance }) => {
  if (!seance) {
    return <p>Aucune séance pour aujourd'hui. Jour de repos!</p>;
  }

  return (
    <div>
      <h3>{seance.name}</h3>
      <p>Jour: {seance.day}</p>
      <ul>
        {seance.exercises.map((exercise, index) => (
          <li key={index}>{exercise.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DailySeance;
