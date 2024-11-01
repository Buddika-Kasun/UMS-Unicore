"use client"

import { useEffect, useState } from 'react';
import styles from './reservation.module.css';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import SubLoading from '../loading/SubLoading';
import axios from 'axios';
import { HiArrowLeft } from 'react-icons/hi';

const ReservationComp = (
  {
    facultys,
    data,
    locations,
    method,
    user,
  }
) => {

  const [isloading, setIsLoading] = useState(false);

  const router = useRouter();

  const [formData, setFormData] = useState({
    docID: data.docID,
    docDate: data.docDate || new Date(Date.now()).toLocaleString(),
    faculty: data.faculty || '',
    bookTyp: data.bookTyp || '',
    title: data.title || '',
    location: data.location || '',
    fromDate: data.fromDate || '',
    toDate: data.toDate || '',
    fromTime: data.fromTime || '',
    toTime: data.toTime || '',
    organizer: data.organizer || '',
    remark: data.remark || '',
    repeat: data.repeat || '',
    reservedBy: data.reservedBy || user,
    active: data.active || '',
    cancel: data.cancel || 'No',
  });

  const filteredLocations = locations.filter(location => location.faculty === formData.faculty);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nameRegex = /^[.a-zA-Z0-9\s]*$/;

    if (name === 'fromDate' && formData.toDate !== '' && value > formData.toDate) {
      toast.warning("From Date cannot be after to Date.");
      return;
    }

    if (name === 'fromDate' && value == '') {
      formData.toDate = '';
      formData.fromTime = '';
      formData.toTime = '';
    }

    if (name === 'toDate' && value < formData.fromDate && value !== '') {
      toast.warning("To Date cannot be before From Date.");
      return;
    }

    if (name === 'toDate' && value == '') {
      formData.fromTime = '';
      formData.toTime = '';
    }

    if (name === 'fromTime') {
      const fromDateTime = new Date(`${formData.fromDate}T${value}`);
      const toDateTime = new Date(`${formData.fromDate}T${formData.toTime}`);
      if (formData.fromDate === formData.toDate && toDateTime <= fromDateTime) {
        toast.warning("From Time cannot be after To Time.");
        return;
      }
    }

    if (name === 'fromTime' && value == '') {
      formData.toTime = '';
    }

    if (name === 'toTime') {
      const fromDateTime = new Date(`${formData.fromDate}T${formData.fromTime}`);
      const toDateTime = new Date(`${formData.fromDate}T${value}`);
      if (formData.fromDate === formData.toDate && toDateTime <= fromDateTime) {
        toast.warning("To Time cannot be before From Time.");
        return;
      }
    }


    if (
      (name === 'title' ||
       name === 'organizer' ||
       name === 'remark') &&
      !nameRegex.test(value)
    ) {
      toast.warning("Name fields should only contain letters, numbers, and spaces.");
      return;
    }

    setFormData((prevData) => ({ ...prevData, [name]: value }));

  };

  const formReset = (docID) => {
    setFormData({
      docID: docID,
      docDate: new Date(Date.now()).toLocaleString(),
      faculty: '',
      bookTyp: '',
      title: '',
      location: '',
      fromDate: '',
      toDate: '',
      fromTime: '',
      toTime: '',
      organizer: '',
      remark: '',
      repeat: '',
      reservedBy: data.reservedBy,
      active: '',
      cancel: 'No',
    });
  };

  const visit = () => {
    setIsLoading(true);
    router.push('/gestor/InfraGestor/reservations/listView');
  }

  const goNew = async() => {

    setIsLoading(true);

    /*try {
      const res = await axios.get('/api/pages/gestor/InfraGestor/reservations', {params: {last: 'true'}});
      formReset(res.data);
    }
    catch (error) {
      setIsLoading(false);
        toast.error('An unexpected error occurred while getting data.');
    }

    setIsLoading(false);*/ //replace 1
    router.push('/gestor/InfraGestor/reservations');
  }

  //replace 1
  useEffect(() => {
    const fetchData = async () => {
      if (method === 'Create') {
        setIsLoading(true);
        try {
          const res = await axios.get('/api/pages/gestor/InfraGestor/reservations', { params: { last: 'true' } });
          formReset(res.data);
        } catch (error) {
          console.error("Error fetching reservation data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [method]);

  const handleSave = async(e) => {
    e.preventDefault();

    try {

      if(Object.values(formData).some(value => value === '' || value === null || value === undefined)){
        toast.warning("All fields required");
        return;
      }

      setIsLoading(true);

      let res;

      if(method == 'Create') {
        res = await axios.post('/api/pages/gestor/InfraGestor/reservations', formData);
      }

      if(method == 'Update') {
        res = await axios.put('/api/pages/gestor/InfraGestor/reservations', formData);
      }

      if (res.status === 200) {
        //console.log(res.data.message);

        // Update docID
        const x = formData.docID.split('/');
        const newDocId = `${x[0]}/${x[1]}/${parseInt(x[2])+1}`;

        formReset(newDocId);

        setIsLoading(false);

        setTimeout(() => {
          (method == 'Update') && router.push('/gestor/InfraGestor/reservations/listView');
        }, 1000);

        toast.success(res.data.message, {
            autoClose: 2000,
        });
      }
      else {
        throw err;
      }

    }
    catch(err) {
      //console.log(err);
      setIsLoading(false);
      toast.error('An unexpected error occurred while processing.');
    }
  };

  return (
    <>
      {isloading && <SubLoading />}
      <div className={styles.header}>
        <h2 className={styles.title}>
          {(method == "Update") && <button className={styles.backBtn} onClick={visit}><HiArrowLeft /></button>}
          {(method == "Update")? "Update" : "Create"} Reservation
        </h2>

        <div className={styles.docInfo}>
          <div className={styles.formGroup}>
            <label>Doc ID</label>
            <input type="text" className={styles.input} name='docID' value={formData.docID} disabled/>
          </div>
          <div className={styles.formGroup}>
            <label>Doc Date</label>
            <input type="text" className={styles.input} name='docDate' value={formData.docDate} disabled/>
          </div>
        </div>
      </div>

    <div className={styles.container}>

      {/* Button Group now in a new row */}
      <div className={styles.buttonRow}>
        <div className={styles.buttonGroup}>
          {(method == "Create") && <button className={styles.button} onClick={visit}>List View</button>}
          {(method == "Update") && <button className={styles.button} onClick={goNew}>New</button>}
          <button className={styles.button} onClick={() => formReset(formData.docID)}>Clear all</button>
          <button className={styles.button} onClick={handleSave}>{(method !== "Create")? "Update" : "Save"}</button>
        </div>
      </div>

      <form className={styles.form}>

      <div className={styles.formGroup}>
          <label>Faculty</label>
          <select className={styles.input} name='faculty' value={formData.faculty} onChange={handleChange} disabled={method !== 'Create'} >
              <option value="" disabled>Select faculty</option>
              {facultys.map((faculty, index) => (
                <option key={index} value={faculty.facultyName}>{faculty.facultyName}</option>
              ))}
            </select>
        </div>

        {/* Booking Type */}
        <div className={styles.formGroup}>
          <label>Booking Type</label>
          <select className={styles.input} name='bookTyp' value={formData.bookTyp} onChange={handleChange} disabled={method !== 'Create'} >
            <option value='' disabled>Select booking type</option>
            <option value='Internal use'>Internal use</option>
            <option value='External use'>External use</option>
          </select>
        </div>

        {/* Event Title */}
        <div className={styles.formGroup}>
          <label>Event Title</label>
          <input type="text" className={styles.input} placeholder='Enter event title here' name='title' value={formData.title} onChange={handleChange} disabled={method !== 'Create'} />
        </div>

        {/* Location Name */}
        <div className={styles.formGroup}>
          <label>Location Name</label>
          <select className={styles.input} name='location' value={formData.location} onChange={handleChange} disabled={(method !== 'Create') || (formData.faculty === '')} >
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

        {/* From Date */}
        <div className={styles.formGroup}>
          <label>From Date</label>
          <input type="date" className={styles.input} name='fromDate' value={formData.fromDate} onChange={handleChange} disabled={method !== 'Create'} />
        </div>

        {/* To Date */}
        <div className={styles.formGroup}>
          <label>To Date</label>
          <input type={(formData.fromDate === '') ? "text" : "date"} placeholder='Add From Date first' className={styles.input} name='toDate' value={formData.toDate} onChange={handleChange} disabled={(method !== 'Create') || (formData.fromDate === '')} />
        </div>

        {/* From Time */}
        <div className={styles.formGroup}>
          <label>From Time</label>
          <input type={(formData.toDate === '') ? "text" : "time"} placeholder='Add To Date first' className={styles.input} name='fromTime' value={formData.fromTime} onChange={handleChange} disabled={(method !== 'Create') || (formData.toDate === '')} />
        </div>

        {/* To Time */}
        <div className={styles.formGroup}>
          <label>To Time</label>
          <input type={(formData.fromTime === '') ? "text" : "time"} placeholder='Add From Time first' className={styles.input} name='toTime' value={formData.toTime} onChange={handleChange} disabled={(method !== 'Create') || (formData.fromTime === '')} />
        </div>

        {/* Organizer */}
        <div className={styles.formGroup}>
          <label>Organizer</label>
          <input type="text" className={styles.input} placeholder='Enter organizer name here' name='organizer' value={formData.organizer} onChange={handleChange} disabled={method !== 'Create'} />
        </div>

        <div className={styles.formGroup}>
          <label>Reservation Remarks</label>
          <input type="text" className={styles.input} placeholder='Enter remarks here' name='remark' value={formData.remark} onChange={handleChange} disabled={method !== 'Create'} />
        </div>

        <div className={styles.formGroup}>
          <label>Repeat</label>
          <select className={styles.input} name='repeat' value={formData.repeat} onChange={handleChange} disabled={method !== 'Create'} >
            <option value='' disabled>Select repeat</option>
            <option value='None'>None</option>
            <option value='Daily'>Daily</option>
            <option value='Weekly'>Weekly</option>
            <option value='Monthly'>Monthly</option>
            <option value='Yearly'>Yearly</option>
          </select>
        </div>

        {/* Active */}
        <div className={styles.formGroup}>
          <label>Active?</label>
          <div className={styles.inlineGroup}>
            <label className={styles.radio}>
              <input type="radio" name="active" value="Yes" checked={formData.active === 'Yes'} onChange={handleChange} disabled={method === 'Cancel'} /> Yes
            </label>
            <label className={styles.radio}>
              <input type="radio" name="active" value="No" checked={formData.active === 'No'} onChange={handleChange} disabled={method === 'Cancel'} /> No
            </label>
          </div>
        </div>

        {/* Canceled */}
        {(method === 'Cancel') && <div className={styles.formGroup}>
          <label>Canceled?</label>
          <div className={styles.inlineGroup}>
            <label className={styles.radio}>
              <input type="radio" name="cancel" value="Yes" checked={formData.cancel === 'Yes'} onChange={handleChange} /> Yes
            </label>
            <label className={styles.radio}>
              <input type="radio" name="cancel" value="No" checked={formData.cancel === 'No'} onChange={handleChange} /> No
            </label>
          </div>
        </div>}
      </form>

      {/* Table */}
      <div className={styles.tableContainer}>
      <table className={styles.table}>
          <thead>
            <tr>
              <th>Location Name</th>
              <th>Hall No</th>
              <th>Hall Capacity</th>
              <th>Status</th>
              <th>Latest Reservation</th>
              <th>Reserved By</th>
              <th>Reserved Until</th>
              <th>Reserve</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Building 1</td>
              <td>LGF 05</td>
              <td>150</td>
              <td>Free</td>
              <td>Event 1</td>
              <td>Admin</td>
              <td>06/06/2024 12.00 PM</td>
              <td>06/06/2024 12.00 PM</td>
            </tr>
            <tr>
              <td>Building 2</td>
              <td>SF 01</td>
              <td>75</td>
              <td>Reserved</td>
              <td>Event 2</td>
              <td>Admin</td>
              <td>06/06/2024 12.00 PM</td>
              <td>06/06/2024 12.00 PM</td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default ReservationComp;