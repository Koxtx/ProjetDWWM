import React from "react";
import OneRecette from "./OneRecette";
import { useOutletContext } from "react-router-dom";
import styles from "./ExRecette.module.scss";

export default function ExRecette() {
  const { recettes } = useOutletContext();
  return (
    <main className={`${styles.main}`}>
      <h2 className="ml-10">Recettes :</h2>

      <div className="d-flex flex-wrap justify-content-center">
        {recettes.map((r) => (
          <OneRecette key={r._id} r={r} />
        ))}
      </div>
    </main>
  );
}
