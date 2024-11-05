"use client"

import React, { useEffect, useState } from 'react';
import styles from '@/styles/formCompsStyles.module.css';
//import styles from './pendingUsers.module.css';
import Link from 'next/link';

const PendingUsersComp = ({users,facultys}) => {

    //const [pendingUsers, setPendingUsers] = useState(users);
    const [filteredUsers, setFilteredUsers] = useState(users);
    const [selectedFaculty, setSelectedFaculty] = useState('');
    const [selectedRole, setSelectedRole] = useState('');

    let filtered = users;


    useEffect(() => {

        if (selectedFaculty) {
            filtered = filtered.filter(user => user.faculty === selectedFaculty);
        }

        if (selectedRole) {
            filtered = filtered.filter(user => user.type === selectedRole);
        }

        setFilteredUsers(filtered);
    }, [selectedFaculty, selectedRole, users]);

    return (
        <>
        <div className={styles.header}>
        <h2 className={styles.title}>Pending for User Creation</h2>
        </div>

        <div className={styles.container}>
        
        {/* Form Fields */}
            <div className={styles.formBody}>
                <div className={styles.formGroup}>
                <label>Faculty Name</label>
                <select
                    className={styles.inputField}
                    value={selectedFaculty}
                    onChange={(e) => setSelectedFaculty(e.target.value)}
                >
                    <option value="">All</option>
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
                <select
                    className={styles.inputField}
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                >
                    <option value="">All</option>
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
                    {/* <tr>
                        <td>06/06/2024 12.00 PM</td>
                        <td>Building 1</td>
                        <td>Admin</td>
                        <td>Event 1</td>
                        <td><a href="#">Display(Hyperlink)</a></td>
                    </tr> */}
                    {filteredUsers.length > 0 ?
                    (
                        filteredUsers.map((user, index) => (
                            <tr key={index}>
                            <td>{new Date(user.verification.createDate).toLocaleDateString()}</td>
                            <td>{user.faculty}</td>
                            <td>{user.name}</td>
                            <td>{user.type}</td>
                            <td><Link href={`/setup/pendingUsers/verificationPage?id=${user._id}`} >Check</Link></td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No pending users found</td>
                        </tr>
                    )}
                </tbody>
                </table>
            </div>
        </div>
        </>
    );
};

export default PendingUsersComp;
