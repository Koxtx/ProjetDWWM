import React from "react";
import OneRecette from "./OneRecette";
import { useOutletContext } from "react-router-dom";

export default function ExRecette() {
  const { recettes } = useOutletContext();
  return (
    <main className="mhFull">
      <h2>Recettes :</h2>

      <div className="d-flex flex-wrap justify-content-center">
        {recettes.map((r) => (
          <OneRecette key={r._id} r={r} />
        ))}
      </div>
    </main>
  );
}
