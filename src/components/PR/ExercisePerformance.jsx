import React, { useState, useContext, useEffect } from "react";
import { PrContext } from "../../context/PrContext";
import PRComparison from "./PRComparison";
import BestPerformance from "./BestPerformance";

export default function ExercisePerformance({ exercise, bestPerformance }) {
  const { savePerformance, getPerformance } = useContext(PrContext);
  const [sets, setSets] = useState(exercise.sets || []);
  const [editMode, setEditMode] = useState(true);
  const { prs, setPRs } = useContext(PrContext);
  const [currentPR, setCurrentPR] = useState(null);

  useEffect(() => {
    // Récupérer les valeurs sauvegardées dans localStorage lors du montage du composant
    const savedSets = JSON.parse(localStorage.getItem(`sets-${exercise._id}`));
    const savedEditMode = JSON.parse(
      localStorage.getItem(`editMode-${exercise._id}`)
    );

    if (savedSets && savedSets.length) {
      setSets(savedSets);
    } else {
      setSets(exercise.sets);
    }

    if (savedEditMode !== null) {
      setEditMode(savedEditMode);
    }
  }, []);

  useEffect(() => {
    const fetchPerformance = async () => {
      const fetchedPRs = await getPerformance(exercise._id);
      setPRs(fetchedPRs);
      if (fetchedPRs.length > 0) {
        setCurrentPR(fetchedPRs[fetchedPRs.length - 1]);
      }
    };

    fetchPerformance();
  }, []);

  useEffect(() => {
    // Sauvegarder les valeurs dans localStorage lorsque sets ou editMode changent
    localStorage.setItem(`sets-${exercise._id}`, JSON.stringify(sets));
  }, []);

  useEffect(() => {
    localStorage.setItem(`editMode-${exercise._id}`, JSON.stringify(editMode));
  }, []);

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const newSets = sets.map((set, i) =>
      i === index ? { ...set, [name]: value } : set
    );
    setSets(newSets);
  };

  const handleValidateSet = (index) => {
    const newSets = sets.map((set, i) =>
      i === index ? { ...set, validated: true } : set
    );
    setSets(newSets);
    savePerformance(exercise._id, newSets);
    setEditMode(false);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  return (
    <div>
      <h4>{exercise.name}</h4>
      {sets.map((set, index) => (
        <div key={index}>
          {set.validated && !editMode ? (
            <div>
              <span>Réps: {set.reps}</span>
              <span> Poids: {set.weight}</span>
              <button type="button" onClick={handleEdit}>
                Modifier
              </button>
            </div>
          ) : (
            <div>
              <input
                type="number"
                name="reps"
                value={set.reps}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Nombre de répétitions"
              />
              <input
                type="number"
                name="weight"
                value={set.weight}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Poids (kg)"
              />
              <button type="button" onClick={() => handleValidateSet(index)}>
                Valider
              </button>
            </div>
          )}
        </div>
      ))}
      {currentPR && (
        <PRComparison currentPR={currentPR} exerciseName={exercise.name} />
      )}
      <BestPerformance exerciseName={exercise.name} prs={prs} />
    </div>
  );
}
