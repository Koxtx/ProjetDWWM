import React, { useState } from "react";

export default function SetForm({ set, onSave }) {
  const [formState, setFormState] = useState(set);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="reps"
        type="number"
        value={formState.reps}
        onChange={handleChange}
      />
      <input
        name="weight"
        type="number"
        value={formState.weight}
        onChange={handleChange}
      />
      <button type="submit">Save</button>
    </form>
  );
}
