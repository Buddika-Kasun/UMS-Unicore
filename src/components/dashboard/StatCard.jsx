import React from 'react';
import styles from './StatCard.module.css';

const StatCard = ({ title, value, change }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardValue}>{value}</p>
      <p className={styles.cardChange}>{change}</p>
    </div>
  );
};

export default StatCard;
