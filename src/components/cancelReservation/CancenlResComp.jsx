"use client"

import React, { useEffect, useState } from 'react';
import styles from '@/styles/formCompsStyles.module.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import SubLoading from '../loading/SubLoading';

const CancelResComp = (
    {
        facultys,
        locations,
    }
) => {

    const router = useRouter();
    const [isloading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        faculty: '',
        location: '',
        title: '',
        bookTyp: '',
        from: '',
        to: '',
    });

    const filteredLocations = locations.filter(location => location.faculty === formData.faculty);

    const [reservations, setReservations] = useState([]);
    const [filteredReservations, setFilteredReservations] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('/api/pages/gestor/InfraGestor/cancelRes');
                //console.log("Res = ",res.data);
                setReservations(res.data);
            }
            catch (error) {
                console.error("Error fetching reservation data:", error);
            }
          };

          fetchData();
    }, []);

    useEffect(() => {
        // Filter reservations based on formData values
        const filterReservations = () => {

            const isEmptyFilter = !formData.title && !formData.faculty && !formData.location && !formData.bookTyp && !formData.from && !formData.to;

            if (isEmptyFilter) {
                setFilteredReservations([]); // Set to an empty array if all filters are empty
                return;
            }

            const filtered = reservations.filter(reservation => {
                const matchTitle = formData.title ? reservation.title.toLowerCase().includes(formData.title.toLowerCase()) : true;
                const matchFaculty = formData.faculty ? formData.faculty === "All" ? true : reservation.faculty === formData.faculty : true;
                const matchLocation = formData.location ? formData.location === "All" ? true : reservation.location === formData.location : true;
                const matchBookTyp = formData.bookTyp ? formData.bookTyp === "All" ? true : reservation.bookTyp === formData.bookTyp : true;

                const fromDate = formData.from ? new Date(formData.from) : null;
                const toDate = formData.to ? new Date(formData.to) : null;
                const reservationFrom = new Date(`${reservation.fromDate}T${reservation.fromTime}`);
                const reservationTo = new Date(`${reservation.toDate}T${reservation.toTime}`);

                const matchDateRange = fromDate && toDate
                    ? (reservationFrom >= fromDate && reservationFrom <= toDate) || (reservationTo <= toDate && reservationTo >= fromDate)
                    : true;

                return matchTitle && matchFaculty && matchLocation && matchDateRange && matchBookTyp;
            });
            setFilteredReservations(filtered);
        };

        filterReservations();
    }, [formData, reservations]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const nameRegex = /^[.a-zA-Z0-9\s]*$/;

        if (name === 'title' && !nameRegex.test(value)) {
            toast.warning("Title fields should only contain letters, numbers, and spaces.");
            return;
        }

        if (name === 'from' && formData.to !== '' && value > formData.to) {
            toast.warning("From Date & Time cannot be after To Date & Time.");
            return;
        }

        if (name === 'from' && value == '') {
            formData.to = '';
        }

        if (name === 'to' && value < formData.from && value !== '') {
            toast.warning("To Date & Time cannot be before From Date & Time.");
            return;
        }

        setFormData((prevData) => ({ ...prevData, [name]: value }));

    }

    const visit = (value) => {
        setIsLoading(true);
        router.push(`/gestor/InfraGestor/reservations?docID=${value}&method=Cancel`);
    }

  return (
    <>
      {isloading && <SubLoading />}
      <div className={styles.header}>
        {/* Title */}
        <h2 className={styles.title}>Cancel Reservation</h2>
      </div>

    <div className={styles.container}>

      {/* Parameters Section */}
      <div className={styles.formBody2}>

        <div className={styles.formGroup}>
            <label>Event Title</label>
            <input type="text" className={styles.inputField2} placeholder='Enter event title here' name='title' value={formData.title} onChange={handleChange} />
        </div>

        <div className={styles.formGroup}>
          <label>Booking Type</label>
          <select className={styles.inputField2} name='bookTyp' value={formData.bookTyp} onChange={handleChange} >
            <option value='' disabled>Select booking type</option>
            <option value='All'>All</option>
            <option value='Internal use'>Internal use</option>
            <option value='External use'>External use</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Faculty</label>
          <select className={styles.inputField2} name='faculty' value={formData.faculty} onChange={handleChange} >
              <option value="" disabled>Select faculty</option>
              <option value="All">All</option>
              {facultys.map((faculty, index) => (
                <option key={index} value={faculty.facultyName}>{faculty.facultyName}</option>
              ))}
            </select>
        </div>

        <div className={styles.formGroup}>
          <label>Location Name</label>
          <select className={styles.inputField2} name='location' value={formData.location} onChange={handleChange} disabled={(formData.faculty === '') || (formData.faculty === 'All')} >
              {filteredLocations.length > 0 ? (
                <>
                  <option value="" disabled>Select location</option>
                  <option value="All">All</option>
                  {filteredLocations.map((location, index) => (
                    <option key={index} value={location.locName}>
                      {location.locName}
                    </option>
                  ))}
                </>
              ) : (
                <option value="" disabled>
                  {formData.faculty === '' || formData.faculty === 'All' ? 'Select Faculty first' : 'No locations available.'}
                </option>
              )}
            </select>
        </div>

        <div className={styles.formGroup}>
          <label>From</label>
          <input type="datetime-local" className={styles.inputField2} name='from' value={formData.from} onChange={handleChange} />
        </div>

        {/* To Date */}
        <div className={styles.formGroup}>
          <label>To</label>
          <input type={(formData.from === '') ? "text" : "datetime-local"} placeholder='Add From Date first' className={styles.inputField2} name='to' value={formData.to} onChange={handleChange} disabled={(formData.from === '')} />
        </div>

      </div>

      {/* Table Section */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
            <thead>
                <tr>
                <th>Entered Date</th>
                <th>Reservation ID</th>
                <th>Reserved By</th>
                <th>Booking Type</th>
                <th>Event Title</th>
                <th>From</th>
                <th>To</th>
                <th>Repeat</th>
                <th>Reservation Remark</th>
                </tr>
            </thead>
            <tbody>
                {filteredReservations.length > 0 ? (
                    filteredReservations.map((reservation, index) => (
                        <tr key={index}>
                            <td>{new Date(reservation.docDate).toLocaleDateString()}</td>
                            <td><button className={styles.resIdBtn} onClick={() => visit(reservation.docID)}>{reservation.docID}</button></td>
                            <td>{reservation.reservedBy}</td>
                            <td>{reservation.bookTyp}</td>
                            <td>{reservation.title}</td>
                            <td>{`${reservation.fromDate} ${reservation.fromTime}`}</td>
                            <td>{`${reservation.toDate} ${reservation.toTime}`}</td>
                            <td>{reservation.repeat}</td>
                            <td>{reservation.remark}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="9" style={{ textAlign: 'center', padding: '10px' }}>
                            No reservations found
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default CancelResComp;
