"use client"

import React, { useState } from 'react';
import styles from './canReserv.module.css';
import { toast } from 'react-toastify';

const CancelResComp = (
    {
        facultys,
        locations,
    }
) => {

    const [formData, setFormData] = useState({
        faculty: '',
        location: '',
        title: '',
        bookTyp: '',
        from: '',
        to: '',
    });

    const filteredLocations = locations.filter(location => location.faculty === formData.faculty);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const nameRegex = /^[.a-zA-Z0-9\s]*$/;

        if (name === 'title' && !nameRegex.test(value)) {
            toast.warning("Title fields should only contain letters, numbers, and spaces.");
            return;
        }

        setFormData((prevData) => ({ ...prevData, [name]: value }));

    }

  return (
    <>
      <div className={styles.header}>
        <h2 className={styles.title}>Cancel Reservation</h2>
      </div>

    <div className={styles.container}>

      {/* Parameters Section */}
      <div className={styles.form}>

        <div className={styles.formGroup}>
            <label>Event Title</label>
            <input type="text" className={styles.input} placeholder='Enter event title here' name='title' value={formData.title} onChange={handleChange} />
        </div>

        <div className={styles.formGroup}>
          <label>Booking Type</label>
          <select className={styles.input} name='bookTyp' value={formData.bookTyp} onChange={handleChange} >
            <option value='' disabled>Select booking type</option>
            <option value='Internal use'>Internal use</option>
            <option value='External use'>External use</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Faculty</label>
          <select className={styles.input} name='faculty' value={formData.faculty} onChange={handleChange} >
              <option value="" disabled>Select faculty</option>
              {facultys.map((faculty, index) => (
                <option key={index} value={faculty.facultyName}>{faculty.facultyName}</option>
              ))}
            </select>
        </div>

        <div className={styles.formGroup}>
          <label>Location Name</label>
          <select className={styles.input} name='location' value={formData.location} onChange={handleChange} disabled={(formData.faculty === '')} >
              {filteredLocations.length > 0 ? (
                <>
                  <option value="" disabled>Select location</option>
                  {filteredLocations.map((location, index) => (
                    <option key={index} value={location.locName}>
                      {location.locName}
                    </option>
                  ))}
                </>
              ) : (
                <option value="" disabled>
                  {formData.faculty === '' ? 'Select Faculty first' : 'No locations available.'}
                </option>
              )}
            </select>
        </div>

        <div className={styles.formGroup}>
          <label>From</label>
          <input type="datetime-local" className={styles.input} name='from' value={formData.from} onChange={handleChange} />
        </div>

        {/* To Date */}
        <div className={styles.formGroup}>
          <label>To Date</label>
          <input type={(formData.from === '') ? "text" : "datetime-local"} placeholder='Add From Date first' className={styles.input} name='to' value={formData.to} onChange={handleChange} disabled={(formData.from === '')} />
        </div>

      </div>

      {/* Table Section */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Entered Date</th>
              <th>Reservation ID</th>
              <th>Booking Type</th>
              <th>Event Title</th>
              <th>From</th>
              <th>To</th>
              <th>Repeat</th>
              <th>Reservation Remark</th>
            </tr>
          </thead>
          <tbody>
            {/* Example Rows */}
            <tr>
              <td>06/06/2024</td>
              <td>Display(Hyperlink)</td>
              <td>Internal</td>
              <td>Event A</td>
              <td>06/06/2024</td>
              <td>06/06/2024</td>
              <td>None</td>
              <td>Remark A</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default CancelResComp;
