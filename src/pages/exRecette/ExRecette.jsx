import React, { useState, useContext } from "react";
import OneRecette from "./OneRecette";
import { NavLink, useParams } from "react-router-dom";
import styles from "./ExRecette.module.scss";
import { RecettesContext } from "../../context/RecetteContext";

export default function ExRecette() {
  const [filterRecette, setFilterRecette] = useState("");
  const [spoonacularQuery, setSpoonacularQuery] = useState("");
  const [ingredientsQuery, setIngredientsQuery] = useState("");
  const [minCarbs, setMinCarbs] = useState("");
  const [maxCarbs, setMaxCarbs] = useState("");
  const [minProtein, setMinProtein] = useState("");
  const [maxProtein, setMaxProtein] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { mealType } = useParams();
  const { recettes, setRecettes } = useContext(RecettesContext);

  const fetchSpoonacularRecipes = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/recettes/spoonacular?query=${spoonacularQuery}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched Spoonacular recipes:", data);
      if (data.message) {
        setErrorMessage(data.message);
      } else {
        setRecettes(data);
        setErrorMessage("");
      }
    } catch (error) {
      console.error("Error fetching Spoonacular recipes:", error);
      setErrorMessage(
        "Erreur lors de la récupération des recettes de Spoonacular"
      );
    }
  };

  const fetchRecipesByIngredients = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/recettes/searchByIngredients?ingredients=${ingredientsQuery}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched recipes by ingredients:", data);
      if (data.message) {
        setErrorMessage(data.message);
      } else {
        setRecettes(data);
        setErrorMessage("");
      }
    } catch (error) {
      console.error("Error fetching recipes by ingredients:", error);
      setErrorMessage(
        "Erreur lors de la récupération des recettes par ingrédients"
      );
    }
  };

  const fetchRecipesByNutrients = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/recettes/searchByNutrients?minCarbs=${
          minCarbs || 0
        }&maxCarbs=${maxCarbs || 1000}&minProtein=${
          minProtein || 0
        }&maxProtein=${maxProtein || 1000}&number=10`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched recipes by nutrients:", data);
      if (data.message) {
        setErrorMessage(data.message);
      } else {
        setRecettes(data);
        setErrorMessage("");
      }
    } catch (error) {
      console.error("Error fetching recipes by nutrients:", error);
      setErrorMessage(
        "Erreur lors de la récupération des recettes par nutriments"
      );
    }
  };

  const filteredRecettes = recettes.filter((r) => {
    const matchesMealType = mealType
      ? r.mealType
        ? r.mealType.toLowerCase() === mealType.toLowerCase()
        : false
      : true;
    const matchesName = r.name
      .toLowerCase()
      .includes(filterRecette.toLowerCase());
    return matchesMealType && matchesName;
  });

  return (
    <main className={`${styles.main}`}>
      <h2 className="ml-10">Recettes :</h2>

      <div>
        <ul>
          <NavLink end to="/Recettes">
            Tous
          </NavLink>
          <NavLink to="/Recettes/lunch">Déjeuner</NavLink>
          <NavLink to="/Recettes/side dish">Accompagnement</NavLink>
          <NavLink to="/Recettes/antipasti">Antipasti</NavLink>
        </ul>
      </div>

      <div>
        <input
          type="text"
          value={spoonacularQuery}
          onChange={(e) => setSpoonacularQuery(e.target.value)}
          placeholder="Rechercher dans Spoonacular"
        />
        <button onClick={fetchSpoonacularRecipes}>Rechercher</button>
      </div>

      <div>
        <input
          type="text"
          value={ingredientsQuery}
          onChange={(e) => setIngredientsQuery(e.target.value)}
          placeholder="Ingrédients (séparés par des virgules)"
        />
        <button onClick={fetchRecipesByIngredients}>
          Rechercher par Ingrédients
        </button>
      </div>

      <div>
        <input
          type="text"
          value={minCarbs}
          onChange={(e) => setMinCarbs(e.target.value)}
          placeholder="Min Glucides"
        />
        <input
          type="text"
          value={maxCarbs}
          onChange={(e) => setMaxCarbs(e.target.value)}
          placeholder="Max Glucides"
        />
        <input
          type="text"
          value={minProtein}
          onChange={(e) => setMinProtein(e.target.value)}
          placeholder="Min Protéines"
        />
        <input
          type="text"
          value={maxProtein}
          onChange={(e) => setMaxProtein(e.target.value)}
          placeholder="Max Protéines"
        />
        <button onClick={fetchRecipesByNutrients}>
          Rechercher par Nutriments
        </button>
      </div>

      {errorMessage && <p className="error">{errorMessage}</p>}

      <div className="d-flex flex-wrap justify-content-center">
        {filteredRecettes.map((r) => (
          <OneRecette key={r.id} r={r} />
        ))}
      </div>
    </main>
  );
}
