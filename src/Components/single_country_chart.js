import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function CountryChart({ data }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (data) {
      const ctx = document.getElementById('chart').getContext('2d');

      // Destroy the existing chart instance if it exists
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const chartConfig = {
        type: 'line',
        data: {
          labels: Object.keys(data.YearlyData),
          datasets: [
            {
              label: data.CountryName,
              data: Object.values(data.YearlyData),
              borderColor: 'rgba(75, 192, 192, 192)',
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Year',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Population Percentage',
              },
            },
          },
        },
      };

      const newChart = new Chart(ctx, chartConfig);
      chartRef.current = newChart;
    }
  }, [data]);

  return <canvas id="chart" />;
}

export default CountryChart;
