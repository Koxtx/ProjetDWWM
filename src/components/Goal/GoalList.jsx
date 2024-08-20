import React, { useContext } from "react";
import { GoalContext } from "../../context/GoalContext";

export default function GoalList() {
  const { goals, updateGoal, loading } = useContext(GoalContext);
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {goals.map((goal) => (
        <div key={goal._id}>
          <h3>{goal.type}</h3>
          <p>Target: {goal.target}</p>
          <p>Progress: {goal.progress}</p>
          <button onClick={() => updateGoal(goal._id, goal.progress + 1)}>
            Increase Progress
          </button>
        </div>
      ))}
    </div>
  );
}
