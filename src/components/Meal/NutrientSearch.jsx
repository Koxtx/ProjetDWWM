import React, { useState } from "react";
import { fetchRecipesByNutrients } from "../../apis/goal";

export default function NutrientSearch() {
  const [minCarbs, setMinCarbs] = useState("");
  const [maxCarbs, setMaxCarbs] = useState("");
  const [minProtein, setMinProtein] = useState("");
  const [maxProtein, setMaxProtein] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      const data = await fetchRecipesByNutrients({
        minCarbs,
        maxCarbs,
        minProtein,
        maxProtein,
      });
      setRecipes(data);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Recherche de recettes par nutriments</h2>
      <input
        type="number"
        value={minCarbs}
        onChange={(e) => setMinCarbs(e.target.value)}
        placeholder="Min Glucides"
      />
      <input
        type="number"
        value={maxCarbs}
        onChange={(e) => setMaxCarbs(e.target.value)}
        placeholder="Max Glucides"
      />
      <input
        type="number"
        value={minProtein}
        onChange={(e) => setMinProtein(e.target.value)}
        placeholder="Min Protéines"
      />
      <input
        type="number"
        value={maxProtein}
        onChange={(e) => setMaxProtein(e.target.value)}
        placeholder="Max Protéines"
      />
      <button onClick={handleSearch}>Rechercher</button>
      {error && <p className="error">{error}</p>}
      <div>
        {recipes.map((recipe) => (
          <div key={recipe.id}>
            <h3>{recipe.name}</h3>
            <p>Calories: {recipe.calories}</p>
            <p>Protéines: {recipe.proteinContent}</p>
            <img src={recipe.imageLink} alt={recipe.name} />
          </div>
        ))}
      </div>
    </div>
  );
}
