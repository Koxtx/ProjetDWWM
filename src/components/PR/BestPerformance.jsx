import React from "react";

export default function BestPerformance({ exerciseName, prs }) {
  // Filtrer les PRs pour ceux ayant le même nom d'exercice
  const exercisePRs = prs.filter((p) => p.exerciseName === exerciseName);
  if (exercisePRs.length === 0) return null;

  const bestSet = exercisePRs.reduce((best, pr) => {
    const bestInPR = pr.sets.reduce((bestSetInPR, set) => {
      if (!bestSetInPR) return set;
      if (set.weight > bestSetInPR.weight) return set;
      if (set.weight === bestSetInPR.weight && set.reps > bestSetInPR.reps)
        return set;
      return bestSetInPR;
    }, null);

    if (!best) return bestInPR;
    if (bestInPR.weight > best.weight) return bestInPR;
    if (bestInPR.weight === best.weight && bestInPR.reps > best.reps)
      return bestInPR;
    return best;
  }, null);

  return (
    <div>
      <h4>Meilleure Performance pour {exerciseName}</h4>
      {bestSet && (
        <p>
          Réps: {bestSet.reps}, Poids: {bestSet.weight} kg
        </p>
      )}
    </div>
  );
}
