import React, { useEffect, useState } from "react";
import { PrContext } from "../../context/PrContext";
import { getPRs, savePR } from "../../apis/pr";

export default function PrProvider({ children }) {
  const [prs, setPRs] = useState([]);

  const savePerformance = async (exerciseId, sets) => {
    try {
      await savePR(exerciseId, sets); // Utiliser l'API pour sauvegarder les performances
      console.log("Performance saved");
    } catch (error) {
      console.error("Error saving performance:", error);
    }
  };

  const getPerformance = async (exerciseId) => {
    try {
      const prs = await getPRs(exerciseId); // Utiliser l'API pour récupérer les performances
      return prs;
    } catch (error) {
      console.error("Error fetching performance:", error);
    }
  };

  useEffect(() => {
    const fetchPRs = async () => {
      try {
        const prsData = await getPRs(); // Utiliser l'API pour récupérer les performances
        setPRs(prsData || []); // Assurez-vous que les données sont bien un tableau
      } catch (error) {
        console.error("Error fetching prs:", error);
      }
    };

    fetchPRs();
  }, []);

  return (
    <PrContext.Provider
      value={{ prs, setPRs, savePerformance, getPerformance }}
    >
      {children}
    </PrContext.Provider>
  );
}
