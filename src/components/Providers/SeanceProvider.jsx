import React, { useState, useEffect } from "react";
import { SeanceContext } from "../../context/SeanceContext";
import { getSeancesFromApi } from "../../apis/seance"; // Assurez-vous d'avoir une API pour récupérer les séances

export default function SeanceProvider({ children }) {
  const [seances, setSeances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeances = async () => {
      try {
        const seanceData = await getSeancesFromApi();
        setSeances(seanceData);
      } catch (error) {
        console.error("Error fetching seances:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeances();
  }, []);

  return (
    <SeanceContext.Provider value={{ seances, setSeances, loading }}>
      {children}
    </SeanceContext.Provider>
  );
}
