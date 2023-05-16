import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const Histogram = ({ data }) => {
  const labels = data.map(item => item.word);
  const frequencies = data.map(item => item.frequency);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Frequency',
        data: frequencies,
        backgroundColor: 'rgba(255, 174, 6, 0.8)',
        borderColor: 'rgba(255, 0, 0, 0.8);',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default Histogram;
