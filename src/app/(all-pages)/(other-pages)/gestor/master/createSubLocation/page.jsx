import React from 'react';
import styles from './SubLocation.module.css';

const SubLocationForm = () => {
  return (
    <>
      <div className={styles.header}>
        <h2 className={styles.title}>Create Sub Location</h2>

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

        {/* Button Group */}
        <div className={styles.buttonRow}>
          <div className={styles.buttonGroup}>
            <button className={styles.button}>List View</button>
            <button className={styles.button}>New</button>
            <button className={styles.button}>Save</button>
          </div>
        </div>

        <form className={styles.form}>
          {/* Faculty */}
          <div className={styles.formGroup}>
            <label>Faculty</label>
            <select className={styles.input}>
              <option>Internal Use</option>
            </select>
          </div>

          {/* Location Name */}
          <div className={styles.formGroup}>
            <label>Location Name</label>
            <select className={styles.input}>
              <option>Internal Use</option>
            </select>
          </div>

          {/* Sublocation Name */}
          <div className={styles.formGroup}>
            <label>Sublocation Name</label>
            <input type="text" className={styles.input} placeholder="Value" />
          </div>

          {/* Sublocation Code */}
          <div className={styles.formGroup}>
            <label>Sublocation Code</label>
            <input type="text" className={styles.input} placeholder="Value" />
          </div>

          {/* Hall Capacity */}
          <div className={styles.formGroup}>
            <label>Hall Capacity</label>
            <select className={styles.input}>
              <option>Internal Use</option>
            </select>
          </div>

          {/* Stock Location */}
          <div className={styles.formGroup}>
            <label>Stock Location</label>
            <div className={styles.inlineGroup}>
              <label className={styles.radio}>
                <input type="radio" name="stockLocation" value="yes" /> Yes
              </label>
              <label className={styles.radio}>
                <input type="radio" name="stockLocation" value="no" /> No
              </label>
            </div>
            
          </div>
                    {/* Rack No */}
                    <div className={styles.formGroup}>
            <label>Rack No</label>
            <input type="text" className={styles.input} placeholder="Value" />
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

          {/* Bin No */}
          <div className={styles.formGroup}>
            <label>Bin No</label>
            <input type="text" className={styles.input} placeholder="Value" />
          </div>
        </form>

        {/* Table */}
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Department</th>
                <th>Active</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ICT</td>
                <td>
                  <input type="checkbox" />
                </td>
              </tr>
              <tr>
                <td>EGT</td>
                <td>
                  <input type="checkbox"  />
                </td>
              </tr>
              <tr>
                <td>BST</td>
                <td>
                  <input type="checkbox" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default SubLocationForm;
