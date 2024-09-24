import React, { useContext, useState } from "react";
import { GoalContext } from "../../context/GoalContext";
import styles from "./Goal.module.scss";
export default function AddGoal() {
  const [showForm, setShowForm] = useState(false);
  const [type, setType] = useState("");
  const [targetType, setTargetType] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [target, setTarget] = useState("");
  const { addGoal } = useContext(GoalContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const goalData = { type, targetType };

    if (targetType === "repetitions") {
      goalData.target = reps;
    } else if (targetType === "time") {
      goalData.target = target;
    } else if (targetType === "weight") {
      goalData.target = weight;
    } else if (targetType === "repsWithWeight") {
      goalData.reps = reps;
      goalData.weight = weight;
    }

    await addGoal(goalData);
    setType("");
    setTargetType("");
    setReps("");
    setWeight("");
    setTarget("");
    setShowForm(false);
  };

  return (
    <div>
      {!showForm && (
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          Ajouter un objectif
        </button>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className={`${styles.addgoal}`}>
          <input
            type="text"
            placeholder="Type d'objectif"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />

          <select
            value={targetType}
            onChange={(e) => setTargetType(e.target.value)}
            required
          >
            <option value="">Choisissez le type de cible</option>
            <option value="repetitions">Répétitions</option>
            <option value="time">Temps (secondes)</option>
            <option value="weight">Poids (kg)</option>
            <option value="repsWithWeight">Répétitions avec poids</option>
          </select>

          {targetType === "repetitions" && (
            <input
              type="number"
              placeholder="Nombre de répétitions"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              required
            />
          )}

          {targetType === "time" && (
            <input
              type="number"
              placeholder="Temps en secondes"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              required
            />
          )}

          {targetType === "weight" && (
            <input
              type="number"
              placeholder="Poids en kg"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />
          )}

          {targetType === "repsWithWeight" && (
            <div>
              <input
                type="number"
                placeholder="Nombre de répétitions"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Poids en kg"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
              />
            </div>
          )}

          <button className="btn btn-primary" type="submit">
            Ajouter l'objectif
          </button>
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => setShowForm(false)}
          >
            Annuler
          </button>
        </form>
      )}
    </div>
  );
}
