import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function BarChart({ countryName1, countryName2, data1, data2 }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (data1 && data2) {
      const labels = Object.keys(data1.YearlyData);
      const data1Values = Object.values(data1.YearlyData);
      const data2Values = Object.values(data2.YearlyData);

      // Destroy the existing chart instance if it exists
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const ctx = document.getElementById("bar-chart").getContext("2d");

      chartRef.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              label: `${countryName1}`,
              data: data1Values,
              backgroundColor: "rgba(75, 192, 192, 0.5)", // Adjust color as needed
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
            {
              label: `${countryName2}`,
              data: data2Values,
              backgroundColor: "rgba(255, 99, 132, 0.5)", // Adjust color as needed
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: "Year",
              },
            },
            y: {
              title: {
                display: true,
                text: "Population in Percentage",
              },
            },
          },
        },
      });
    }
  }, [data1, data2, countryName1, countryName2]);

  return <canvas id="bar-chart"></canvas>;
}

export default BarChart;
