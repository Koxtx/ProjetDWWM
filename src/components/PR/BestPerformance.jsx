import React from 'react'

export default function BestPerformance() {
    const exercisePR = prs.find((p) => p.exerciseId === exerciseId);
    if (!exercisePR) return null;
  
    const bestSet = exercisePR.sets.reduce((best, set) => {
      if (!best) return set;
      if (set.weight > best.weight) return set;
      if (set.weight === best.weight && set.reps > best.reps) return set;
      return best;
    }, null);
  
    return bestSet;
