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
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  useEffect(() => {
    if (nutritionData && nutritionData.length > 0) {
      const labels = [];
      const calories = [];
      const protein = [];
      const carbs = [];
      const fat = [];

      nutritionData.forEach((nutritionItem) => {
        nutritionItem.meals.forEach((meal) => {
          labels.push(meal.name);
          calories.push(meal.calories);
          protein.push(meal.protein);
          carbs.push(meal.carbs);
          fat.push(meal.fat);
        });
      });

      setChartData({
        labels,
        datasets: [
          {
            label: "Calories",
            data: calories,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 1,
          },
          {
            label: "Protein",
            data: protein,
            backgroundColor: "rgba(153, 102, 255, 0.6)",
            borderColor: "rgba(153, 102, 255, 1)",
            borderWidth: 1,
          },
          {
            label: "Carbs",
            data: carbs,
            backgroundColor: "rgba(255, 159, 64, 0.6)",
            borderColor: "rgba(255, 159, 64, 1)",
            borderWidth: 1,
          },
          {
            label: "Fat",
            data: fat,
            backgroundColor: "rgba(255, 99, 132, 0.6)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      });
    }
  }, []);
  return (
    <div>
      <h2>Nutrition Dashboard</h2>
      <Line data={chartData} />
    </div>
  );
}
