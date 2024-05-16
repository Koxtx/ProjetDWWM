import React from "react";
import OneExercices from "./OneExercices";
import { useOutletContext } from "react-router-dom";

export default function ExExos() {
  const { exercices } = useOutletContext();
  return (
    <main className="mhFull">
      <h2 className="ml-10">Exercices :</h2>

      <div className="d-flex flex-wrap justify-content-center">
        {exercices.map((e) => (
          <OneExercices key={e._id} e={e} />
        ))}
      </div>
    </main>
  );
}
