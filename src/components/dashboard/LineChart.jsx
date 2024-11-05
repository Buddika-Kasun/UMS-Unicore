import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import styles from './LineChart.module.css';

// Register the required components with ChartJS
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = () => {
  const data = {
    labels: ['Aug', 'Sep', 'Oct', 'Nov'],
    datasets: [
      {
        label: 'Users',
        data: [1, 2, 4, 5, 6],
        borderColor: '#007bff',
        pointBackgroundColor: '#FFFFFF',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className={styles.chart}>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
