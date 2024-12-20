"use client"

import React from 'react';
import styles from '@/styles/formCompsStyles.module.css';
import StatCard from './StatCard';
import LineChart from './LineChart';
import UserTable from './UserTable';

const Dashboard = ({user}) => {
    
  return (
    <>
        <div className={styles.header}>
            {/* Title */}
            <h2 className={styles.title}>Dashboard</h2>
        </div>
        <div className={styles.container}>
        <div className={styles.statsContainer}>
            {/* <StatCard title="Views" value="5" change="+11.01%" /> */}
            <StatCard title="Visits" value="5" change="-0.03%" />
            <StatCard title="New Users" value="1" change="+15.03%" />
            <StatCard title="Active Users" value="6" change="+6.08%" />
        </div>
        <div className={styles.chartContainer}>
            <LineChart />
        </div>
            <UserTable users1={user}/>
        </div>
    </>
  );
};

export default Dashboard;
