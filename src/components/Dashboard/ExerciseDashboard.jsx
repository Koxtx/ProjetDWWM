import React, { useContext, useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { getWorkouts } from "../../apis/workouts";
import { UserContext } from "../../context/UserContext";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function ExerciseDashboard() {
  const [workouts, setWorkouts] = useState([]);
  const { token, setToken } = useContext(UserContext);

  const handleLogin = async () => {
    const response = await loginUser(credentials);
    setToken(response.token); // Assurez-vous que le token est correctement stocké
  };

  useEffect(() => {
    async function fetchWorkouts() {
      if (!token) {
        console.error("No token available");
        return;
      }
      try {
        const data = await getWorkouts(token);
        setWorkouts(data || []);
      } catch (error) {
        if (error.message.includes("401")) {
          console.error("Token is invalid or expired");
          // Rediriger vers la page de connexion ou rafraîchir le token
        } else {
          console.error("Failed to fetch workouts:", error);
        }
      }
    }
    fetchWorkouts();
  }, [token]);

  if (!workouts || !Array.isArray(workouts)) {
    return <p>No data available</p>;
  }

  const data = {
    labels: workouts.map((workout) => workout.name),
    datasets: [
      {
        label: "Number of Sets",
        data: workouts.map((workout) => workout.exercises.length),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return (
    <div>
      <h2>Your Exercise Summary</h2>
      <Bar data={data} />
    </div>
  );
}
