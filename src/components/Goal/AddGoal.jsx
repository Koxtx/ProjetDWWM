import React, { useContext, useState } from "react";
import { GoalContext } from "../../context/GoalContext";

export default function AddGoal() {
  const [type, setType] = useState("");
  const [target, setTarget] = useState("");
  const { addGoal } = useContext(GoalContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addGoal({ type, target });
    setType("");
    setTarget("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Goal Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
      />
      <input
        type="number"
        placeholder="Target"
        value={target}
        onChange={(e) => setTarget(e.target.value)}
      />
      <button type="submit">Add Goal</button>
    </form>
  );
}
