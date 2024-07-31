import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const BarChart = ({ data }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            // Custom tooltip label
            return `${context.dataset.label}: ${context.parsed.y}`;
          }
        },
        backgroundColor: '#000', // Tooltip background color
        titleColor: '#fff', // Tooltip title color
        bodyColor: '#fff', // Tooltip body color
        borderColor: '#fff', // Tooltip border color
        borderWidth: 1
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#000' // X-axis labels color
        }
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          beginAtZero: true,
          color: '#000' // Y-axis labels color
        }
      }
    }
  };

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Solved Challenges',
        data: data.values,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ],
        borderRadius: 2, // Bar corners radius
        barThickness: 10, // Bar width
      }
    ]
  };

  return <Bar data={chartData} options={options}/>;
};

export default BarChart;