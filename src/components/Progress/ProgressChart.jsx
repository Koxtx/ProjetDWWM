import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function ProgressChart({ data }) {
  if (!data || data.length === 0) {
    return <div>Aucune donnée disponible pour le moment.</div>;
  }

  const chartData = {
    labels: data.map((entry) => new Date(entry.date).toLocaleDateString()),
    datasets: [
      {
        label: "Poids",
        data: data.map((entry) => entry.weight),
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
      {
        label: "Répétitions",
        data: data.map((entry) => entry.reps),
        borderColor: "rgba(255,99,132,1)",
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Suivi des progrès</h2>
      <Line data={chartData} options={options} />
    </div>
  );
}
