import React from 'react';
import styles from './viewCat.module.css';

const CostCenterForm = () => {
  return (
    <>
      <div className={styles.header}>
        <h2 className={styles.title}>Create Cost Center</h2>
      </div>

      <div className={styles.container}>

        <div className={styles.buttonRow}>
          <div className={styles.buttonGroup}>
            <button className={styles.button}>New</button>
            <button className={styles.button}>Save</button>
          </div>
        </div>

        <form className={styles.form}>

          <div className={styles.formGroup}>
            <label>Doc ID</label>
            <input type="text" className={styles.input} placeholder="Auto Display" readOnly />
          </div>

          <div className={styles.formGroup}>
            <label>Create By</label>
            <input type="text" className={styles.input} placeholder="Auto Display" readOnly />
          </div>

          <div className={styles.formGroup}>
            <label>Create Date</label>
            <input type="text" className={styles.input} placeholder="dd/mm/yyyy (Auto Display)" readOnly />
          </div>

          <div className={styles.formGroup}>
            <label>Faculty</label>
            <select className={styles.input}>
              <option>Select</option>
              <option>Faculty 1</option>
              <option>Faculty 2</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Cost Center Code</label>
            <input type="text" className={styles.input} placeholder="Enter" />
          </div>

          <div className={styles.formGroup}>
            <label>Cost Center Name</label>
            <input type="text" className={styles.input} placeholder="Enter" />
          </div>

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
        </form>

      </div>
    </>
  );
};

export default CostCenterForm;
