import React, { useState, useEffect } from "react";

export default function ExerciseForm({ exercise, onSave, onDelete }) {
  const [exerciseState, setExerciseState] = useState({
    name: "",
    sets: [{ reps: 0, weight: 0 }],
    rest: 0,
  });

  useEffect(() => {
    if (exercise) {
      setExerciseState(exercise);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExerciseState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSetChange = (index, e) => {
    const { name, value } = e.target;
    const newSets = [...exerciseState.sets];
    newSets[index] = { ...newSets[index], [name]: value };
    setExerciseState((prevState) => ({
      ...prevState,
      sets: newSets,
    }));
  };

  const handleAddSet = () => {
    setExerciseState((prevState) => ({
      ...prevState,
      sets: [...prevState.sets, { reps: 0, weight: 0 }],
    }));
  };

  const handleDeleteSet = (index) => {
    const newSets = exerciseState.sets.filter((_, i) => i !== index);
    setExerciseState((prevState) => ({
      ...prevState,
      sets: newSets,
    }));
  };

  const handleSave = () => {
    onSave(exerciseState);
    setExerciseState({ name: "", sets: [{ reps: 0, weight: 0 }], rest: 0 });
  };

  const handleDeleteExercise = () => {
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <div>
      <input
        name="name"
        value={exerciseState.name}
        onChange={handleChange}
        placeholder="Nom de l'exercice"
      />
      <input
        name="rest"
        type="number"
        value={exerciseState.rest}
        onChange={handleChange}
        placeholder="Temps de repos (secondes)"
      />
      <div>
        {exerciseState.sets.map((set, index) => (
          <div key={index}>
            <input
              name="reps"
              type="number"
              value={set.reps}
              onChange={(e) => handleSetChange(index, e)}
              placeholder="Nombre de répétitions"
            />
            <input
              name="weight"
              type="number"
              value={set.weight}
              onChange={(e) => handleSetChange(index, e)}
              placeholder="Poids (kg)"
            />
            <button type="button" onClick={() => handleDeleteSet(index)}>
              Supprimer la série
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddSet}>
          Ajouter une série
        </button>
      </div>
      <button type="button" onClick={handleSave}>
        Enregistrer l'exercice
      </button>
      <button type="button" onClick={handleDeleteExercise}>
        Supprimer l'exercice
      </button>
    </div>
  );
}
