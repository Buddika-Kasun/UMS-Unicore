"use client"

import React from 'react';
import styles from './pendingUsers.module.css';

const PendingUsersComp = ({users,facultys}) => {



    return (
        <>
        <h2 className={styles.title}>Pending for User Creation</h2>
        <div className={styles.container}>
        {/* Parameters Section */}
            <div className={styles.parametersSection}>
                <div className={styles.formGroup}>
                <label>Faculty Name</label>
                <select className={styles.inputField}>
                    <option value="" disabled>Select Faculty</option>
                    {facultys.map((faculty, index) => (
                        <option key={index} value={faculty}>{faculty}</option>
                    ))}
                </select>
                </div>

                {/* <div className={styles.formGroup}>
                <label>User Name</label>
                <select className={styles.inputField}>
                    <option>Internal Use</option>
                    <option>External Use</option>
                </select>
                </div> */}

                <div className={styles.formGroup}>
                <label>Role</label>
                <select className={styles.inputField}>
                    <option value="" disabled >Select the type of user you want</option>
                    <option value="System Admin">System Admin</option>
                    <option value="Student">Student</option>
                    <option value="Staff">Staff</option>
                    <option value="Library Staff">Library Staff</option>
                    <option value="Administrators">Administrators</option>
                    <option value="Test">Test</option>
                </select>
                </div>
            </div>

            {/* Table Section */}
            <div className={styles.tableSection}>
                <table className={styles.pendingTable}>
                <thead>
                    <tr>
                        <th>Date & Time</th>
                        <th>Faculty Name</th>
                        <th>User Name</th>
                        <th>User Role</th>
                        <th>View Request</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>06/06/2024 12.00 PM</td>
                        <td>Building 1</td>
                        <td>Admin</td>
                        <td>Event 1</td>
                        <td><a href="#">Display(Hyperlink)</a></td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>
        </>
    );
};

export default PendingUsersComp;
