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
            return `${context.dataset.label}: ${context.parsed.y}`;
          }
        },
        backgroundColor: '#000', 
        titleColor: '#fff', 
        bodyColor: '#fff', 
        borderColor: '#fff', 
        borderWidth: 1
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#000' 
        }
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          beginAtZero: true,
          color: '#000' 
        }
      }
    }
  };

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Solved',
        data: data.values,
        backgroundColor: [
          '#36A2EB',
          '#FF6384',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ],
        borderRadius: 2, 
        barThickness: 10, 
      }
    ]
  };

  return <Bar data={chartData} options={options}/>;
};

export default BarChart;