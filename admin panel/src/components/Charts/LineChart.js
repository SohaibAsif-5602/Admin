import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = ({ title, data }) => {
  const chartData = {
    labels: data ? data.map((item) => item.time) : [],
    datasets: [
      {
        label: title,
        data: data ? data.map((item) => item.value) : [],
        borderColor: "#36a2eb",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow manual size control
  };

  return (
    <div style={{ width: "400px", height: "250px" }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
