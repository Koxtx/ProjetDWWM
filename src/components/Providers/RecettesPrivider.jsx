import React, { useState } from "react";
import { RecettesContext } from "../../context/RecetteContext";

export default function RecettesPrivider({ children }) {
  const [recettes, setRecettes] = useState([]);

  return (
    <RecettesContext.Provider value={{ recettes, setRecettes }}>
      {children}
    </RecettesContext.Provider>
  );
}
