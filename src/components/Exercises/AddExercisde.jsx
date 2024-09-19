import React, { useContext, useState } from "react";
import { ExerciseContext } from "../../context/ExerciseContext";

export default function AddExercise() {
  const [showForm, setShowForm] = useState(false); // Formulaire caché par défaut
  const [name, setName] = useState("");
  const [primaryMuscle, setPrimaryMuscle] = useState("");
  const [secondaryMuscles, setSecondaryMuscles] = useState("");
  const [equipment, setEquipment] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { addExercise } = useContext(ExerciseContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addExercise({
      name,
      primaryMuscle,
      secondaryMuscles: secondaryMuscles.split(","), // Si plusieurs muscles secondaires
      equipment,
      description,
      imageUrl,
    });
    // Réinitialiser les champs et cacher le formulaire après soumission
    setName("");
    setPrimaryMuscle("");
    setSecondaryMuscles("");
    setEquipment("");
    setDescription("");
    setImageUrl("");
    setShowForm(false);
  };

  return (
    <div>
      {/* Bouton pour afficher le formulaire */}
      {!showForm && (
        <button onClick={() => setShowForm(true)}>
          Ajouter un exercice
        </button>
      )}

      {/* Affichage conditionnel du formulaire */}
      {showForm && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Muscle principal"
            value={primaryMuscle}
            onChange={(e) => setPrimaryMuscle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Muscles secondaires (séparés par des virgules)"
            value={secondaryMuscles}
            onChange={(e) => setSecondaryMuscles(e.target.value)}
          />
          <input
            type="text"
            placeholder="Équipement"
            value={equipment}
            onChange={(e) => setEquipment(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <input
            type="text"
            placeholder="URL de l'image"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <button type="submit">Ajouter l'exercice</button>
          {/* Bouton pour cacher le formulaire */}
          <button type="button" onClick={() => setShowForm(false)}>
            Annuler
          </button>
        </form>
      )}
    </div>
  );
}
