import React, { useContext, useEffect, useState } from "react";

import { getProgress } from "../../apis/progress";
import ProgressChart from "./ProgressChart";
import { UserContext } from "../../context/UserContext";

export default function UserProgress({ userId }) {
  const [progressData, setProgressData] = useState([]);
  const [error, setError] = useState(null);
  const { token, user } = useContext(UserContext);

  useEffect(() => {
    async function fetchData() {
      const data = await getProgress(user._id, token);
      if (data) {
        setProgressData(data);
      } else {
        setError("Erreur lors de la récupération des progrès");
      }
    }
    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Suivi des Progrès</h1>
      <ProgressChart data={progressData} />
    </div>
  );
}
