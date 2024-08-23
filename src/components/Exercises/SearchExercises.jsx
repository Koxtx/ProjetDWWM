import React, { useState } from "react";
import { getExercises } from "../../apis/exercises";

export default function SearchExercises() {
  const [filters, setFilters] = useState({
    name: "",
    category: "",
    primaryMuscle: "",
    equipment: "",
    difficulty: "",
  });
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = async () => {
    const data = await getExercises(filters);
    setResults(data);
  };

  return (
    <div>
      <input
        name="name"
        placeholder="Exercise Name"
        value={filters.name}
        onChange={handleChange}
      />
      <select name="category" value={filters.category} onChange={handleChange}>
        <option value="">Select Category</option>
        {/* Ajoutez les options de catégorie */}
      </select>
      <select
        name="primaryMuscle"
        value={filters.primaryMuscle}
        onChange={handleChange}
      >
        <option value="">Select Muscle</option>
        {/* Ajoutez les options de muscle */}
      </select>
      {/* Ajoutez les autres filtres ici */}
      <button onClick={handleSearch}>Search</button>

      <div>
        {results.map((exercise) => (
          <div key={exercise._id}>
            <h3>{exercise.name}</h3>
            <p>{exercise.description}</p>
            {/* Affichez d'autres détails de l'exercice */}
          </div>
        ))}
      </div>
    </div>
  );
}
