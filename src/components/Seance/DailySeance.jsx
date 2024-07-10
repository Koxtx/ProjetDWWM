import React, { useContext } from "react";
import { PrContext } from "../../context/PrContext";
import ExercisePerformance from "../PR/ExercisePerformance";

export default function DailySeance({ seance }) {
  const { prs } = useContext(PrContext);

  const getBestPerformance = (exerciseId) => {
    if (!Array.isArray(prs)) {
      return null;
    }

    const exercisePR = prs.find((pr) => pr.exerciseId === exerciseId);
    if (!exercisePR) {
      return null;
    }

    const bestSet = exercisePR.sets.reduce(
      (best, set) => {
        if (set.weight > best.weight) {
          return set;
        }
        if (set.weight === best.weight && set.reps > best.reps) {
          return set;
        }
        return best;
      },
      { reps: 0, weight: 0 }
    );

    return bestSet;
  };

  if (!seance) {
    return <p>Aucune séance pour aujourd'hui. Jour de repos!</p>;
  }

  return (
    <div>
      <h3>{seance.name}</h3>
      {seance.exercises.map((exercise, index) => (
        <ExercisePerformance
          key={index}
          exercise={exercise}
          bestPerformance={getBestPerformance(exercise._id)}
        />
      ))}
    </div>
  );
}
