import React, { useContext, useState } from "react";
import { GoalContext } from "../../context/GoalContext";

export default function AddGoal() {
  const [showForm, setShowForm] = useState(false);
  const [type, setType] = useState("");
  const [targetType, setTargetType] = useState(""); // Pour stocker le type de cible (répétitions, temps, poids, répétitions avec poids)
  const [reps, setReps] = useState(""); // Pour les répétitions
  const [weight, setWeight] = useState(""); // Pour le poids
  const [target, setTarget] = useState(""); // Pour le temps ou autre cible
  const { addGoal } = useContext(GoalContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const goalData = { type, targetType };

    // Ajoute la cible selon le type
    if (targetType === "repetitions") {
      goalData.target = reps;
    } else if (targetType === "time") {
      goalData.target = target; // Le temps en secondes
    } else if (targetType === "weight") {
      goalData.target = weight; // Poids en kg
    } else if (targetType === "repsWithWeight") {
      goalData.reps = reps;
      goalData.weight = weight;
    }

    await addGoal(goalData); // Appelle l'API avec les données de l'objectif
    setType("");
    setTargetType("");
    setReps("");
    setWeight("");
    setTarget("");
    setShowForm(false); // Cache le formulaire après l'ajout
  };

  return (
    <div>
      {/* Bouton pour afficher le formulaire */}
      {!showForm && (
        <button onClick={() => setShowForm(true)}>Ajouter un objectif</button>
      )}

      {/* Affichage conditionnel du formulaire */}
      {showForm && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type d'objectif"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />

          {/* Sélection du type de cible */}
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

          {/* Champ conditionnel pour chaque type de cible */}
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

          <button type="submit">Ajouter l'objectif</button>
          <button type="button" onClick={() => setShowForm(false)}>
            Annuler
          </button>
        </form>
      )}
    </div>
  );
}
