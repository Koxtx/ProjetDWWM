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
  const [showForm, setShowForm] = useState(false); // Formulaire caché par défaut

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
      {/* Bouton pour afficher/cacher le formulaire */}
      {!showForm && (
        <button onClick={() => setShowForm(true)}>Afficher la recherche d'exercices</button>
      )}

      {showForm && (
        <div>
          <input
            name="name"
            placeholder="Nom de l'exercice"
            value={filters.name}
            onChange={handleChange}
          />
          <select name="category" value={filters.category} onChange={handleChange}>
            <option value="">Sélectionnez la catégorie</option>
            <option value="Cardio">Cardio</option>
            <option value="Musculation">Musculation</option>
            <option value="Souplesse">Souplesse</option>
            <option value="Endurance">Endurance</option>
            {/* Ajoutez d'autres catégories si nécessaire */}
          </select>
          <select
            name="primaryMuscle"
            value={filters.primaryMuscle}
            onChange={handleChange}
          >
            <option value="">Sélectionnez le muscle principal</option>
            <option value="Pectoraux">Pectoraux</option>
            <option value="Dos">Dos</option>
            <option value="Jambes">Jambes</option>
            <option value="Épaules">Épaules</option>
            <option value="Abdominaux">Abdominaux</option>
            {/* Ajoutez d'autres muscles si nécessaire */}
          </select>
          <select
            name="equipment"
            value={filters.equipment}
            onChange={handleChange}
          >
            <option value="">Sélectionnez l'équipement</option>
            <option value="Haltères">Haltères</option>
            <option value="Barre">Barre</option>
            <option value="Machine">Machine</option>
            <option value="Aucun">Aucun</option>
            {/* Ajoutez d'autres équipements si nécessaire */}
          </select>
          <select
            name="difficulty"
            value={filters.difficulty}
            onChange={handleChange}
          >
            <option value="">Sélectionnez la difficulté</option>
            <option value="Débutant">Débutant</option>
            <option value="Intermédiaire">Intermédiaire</option>
            <option value="Avancé">Avancé</option>
          </select>
          <button onClick={handleSearch}>Rechercher</button>

          {/* Bouton pour cacher le formulaire */}
          <button onClick={() => setShowForm(false)}>Cacher la recherche</button>
        </div>
      )}

      {/* Affichage des résultats de la recherche */}
      <div>
        {results.map((exercise) => (
          <div key={exercise._id}>
            <h3>{exercise.name}</h3>
            <p>{exercise.description}</p>
            <p>Muscle principal: {exercise.primaryMuscle}</p>
            <p>Équipement: {exercise.equipment}</p>
            <p>Difficulté: {exercise.difficulty}</p>
            <p>
              Durée:{" "}
              {exercise.duration ? `${exercise.duration} minutes` : "N/A"}
            </p>
            {exercise.imageUrl && (
              <img
                src={exercise.imageUrl}
                alt={exercise.name}
                style={{ width: "100px" }}
              />
            )}
            {exercise.videoUrl && (
              <a
                href={exercise.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Voir la vidéo
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
