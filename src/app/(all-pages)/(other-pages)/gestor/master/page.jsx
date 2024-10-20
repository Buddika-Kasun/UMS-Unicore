import React from 'react';
import styles from './gesMaster.module.css';

const CreateLocationForm = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create Location</h2>

      {/* Document Section */}
      <div className={styles.docSection}>
        <div className={styles.formGroup}>
          <label>Doc ID</label>
          <input type="text" className={styles.input} value="LOC/serialNo" readOnly />
        </div>

        <div className={styles.formGroup}>
          <label>Doc Date</label>
          <input type="text" className={styles.input} value={new Date(Date.now()).toLocaleString()} readOnly />
        </div>
      </div>

      {/* Button Group Aligned to the Right */}
      <div className={styles.buttonGroup}>
        <button className={styles.button}>List View</button>
        <button className={styles.button}>New</button>
        <button className={styles.button}>Save</button>
      </div>

      {/* Form Fields Section */}
      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label>Faculty</label>
          <select className={styles.input}>
            <option>Internal Use</option>
            <option>External Use</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Cost Center</label>
          <select className={styles.input}>
            <option>Internal Use</option>
            <option>External Use</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Location Type</label>
          <select className={styles.input}>
            <option>Internal Use</option>
            <option>External Use</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Active?</label>
          <div className={styles.radioGroup}>
            <label>
              <input type="radio" name="active" /> Yes
            </label>
            <label>
              <input type="radio" name="active" /> No
            </label>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Building No</label>
          <input type="text" className={styles.input} placeholder="Value" />
        </div>

        <div className={styles.formGroup}>
          <label>Floor No</label>
          <input type="text" className={styles.input} placeholder="Value" />
        </div>

        <div className={styles.formGroup}>
          <label>Location Name</label>
          <input type="text" className={styles.input} placeholder="Value" />
        </div>

        <div className={styles.formGroup}>
          <label>Location Code</label>
          <input type="text" className={styles.input} value="Display" readOnly />
        </div>
      </div>
    </div>
  );
};

export default CreateLocationForm;
