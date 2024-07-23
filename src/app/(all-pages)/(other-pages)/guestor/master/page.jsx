import React from 'react';
import styles from './ReservationForm.module.css';

const ReservationForm = () => {
  return (
    <div className={styles.container}>
      <h2>Reservations</h2>
      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label>Booking Type</label>
          <select className={styles.input}>
            <option>Internal Use</option>
            {/* Add other options as needed */}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Event Title</label>
          <input type="text" className={styles.input} value="Value" />
        </div>

        <div className={styles.formGroup}>
          <label>From Date</label>
          <input type="date" className={styles.input} placeholder="dd/mm/yyyy" />
        </div>

        <div className={styles.formGroup}>
          <label>From Time</label>
          <input type="time" className={styles.input} value="00:00" />
        </div>

        <div className={styles.formGroup}>
          <label>To Date</label>
          <input type="date" className={styles.input} placeholder="dd/mm/yyyy" />
        </div>

        <div className={styles.formGroup}>
          <label>To Time</label>
          <input type="time" className={styles.input} value="00:00" />
        </div>

        <div className={styles.formGroup}>
          <label>Faculty</label>
          <select className={styles.input}>
            <option>Faculty of Technology</option>
            {/* Add other options as needed */}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Organizer</label>
          <select className={styles.input}>
            <option>Admin</option>
            {/* Add other options as needed */}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Reservation Remarks</label>
          <textarea className={styles.textarea}>Value</textarea>
        </div>

        <div className={styles.formGroup}>
          <label>Repeat</label>
          <select className={styles.input}>
            <option>None</option>
            {/* Add other options as needed */}
          </select>
        </div>
      </form>
    </div>
  );
};

export default ReservationForm;
