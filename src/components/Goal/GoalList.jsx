import React, { useContext, useState, useEffect } from "react";
import { GoalContext } from "../../context/GoalContext";
import styles from "./Goal.module.scss";
export default function GoalList() {
  const { goals, updateGoal, loading } = useContext(GoalContext);

  const [progressInput, setProgressInput] = useState({});
  const [showForm, setShowForm] = useState({});

  useEffect(() => {
    const initialShowForm = {};
    goals.forEach((goal) => {
      initialShowForm[goal._id] = false;
    });
    setShowForm(initialShowForm);
  }, [goals]);

  if (loading) return <p>Loading...</p>;

  const handleProgressSubmit = (goal, value) => {
    const progressValue = parseFloat(value);

    if (goal.targetType === "repetitions" && progressValue >= goal.reps) {
      alert("Objectif de répétitions atteint !");
    } else if (goal.targetType === "time" && progressValue >= goal.target) {
      alert("Objectif de temps atteint !");
    } else if (goal.targetType === "weight" && progressValue >= goal.target) {
      alert("Poids atteint !");
    } else if (
      goal.targetType === "repsWithWeight" &&
      progressValue >= goal.reps
    ) {
      alert(`Objectif de répétitions avec ${goal.weight} kg atteint !`);
    }

    updateGoal(goal._id, progressValue);
  };

  const handleInputChange = (goalId, value) => {
    setProgressInput({ ...progressInput, [goalId]: value });
  };

  const toggleForm = (goalId) => {
    setShowForm((prevState) => ({
      ...prevState,
      [goalId]: !prevState[goalId],
    }));
  };

  return (
    <div className={`${styles.listegoal}`}>
      {goals.map((goal) => (
        <div key={goal._id} className={`card ${styles.goal}`}>
          <h3>{goal.type}</h3>

          {goal.targetType === "repetitions" && (
            <p>Target: {goal.reps} répétitions</p>
          )}
          {goal.targetType === "time" && <p>Target: {goal.target} secondes</p>}
          {goal.targetType === "weight" && <p>Target: {goal.target} kg</p>}
          {goal.targetType === "repsWithWeight" && (
            <p>
              Target: {goal.reps} répétitions avec {goal.weight} kg
            </p>
          )}

          <p>Progress: {goal.progress}</p>

          <button
            className={`btn btn-primary ${styles.btnform}`}
            onClick={() => toggleForm(goal._id)}
          >
            {showForm[goal._id]
              ? "Masquer le formulaire"
              : "Afficher le formulaire"}
          </button>

          {showForm[goal._id] && (
            <div>
              <input
                type="number"
                placeholder="Entrez votre progrès"
                value={progressInput[goal._id] || ""}
                onChange={(e) => handleInputChange(goal._id, e.target.value)}
              />
              <button
                className="btn btn-primary"
                onClick={() =>
                  handleProgressSubmit(goal, progressInput[goal._id])
                }
              >
                Valider le progrès
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
