"use client"

import React from 'react';
import styles from './pendingUsers.module.css';

const PendingUsersComp = ({users}) => {



    return (
        <>
        <h2 className={styles.title}>Pending for User Creation</h2>
        <div className={styles.container}>
        {/* Parameters Section */}
            <div className={styles.parametersSection}>
                <div className={styles.formGroup}>
                <label>Faculty Name</label>
                <select className={styles.inputField}>
                    <option>Internal Use</option>
                    <option>External Use</option>
                </select>
                </div>

                <div className={styles.formGroup}>
                <label>User Name</label>
                <select className={styles.inputField}>
                    <option>Internal Use</option>
                    <option>External Use</option>
                </select>
                </div>

                <div className={styles.formGroup}>
                <label>Role</label>
                <select className={styles.inputField}>
                    <option>Internal Use</option>
                    <option>External Use</option>
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
