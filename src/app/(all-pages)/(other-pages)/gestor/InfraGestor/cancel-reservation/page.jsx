import React from 'react';
import styles from './canReserv.module.css';

const CancelReservationForm = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Cancel Reservation</h2>

      {/* Parameters Section */}
      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label>From Date</label>
          <input type="date" className={styles.input} placeholder="dd/mm/yyyy" />
        </div>
        
        <div className={styles.formGroup}>
          <label>To Date</label>
          <input type="date" className={styles.input} placeholder="dd/mm/yyyy" />
        </div>

        <div className={styles.formGroup}>
          <label>Booking Type</label>
          <select className={styles.input}>
            <option>Internal Use</option>
            <option>External Use</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Booking Type</label>
          <select className={styles.input}>
            <option>Internal Use</option>
            <option>External Use</option>
          </select>
        </div>
      </div>

      {/* Table Section */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Entered Date</th>
              <th>Reservation ID</th>
              <th>Booking Type</th>
              <th>Event Title</th>
              <th>From Date</th>
              <th>From Time</th>
              <th>To Date</th>
              <th>To Time</th>
              <th>Repeated?</th>
              <th>Reservation Remark</th>
            </tr>
          </thead>
          <tbody>
            {/* Example Rows */}
            <tr>
              <td>06/06/2024</td>
              <td>Display(Hyperlink)</td>
              <td>Internal</td>
              <td>Event A</td>
              <td>06/06/2024</td>
              <td>12:00 PM</td>
              <td>06/06/2024</td>
              <td>12:00 PM</td>
              <td>Yes</td>
              <td>Remark A</td>
            </tr>
            <tr>
              <td>06/06/2024</td>
              <td>Display(Hyperlink)</td>
              <td>External</td>
              <td>Event B</td>
              <td>06/06/2024</td>
              <td>12:00 PM</td>
              <td>06/06/2024</td>
              <td>12:00 PM</td>
              <td>No</td>
              <td>Remark B</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CancelReservationForm;
