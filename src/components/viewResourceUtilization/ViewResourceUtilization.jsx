"use client"

import React, { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // Needed for Chart.js 3+
import styles from '@/styles/formCompsStyles.module.css';

function ViewResourceUtilization() {
  const [month, setMonth] = useState('');
  const [location, setLocation] = useState('');
  const [isUtilized, setIsUtilized] = useState(false);
  const [showCharts, setShowCharts] = useState(false);

  // Sample data for charts (replace with real data logic as needed)
  const pieData = {
    labels: ['Utilized', 'Unutilized'],
    datasets: [
      {
        data: [70, 30], // Sample data; update based on inputs if needed
        backgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Reservations',
        data: [12, 19, 3, 5, 2, 3, 8, 15, 10, 7, 13, 9], // Sample data; update based on inputs if needed
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
    setShowCharts(true);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    setShowCharts(true);
  };

  const handleUtilizedChange = (e) => {
    setIsUtilized(e.target.checked);
  };

  return (
    <>
    <div className={styles.header}>
      {/* Title */}
      <h2 className={styles.title}>View Resource Utilization</h2>
    </div>

    <div className={styles.container}>

      {/* Form Fields */}
      <div className={styles.formBody2}>

        <div className={styles.formGroup}>
          <label>
            Month:
          </label>
            <input
              type="text"
              value={month}
              onChange={handleMonthChange}
              placeholder="Enter Month"
              className={styles.inputField2}
            />
        </div>

        <div className={styles.formGroup}>  
          <label>
            Location:
          </label>
            <input
              type="text"
              value={location}
              onChange={handleLocationChange}
              placeholder="Enter Location"
              className={styles.inputField2}
            />
        </div>

        <div className={styles.formGroupActive}>    
          <label>Utilized?</label>
          <div className={styles.activeOptions}>
            <input
              type="checkbox"
              checked={isUtilized}
              onChange={handleUtilizedChange}
            />
          </div>
        </div>
      </div>

      {showCharts && (
        <div className={styles.chartsSection}>
          <h3>Charts</h3>
          <div className={styles.chartsContainer}>
            <div className={styles.chart}>
              <h4>Pie Chart</h4>
              <Pie data={pieData} />
            </div>
            <div className={styles.chart}>
              <h4>Bar Chart</h4>
              <Bar data={barData} />
            </div>
          </div>
        </div>
      )}

      {isUtilized && (
        <div className={styles.reservationDetails}>
          <h3>Reservations for {location} in {month}</h3>
          <p>(Data will be shown here based on Month and Location)</p>
        </div>
      )}
    </div>
  </>
  );
}

export default ViewResourceUtilization;
