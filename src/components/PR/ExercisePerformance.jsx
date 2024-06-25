import React, { useState, useContext, useEffect } from "react";
import { PrContext } from "../../context/PrContext";

export default function ExercisePerformance({ exercise, bestPerformance }) {
  const { savePerformance } = useContext(PrContext);
  const [sets, setSets] = useState(exercise.sets);
  const [editMode, setEditMode] = useState(true);

  useEffect(() => {
    const savedSets = JSON.parse(localStorage.getItem(`sets-${exercise._id}`));
    const savedEditMode = JSON.parse(
      localStorage.getItem(`editMode-${exercise._id}`)
    );
    if (savedSets) {
      setSets(savedSets);
    }
    if (savedEditMode !== null) {
      setEditMode(savedEditMode);
    }
  }, [exercise._id]);

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

    localStorage.setItem(`sets-${exercise._id}`, JSON.stringify(newSets));
    localStorage.setItem(`editMode-${exercise._id}`, JSON.stringify(false));
  };

  const handleEdit = () => {
    setEditMode(true);
    localStorage.setItem(`editMode-${exercise._id}`, JSON.stringify(true));
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
    </div>
  );
}
