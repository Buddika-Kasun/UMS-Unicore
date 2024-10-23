import React from 'react';
import styles from './reserItem.module.css';

const CreateListForm = () => {
  return (
    <>
      <div className={styles.header}>
        <h2 className={styles.title}>Create List</h2>
      </div>

      <div className={styles.container}>

        <div className={styles.buttonRow}>
          <div className={styles.buttonGroup}>
            <button className={styles.button}>New</button>
            <button className={styles.button}>Save</button>
          </div>
        </div>

        <form className={styles.form}>
          {/* Left side inputs */}
          <div className={styles.formGroup}>
            <label>Doc ID</label>
            <input type="text" className={styles.input} placeholder="Auto Display" readOnly />
          </div>

          <div className={styles.formGroup}>
            <label>Entered By</label>
            <input type="text" className={styles.input} placeholder="Auto Display" readOnly />
          </div>

          <div className={styles.formGroup}>
            <label>Created Date</label>
            <input type="text" className={styles.input} placeholder="dd/mm/yyyy (Auto Display)" readOnly />
          </div>

          {/* Right side inputs */}
          <div className={styles.formGroup}>
            <label>Modified By</label>
            <input type="text" className={styles.input} placeholder="Auto Display" readOnly />
          </div>

          <div className={styles.formGroup}>
            <label>Modified Date</label>
            <input type="text" className={styles.input} placeholder="dd/mm/yyyy (Auto Display)" readOnly />
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

        {/* Table */}
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Value Code</th>
                <th>Value Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Enter</td>
                <td>Enter</td>
              </tr>
              <tr>
                <td>Enter</td>
                <td>Enter</td>
              </tr>
              <tr>
                <td>Enter</td>
                <td>Enter</td>
              </tr>
              <tr>
                <td>Enter</td>
                <td>Enter</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CreateListForm;
