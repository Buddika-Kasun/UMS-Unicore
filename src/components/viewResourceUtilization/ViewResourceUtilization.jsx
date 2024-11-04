"use client"

import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // Needed for Chart.js 3+
import styles from '@/styles/formCompsStyles.module.css';
import axios from 'axios';

const ViewResourceUtilization = (
  {
    locations,
    facultys,
  }
) => {

  const [showCharts, setShowCharts] = useState(false);
  const [pieChartData, setPieChartData] = useState(null);
  const [barChartData, setBarChartData] = useState(null);

  const [formData, setFormData] = useState({
    faculty: '',
    location: '',
    month: '00',
    utilize: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Sample data for charts (replace with real data logic as needed)
  /*const pieData = {
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
        label: 'All Reservations',
        data: [12, 19, 3, 5, 2, 3, 8, 15, 10, 7, 13, 9], // Sample data; update based on inputs if needed
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };*/

  const filteredLocations = locations.filter(location => location.faculty === formData.faculty);

  const fetchReservationData = async () => {
    const { faculty, location, month } = formData;

    if (faculty) {
      try {
        const { data } = await axios.get(`/api/pages/gestor/InfraGestor/utilization`, {
          params: { faculty, location, month },
        });

        //console.log(data)

        // Prepare data for pie chart (by location or sublocation)
        const pieLabels = data.locationData.map((item) => item.sublocationCode || item._id);
        const pieCounts = data.locationData.map((item) => item.count);

        setPieChartData({
          labels: pieLabels,
          datasets: [
            {
              data: pieCounts,
              backgroundColor: pieLabels.map(
                (_, i) => `hsl(${(i * 360) / pieLabels.length}, 70%, 70%)`
              ),
            },
          ],
        });

        // Prepare data for bar chart (monthly reservation counts)
        const barLabels = data.monthlyCounts.map(item => item.month);
        const barCounts = data.monthlyCounts.map(item => item.count);

        setBarChartData({
          labels: barLabels.map(month => new Date(0, month - 1).toLocaleString('default', { month: 'short' })),
          datasets: [
            {
              label: 'Monthly Reservations',
              data: barCounts,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
          ],
        });

        setShowCharts(true);
      } catch (error) {
        console.error('Error fetching reservation data:', error);
      }
    }
  };

  useEffect(() => {
    fetchReservationData();
  }, [formData.faculty, formData.location, formData.month]);



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
          <label>Faculty</label>
          <select className={styles.inputField2} name='faculty' value={formData.faculty} onChange={handleChange} >
              <option value="" disabled>Select faculty</option>
              {facultys.map((faculty, index) => (
                <option key={index} value={faculty.facultyName}>{faculty.facultyName}</option>
              ))}
            </select>
        </div>

        {/* Location Name */}
        <div className={styles.formGroup}>
          <label>Location Name</label>
          <select className={styles.inputField2} name='location' value={formData.location} onChange={handleChange} disabled={(formData.faculty === '')} >
              {filteredLocations.length > 0 ? (
                <>
                  <option value="" >All</option>
                  {filteredLocations.map((location, index) => (
                    <option key={index} value={location.locName}>
                      {location.locName}
                    </option>
                  ))}
                </>
              ) : (
                <option value="" disabled>
                  {formData.faculty === '' ? 'Select Faculty first' : 'No locations available.'}
                </option>
              )}
            </select>
        </div>

        <div className={styles.formGroup}>
          <label>
            Month
          </label>
            <select
              name='month'
              value={formData.month}
              onChange={handleChange}
              className={styles.inputField2}
            >
              <option value='00'>All</option>
              <option value='01'>January</option>
              <option value='02'>February</option>
              <option value='03'>March</option>
              <option value='04'>April</option>
              <option value='05'>May</option>
              <option value='06'>June</option>
              <option value='07'>July</option>
              <option value='08'>August</option>
              <option value='09'>September</option>
              <option value='10'>October</option>
              <option value='11'>November</option>
              <option value='12'>December</option>
            </select>
        </div>

        {/* <div className={styles.formGroupActive}>
          <label>Utilized ?</label>
          <div className={styles.activeOptions}>
            <input
              type="checkbox"
              name='utilize'
              checked={formData.utilize}
              onChange={handleChange}
            />
          </div>
        </div> */}
      </div>

      {showCharts && (
        <div className={styles.chartsSection}>
          <h3>Charts</h3>
          <div className={styles.chartsContainer}>
            <div className={styles.chart}>
              <Pie data={pieChartData} />
            </div>
            <div className={styles.chart2}>
              <Bar data={barChartData} />
            </div>
          </div>
        </div>
      )}

    </div>
  </>
  );
}

export default ViewResourceUtilization;
