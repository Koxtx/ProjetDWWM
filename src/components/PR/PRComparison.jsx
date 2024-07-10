import React from "react";
import { useContext } from "react";
import { PrContext } from "../../context/PrContext";

export default function PRComparison({ currentPR, exerciseName }) {
  const { prs } = useContext(PrContext);
  // Filtrer les PRs pour ceux ayant le même nom d'exercice
  const filteredPRs = prs.filter((pr) => pr.exerciseName === exerciseName);

  // Trier les PRs par date
  filteredPRs.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      <h2>Comparaison des PR pour {exerciseName}</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Séries</th>
            <th>Réps</th>
            <th>Poids</th>
          </tr>
        </thead>
        <tbody>
          {filteredPRs.map((pr) => (
            <tr key={pr._id}>
              <td>{new Date(pr.date).toLocaleDateString()}</td>
              <td>{pr.sets.length}</td>
              <td>{pr.sets.map((set) => set.reps).join(", ")}</td>
              <td>{pr.sets.map((set) => set.weight).join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {currentPR && (
        <div>
          <h3>PR Actuel</h3>
          <p>Date: {new Date(currentPR.date).toLocaleDateString()}</p>
          <p>Séries: {currentPR.sets.length}</p>
          <p>Réps: {currentPR.sets.map((set) => set.reps).join(", ")}</p>
          <p>Poids: {currentPR.sets.map((set) => set.weight).join(", ")}</p>
        </div>
      )}
    </div>
  );
}
