import React, { useEffect, useState } from "react";

export default function DailySeance({ seance, onSeanceUpdate }) {
  if (!seance) {
    return <div>Chargement...</div>; // ou un autre indicateur de chargement approprié
  }

  if (!Array.isArray(seance.exercises)) {
    return <div>Aucun exercice disponible.</div>;
  }

  const [editingSet, setEditingSet] = useState(null);

  const handleEditSet = (exercise, setIndex) => {
    setEditingSet({ exercise, setIndex });
  };

  const handleSaveSet = async (exercise, setIndex, updatedSet) => {
    const updatedExercise = {
      ...exercise,
      sets: Array.isArray(exercise.sets)
        ? exercise.sets.map((set, index) =>
            index === setIndex ? updatedSet : set
          )
        : [],
    };

    try {
      await fetch(
        `http://localhost:5000/api/seances/${seance._id}/exercises/${exercise._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedExercise),
        }
      );
      setEditingSet(null);
      onSeanceUpdate();
    } catch (error) {
      console.error("Error updating set:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/seances/${seance._id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        // Utilisez les données récupérées ici
      } catch (error) {
        console.error("Error fetching session data:", error);
      }
    };
    fetchData();
  }, [seance._id]);

  return (
    <div className="daily-seance">
      <h2>{seance.name}</h2>
      {seance.exercises.map((exercise) => (
        <div key={exercise._id} className="exercise">
          <h3>{exercise.name}</h3>
          {Array.isArray(exercise.sets) ? (
            exercise.sets.map((set, index) => (
              <div key={index} className="set">
                {editingSet &&
                editingSet.exercise._id === exercise._id &&
                editingSet.setIndex === index ? (
                  <SetForm
                    set={exercise.sets[index]}
                    onSave={(updatedSet) =>
                      handleSaveSet(exercise, index, updatedSet)
                    }
                  />
                ) : (
                  <>
                    <label>Série {index + 1}:</label>
                    <input
                      type="number"
                      placeholder={`Répétitions (${set.reps})`}
                    />
                    <input
                      type="number"
                      placeholder={`Poids utilisé (${set.weight}kg)`}
                    />
                    <button onClick={() => handleEditSet(exercise, index)}>
                      Modifier
                    </button>
                    <button>Valider</button>
                  </>
                )}
              </div>
            ))
          ) : (
            <p>Aucun ensemble trouvé pour cet exercice.</p>
          )}
          <p>Repos: {exercise.rest} secondes</p>
        </div>
      ))}
    </div>
  );
}
