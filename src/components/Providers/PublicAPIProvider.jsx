import React, { useEffect, useState } from "react";
import { PublicAPIContext } from "../../context/PublicAPIContext";

export default function PublicAPIProvider({ children }) {
  const [exercises, setExercises] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/public/")
      .then((response) => response.json())
      .then((data) => setExercises(data));
  }, []);
  return (
    <PublicAPIContext.Provider value={{ exercises }}>
      {children}
    </PublicAPIContext.Provider>
  );
}
