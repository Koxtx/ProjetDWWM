import React, { useContext, useState } from "react";
import { ExerciseContext } from "../../context/ExerciseContext";

export default function AddExercisde() {
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
    setName("");
    setPrimaryMuscle("");
    setSecondaryMuscles("");
    setEquipment("");
    setDescription("");
    setImageUrl("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Primary Muscle"
        value={primaryMuscle}
        onChange={(e) => setPrimaryMuscle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Secondary Muscles (comma separated)"
        value={secondaryMuscles}
        onChange={(e) => setSecondaryMuscles(e.target.value)}
      />
      <input
        type="text"
        placeholder="Equipment"
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
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <button type="submit">Add Exercise</button>
    </form>
  );
}
