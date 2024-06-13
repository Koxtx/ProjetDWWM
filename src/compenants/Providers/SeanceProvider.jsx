import React, { useState } from "react";
import { SeanceContext } from "../../context/SeanceContext";

export default function SeanceProvider({ children }) {
  const [seances, setSeances] = useState([]);
  return (
    <SeanceContext.Provider value={{ seances, setSeances }}>
      {children}
    </SeanceContext.Provider>
  );
}
