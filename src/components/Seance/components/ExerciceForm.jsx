import React, { useState, useEffect } from "react";

export default function ExerciseForm({ exercise = {}, onSave, onDelete }) {
  const [formState, setFormState] = useState({
    name: "",
    sets: [],
    rest: 0,
    newReps: 0,
    newWeight: 0,
  });

  useEffect(() => {
    if (exercise) {
      setFormState({
        name: exercise.name || "",
        sets: exercise.sets || [],
        rest: exercise.rest || 0,
        newReps: 0,
        newWeight: 0,
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: name === "rest" ? Number(value) : value,
    }));
  };

  const handleAddSet = () => {
    const newSet = {
      reps: formState.newReps,
      weight: formState.newWeight,
    };
    setFormState((prevState) => ({
      ...prevState,
      sets: [...prevState.sets, newSet],
      newReps: 0,
      newWeight: 0,
    }));
  };

  const handleSaveSet = (set, index) => {
    setFormState((prevState) => ({
      ...prevState,
      sets: prevState.sets.map((s, i) => (i === index ? set : s)),
    }));
  };

  const handleDeleteSet = (index) => {
    setFormState((prevState) => ({
      ...prevState,
      sets: prevState.sets.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formState);
    setFormState({
      name: "",
      sets: [],
      rest: 0,
      newReps: 0,
      newWeight: 0,
    });
  };

  return (
    <div>
      <input
        name="name"
        value={formState.name}
        onChange={handleChange}
        placeholder="Nom de l'exercice"
      />
      <input
        name="rest"
        value={formState.rest}
        onChange={handleChange}
        placeholder="Temps de repos (secondes)"
        type="number"
      />
      <h4>Séries</h4>
      {formState.sets.map((set, index) => (
        <div key={index}>
          <input
            name="reps"
            value={set.reps}
            onChange={(e) => {
              const newSets = [...formState.sets];
              newSets[index].reps = Number(e.target.value);
              setFormState({ ...formState, sets: newSets });
            }}
            placeholder="Nombre de répétitions"
            type="number"
          />
          <input
            name="weight"
            value={set.weight}
            onChange={(e) => {
              const newSets = [...formState.sets];
              newSets[index].weight = Number(e.target.value);
              setFormState({ ...formState, sets: newSets });
            }}
            placeholder="Poids (kg)"
            type="number"
          />
          <button type="button" onClick={() => handleDeleteSet(index)}>
            Supprimer la série
          </button>
        </div>
      ))}
      <div>
        <input
          name="newReps"
          value={formState.newReps}
          onChange={(e) =>
            setFormState({ ...formState, newReps: Number(e.target.value) })
          }
          placeholder="Nombre de répétitions"
          type="number"
        />
        <input
          name="newWeight"
          value={formState.newWeight}
          onChange={(e) =>
            setFormState({ ...formState, newWeight: Number(e.target.value) })
          }
          placeholder="Poids (kg)"
          type="number"
        />
        <button type="button" onClick={handleAddSet}>
          Ajouter une série
        </button>
      </div>
      <button type="button" onClick={onDelete}>
        Supprimer l'exercice
      </button>
      <button type="button" onClick={handleSubmit}>
        Enregistrer l'exercice
      </button>
    </div>
  );
}
