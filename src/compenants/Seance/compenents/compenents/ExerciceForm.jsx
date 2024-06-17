import React, { useEffect, useState } from "react";

export default function ExerciceForm({ exercise = {}, onSave }) {
  const [formState, setFormState] = useState({
    name: "",
    sets: 0,
    reps: 0,
    rest: 0,
    weight: 0,
  });

  useEffect(() => {
    if (exercise) {
      setFormState(exercise);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]:
        name === "sets" ||
        name === "reps" ||
        name === "rest" ||
        name === "weight"
          ? Number(value)
          : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formState.name || ""}
        onChange={handleChange}
        placeholder="Exercise Name"
      />
      <input
        name="sets"
        type="number"
        value={formState.sets || 0}
        onChange={handleChange}
        placeholder="Sets"
      />
      <input
        name="reps"
        type="number"
        value={formState.reps || 0}
        onChange={handleChange}
        placeholder="Reps"
      />
      <input
        name="rest"
        type="number"
        value={formState.rest || 0}
        onChange={handleChange}
        placeholder="Rest (seconds)"
      />
      <input
        name="weight"
        type="number"
        value={formState.weight || 0}
        onChange={handleChange}
        placeholder="Weight (kg)"
      />
      <button type="submit">Save</button>
      <button type="button" onClick={() => setFormState(exercise)}>
        Cancel
      </button>
    </form>
  );
}
