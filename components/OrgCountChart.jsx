"use client";

import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const OrgCountChart = () => {
  const [timeRange, setTimeRange] = useState("month"); // Default to month
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  // Dummy data for different time ranges
  const dataByTimeRange = {
    week: {
      labels: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      datasets: [
        {
          label: "Number of Organizations",
          data: [3, 2, 1, 4, 5, 2, 3],
          fill: false,
          borderColor: "rgb(75, 192, 192)",
        },
      ],
    },
    month: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      datasets: [
        {
          label: "Number of Organizations",
          data: [10, 15, 8, 12],
          fill: false,
          borderColor: "rgb(153, 102, 255)",
        },
      ],
    },
    year: {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          label: "Number of Organizations",
          data: [12, 19, 3, 5, 2, 3, 9, 8, 6, 7, 11, 14],
          fill: false,
          borderColor: "rgb(255, 159, 64)",
        },
      ],
    },
  };

  useEffect(() => {
    // Update chart data based on the selected time range
    setChartData(dataByTimeRange[timeRange]);
  }, [timeRange]);

  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <main className="text-white">
      <div className="flex justify-start w-full min-h-screen pt-10">
        <div>
          <div className="mb-4">
            <select
              value={timeRange}
              onChange={handleTimeRangeChange}
              className="select select-bordered"
            >
              <option value="week">Week</option>
              <option value="month">Month</option>
              <option value="year">Year</option>
            </select>
          </div>
          <Line data={chartData} options={options} />
        </div>
      </div>
    </main>
  );
};

export default OrgCountChart;
