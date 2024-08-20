import React, { useContext, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { NutritionContext } from "../../context/NutritionContext";
import { WorkoutsContext } from "../../context/WorkoutsContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const { nutritionData } = useContext(NutritionContext);
  const { workouts } = useContext(WorkoutsContext);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  useEffect(() => {
    if (workouts && workouts.length > 0) {
      const dates = workouts.map((workout) =>
        new Date(workout.date).toLocaleDateString()
      );
      const calories = workouts.map((workout) =>
        workout.exercises.reduce(
          (total, exercise) => total + exercise.caloriesBurned,
          0
        )
      );

      setChartData({
        labels: dates,
        datasets: [
          {
            label: "Calories Burned",
            data: calories,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 1,
          },
          // Ajoutez plus de datasets si nécessaire
        ],
      });
    }
  }, []);

  useEffect(() => {
    if (nutritionData && nutritionData.length > 0) {
      const dates = nutritionData.map((nutrition) =>
        new Date(nutrition.date).toLocaleDateString()
      );
      const intake = nutritionData.map((nutrition) =>
        nutrition.meals.reduce((total, meal) => total + meal.calories, 0)
      );

      setChartData((prevData) => ({
        ...prevData,
        datasets: [
          ...prevData.datasets,
          {
            label: "Calories Intake",
            data: intake,
            backgroundColor: "rgba(153,102,255,0.4)",
            borderColor: "rgba(153,102,255,1)",
            borderWidth: 1,
          },
        ],
      }));
    }
  }, []);
  return (
    <div>
      <h2>Nutrition Dashboard</h2>
      <Line data={chartData} />
    </div>
  );
}
