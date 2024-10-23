import React from 'react';
import styles from './catalog.module.css';
import ListView from '@/components/listView/ListView';

const FacultyCreationForm = () => {
  
  const Header = [
    "Faculty Code",
    "Faculty Name",
    "Active",
  ];

  const data = [{
    facultyCode: "001",
    facultyName: "FOT",
    Active: "Yes",
  }];
  
  return (
    <div className={styles.container}>
      {/* Title */}
      <h2 className={styles.title}>Create Faculty</h2>

      {/* Buttons Row */}
      <div className={styles.buttonGroup}>
        <button className={styles.buttonNew}>New</button>
        <button className={styles.buttonSave}>Save</button>
      </div>

      {/* Form Fields */}
      <div className={styles.formBody}>
        <div className={styles.formGroup}>
          <label>Doc ID</label>
          <input type="text" value="Auto" className={styles.inputField} disabled />
        </div>

        <div className={styles.formGroup}>
          <label>Faculty Code</label>
          <input type="text" placeholder="Enter" className={styles.inputField} />
        </div>

        <div className={styles.formGroup}>
          <label>Faculty Name</label>
          <input type="text" placeholder="Enter" className={styles.inputField} />
        </div>

        {/* Active Status with Radio Buttons */}
        <div className={styles.formGroupActive}>
          <label>Active?</label>
          <div className={styles.activeOptions}>
            <label>
              <input type="radio" name="activeStatus" /> Yes
            </label>
            <label>
              <input type="radio" name="activeStatus" /> No
            </label>
          </div>
        </div>
      </div>
      <ListView initData={data} headers={Header} updatePath={"#"} reqPath={"#"}/>
    </div>
  );
};

export default FacultyCreationForm;
