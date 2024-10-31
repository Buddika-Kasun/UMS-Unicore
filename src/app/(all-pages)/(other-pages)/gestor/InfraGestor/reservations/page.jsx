import React from 'react';
import styles from './reservation.module.css';

const ReservationForm = () => {
  return (
    <>
      <div className={styles.header}>
        <h2 className={styles.title}>Reservations</h2>

        <div className={styles.docInfo}>
          <div className={styles.formGroup}>
            <label>Doc ID</label>
            <input type="text" className={styles.input} placeholder="LOC/serialNo" />
          </div>
          <div className={styles.formGroup}>
            <label>Doc Date</label>
            <input type="text" className={styles.input} value={new Date(Date.now()).toLocaleString()} readOnly/>
          </div>
        </div>
      </div>

    <div className={styles.container}>

      {/* Button Group now in a new row */}
      <div className={styles.buttonRow}>
        <div className={styles.buttonGroup}>
          <button className={styles.button}>List View</button>
          <button className={styles.button}>New</button>
          <button className={styles.button}>Save</button>
        </div>
      </div>

      <form className={styles.form}>

      <div className={styles.formGroup}>
          <label>Faculty</label>
          <select className={styles.input}>
            <option>Faculty of Technology</option>
            <option>Faculty of Arts</option>
          </select>
        </div>
        
        {/* Booking Type */}
        <div className={styles.formGroup}>
          <label>Booking Type</label>
          <select className={styles.input}>
            <option>Internal Use</option>
            <option>External Use</option>
          </select>
        </div>

        {/* Event Title */}
        <div className={styles.formGroup}>
          <label>Event Title</label>
          <input type="text" className={styles.input}  />
        </div>

        {/* Location Name */}
        <div className={styles.formGroup}>
          <label>Location Name</label>
          <select className={styles.input}>
            <option>Building 1</option>
            <option>Building 2</option>
          </select>
        </div>

        {/* From Date */}
        <div className={styles.formGroup}>
          <label>From Date</label>
          <input type="date" className={styles.input} placeholder="dd/mm/yyyy" />
        </div>

        {/* To Date */}
        <div className={styles.formGroup}>
          <label>To Date</label>
          <input type="date" className={styles.input} placeholder="dd/mm/yyyy" />
        </div>

        {/* Location Code */}
        <div className={styles.formGroup}>
          <label>Location Code</label>
          <input type="text" className={styles.input}  />
        </div>

        {/* From Time */}
        <div className={styles.formGroup}>
          <label>From Time</label>
          <input type="time" className={styles.input} />
        </div>

        {/* To Time */}
        <div className={styles.formGroup}>
          <label>To Time</label>
          <input type="time" className={styles.input} />
        </div>

        {/* Organizer */}
        <div className={styles.formGroup}>
          <label>Organizer</label>
          <input type="text" className={styles.input}  />
        </div>

        <div className={styles.formGroup}>
          <label>Reservation Remarks</label>
          <input type="text" className={styles.input}  />
        </div>

        <div className={styles.formGroup}>
          <label>Repeat?</label>
          <div className={styles.inlineGroup}>
            <label className={styles.radio}>
              <input type="checkbox"/> Yes
            </label>
          </div>
        </div>

        {/* Active */}
        <div className={styles.formGroup}>
          <label>Active?</label>
          <div className={styles.inlineGroup}>
            <label className={styles.radio}>
              <input type="radio" name="active" value="yes" /> Yes
            </label>
            <label className={styles.radio}>
              <input type="radio" name="active" value="no" /> No
            </label>
          </div>
        </div>

        {/* Canceled */}
        <div className={styles.formGroup}>
          <label>Canceled?</label>
          <div className={styles.inlineGroup}>
            <label className={styles.radio}>
              <input type="radio" name="canceled" value="yes" /> Yes
            </label>
            <label className={styles.radio}>
              <input type="radio" name="canceled" value="no" /> No
            </label>
          </div>
        </div>
      </form>

      {/* Table */}
      <div className={styles.tableContainer}>
      <table className={styles.table}>
          <thead>
            <tr>
              <th>Location Name</th>
              <th>Hall No</th>
              <th>Status</th>
              <th>Latest Reservation</th>
              <th>Reserved By</th>
              <th>Reserved Until</th>
              <th>Hall Capacity</th>
              <th>Reserve</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Building 1</td>
              <td>LGF 05</td>
              <td>✔️</td>
              <td>Event 1</td>
              <td>Admin</td>
              <td>06/06/2024 12.00 PM</td>
              <td>06/06/2024 12.00 PM</td>
              <td>06/06/2024 12.00 PM</td>
            </tr>
            <tr>
              <td>Building 2</td>
              <td>SF 01</td>
              <td>❌</td>
              <td>Event 2</td>
              <td>Admin</td>
              <td>06/06/2024 12.00 PM</td>
              <td>06/06/2024 12.00 PM</td>
              <td>06/06/2024 12.00 PM</td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default ReservationForm;
