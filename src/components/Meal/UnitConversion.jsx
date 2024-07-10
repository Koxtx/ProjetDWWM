import React, { useState } from "react";
import { convertUnits } from "../../apis/goal";

export default function UnitConversion() {
  const [ingredientName, setIngredientName] = useState("");
  const [sourceAmount, setSourceAmount] = useState("");
  const [sourceUnit, setSourceUnit] = useState("");
  const [targetUnit, setTargetUnit] = useState("");
  const [conversionResult, setConversionResult] = useState(null);
  const [error, setError] = useState("");

  const handleConversion = async () => {
    try {
      const data = await convertUnits({
        ingredientName,
        sourceAmount,
        sourceUnit,
        targetUnit,
      });
      setConversionResult(data);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Conversion des unités</h2>
      <input
        type="text"
        value={ingredientName}
        onChange={(e) => setIngredientName(e.target.value)}
        placeholder="Nom de l'ingrédient"
      />
      <input
        type="number"
        value={sourceAmount}
        onChange={(e) => setSourceAmount(e.target.value)}
        placeholder="Quantité source"
      />
      <input
        type="text"
        value={sourceUnit}
        onChange={(e) => setSourceUnit(e.target.value)}
        placeholder="Unité source"
      />
      <input
        type="text"
        value={targetUnit}
        onChange={(e) => setTargetUnit(e.target.value)}
        placeholder="Unité cible"
      />
      <button onClick={handleConversion}>Convertir</button>
      {error && <p className="error">{error}</p>}
      {conversionResult && (
        <div>
          <p>
            {sourceAmount} {sourceUnit} de {ingredientName} ={" "}
            {conversionResult.targetAmount} {targetUnit}
          </p>
        </div>
      )}
    </div>
  );
}
