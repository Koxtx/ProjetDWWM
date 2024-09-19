import React, { useContext, useState, useEffect } from "react";
import { GoalContext } from "../../context/GoalContext";

export default function GoalList() {
  const { goals, updateGoal, loading } = useContext(GoalContext);
  
  const [progressInput, setProgressInput] = useState({}); // Pour stocker les progrès de chaque objectif
  const [showForm, setShowForm] = useState({}); // Pour afficher/masquer les formulaires pour chaque objectif

  // Masquer tous les formulaires par défaut au chargement des objectifs
  useEffect(() => {
    const initialShowForm = {};
    goals.forEach((goal) => {
      initialShowForm[goal._id] = false; // Par défaut, chaque formulaire est masqué
    });
    setShowForm(initialShowForm);
  }, [goals]);

  if (loading) return <p>Loading...</p>;

  const handleProgressSubmit = (goal, value) => {
    const progressValue = parseFloat(value);

    // Validation et mise à jour du progrès selon le type d'objectif
    if (goal.targetType === "repetitions" && progressValue >= goal.reps) {
      alert("Objectif de répétitions atteint !");
    } else if (goal.targetType === "time" && progressValue >= goal.target) {
      alert("Objectif de temps atteint !");
    } else if (goal.targetType === "weight" && progressValue >= goal.target) {
      alert("Poids atteint !");
    } else if (goal.targetType === "repsWithWeight" && progressValue >= goal.reps) {
      alert(`Objectif de répétitions avec ${goal.weight} kg atteint !`);
    }

    updateGoal(goal._id, progressValue); // Mise à jour du progrès avec la valeur entrée
  };

  const handleInputChange = (goalId, value) => {
    setProgressInput({ ...progressInput, [goalId]: value }); // Stocke le progrès entré pour chaque objectif
  };

  const toggleForm = (goalId) => {
    setShowForm((prevState) => ({
      ...prevState,
      [goalId]: !prevState[goalId], // Inverse l'état pour afficher ou masquer le formulaire
    }));
  };

  return (
    <div>
      {goals.map((goal) => (
        <div key={goal._id}>
          <h3>{goal.type}</h3>

          {/* Affichage conditionnel de la cible selon le type de cible */}
          {goal.targetType === "repetitions" && <p>Target: {goal.reps} répétitions</p>}
          {goal.targetType === "time" && <p>Target: {goal.target} secondes</p>}
          {goal.targetType === "weight" && <p>Target: {goal.target} kg</p>}
          {goal.targetType === "repsWithWeight" && (
            <p>
              Target: {goal.reps} répétitions avec {goal.weight} kg
            </p>
          )}

          <p>Progress: {goal.progress}</p>

          {/* Bouton pour afficher/masquer le formulaire */}
          <button onClick={() => toggleForm(goal._id)}>
            {showForm[goal._id] ? "Masquer le formulaire" : "Afficher le formulaire"}
          </button>

          {/* Affichage conditionnel du formulaire */}
          {showForm[goal._id] && (
            <div>
              {/* Champ de saisie pour entrer le progrès */}
              <input
                type="number"
                placeholder="Entrez votre progrès"
                value={progressInput[goal._id] || ""}
                onChange={(e) => handleInputChange(goal._id, e.target.value)}
              />
              <button onClick={() => handleProgressSubmit(goal, progressInput[goal._id])}>
                Valider le progrès
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
