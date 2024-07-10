import React, { useState } from "react";
import { fetchFoodInfo } from "../../apis/goal";

export default function FoodInfo() {
  const [foodId, setFoodId] = useState("");
  const [foodInfo, setFoodInfo] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      const data = await fetchFoodInfo(foodId);
      setFoodInfo(data);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Information sur les aliments</h2>
      <input
        type="text"
        value={foodId}
        onChange={(e) => setFoodId(e.target.value)}
        placeholder="ID de l'aliment"
      />
      <button onClick={handleSearch}>Rechercher</button>
      {error && <p className="error">{error}</p>}
      {foodInfo && (
        <div>
          <h3>{foodInfo.name}</h3>
          <p>Calories: {foodInfo.calories}</p>
          <p>Protéines: {foodInfo.protein}</p>
          <p>Glucides: {foodInfo.carbs}</p>
          <p>Lipides: {foodInfo.fat}</p>
        </div>
      )}
    </div>
  );
}
