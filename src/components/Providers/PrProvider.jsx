import React, { useEffect, useState } from "react";
import { PrContext } from "../../context/PrContext";
import { getPRs, savePR } from "../../apis/pr";

export default function PrProvider({ children }) {
  const [prs, setPRs] = useState([]);

  const savePerformance = async (exerciseId, sets) => {
    try {
      await savePR(exerciseId, sets);
      console.log("Performance saved");
      // Optionally, update local state after saving
      const updatedPRs = await getPRs(exerciseId);
      setPRs((prevPRs) => [
        ...prevPRs.filter((pr) => pr.exerciseId !== exerciseId),
        ...updatedPRs,
      ]);
    } catch (error) {
      console.error("Error saving performance:", error);
    }
  };

  const getPerformance = async (exerciseId) => {
    try {
      const prs = await getPRs(exerciseId);
      return prs;
    } catch (error) {
      console.error("Error fetching performance:", error);
    }
  };

  useEffect(() => {
    const fetchPRs = async () => {
      try {
        const prsData = await getPRs();
        if (prsData) {
          setPRs(prsData);
        }
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
