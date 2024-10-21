import React from 'react';
import styles from './createItem.module.css';

const UserCreationForm = () => {
  return (
    <div className={styles.container}>
      {/* First Row: Title and Doc Info */}
      <div className={styles.firstRow}>
        <h2 className={styles.title}>User Creation</h2>

        <div className={styles.docInfo}>
          <div className={styles.inputGroup}>
            <label>Doc ID</label>
            <input type="text" value="LOC/serialNo" className={styles.inputField} disabled />
          </div>
          <div className={styles.inputGroup}>
            <label>Doc Date</label>
            <input type="text" value="DateTime.Now" className={styles.inputField} disabled />
          </div>
        </div>
      </div>

      {/* Second Row: Profile Picture */}
      <div className={styles.pictureContainer}>
        <div className={styles.userPicture}>
          <p>User Picture</p>
        </div>
      </div>

      {/* Third Row: Buttons */}
      <div className={styles.buttonGroup}>
        <button className={styles.buttonRejected}>Rejected</button>
        <button className={styles.buttonApproved}>Approved</button>
      </div>

      {/* Fourth Row: Form Body */}
      <div className={styles.formBody}>
        <div className={styles.formGroup}>
          <label>Req Date & Time :</label>
          <input type="text" value="Display" className={styles.inputField} disabled />
        </div>

        <div className={styles.formGroup}>
          <label>Verification Type :</label>
          <input type="text" value="Display" className={styles.inputField} disabled />
        </div>

        <div className={styles.formGroup}>
          <label>Faculty Name :</label>
          <input type="text" value="Display" className={styles.inputField} disabled />
        </div>

        <div className={styles.formGroup}>
          <label>User Role :</label>
          <input type="text" value="Display / Edit" className={styles.inputField} />
        </div>

        <div className={styles.formGroup}>
          <label>User Name :</label>
          <input type="text" value="Display" className={styles.inputField} disabled />
        </div>

        <div className={styles.formGroup}>
          <label>Password :</label>
          <input type="text" value="Display" className={styles.inputField} disabled />
        </div>
      </div>
    </div>
  );
};

export default UserCreationForm;
