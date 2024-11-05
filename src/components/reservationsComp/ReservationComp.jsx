"use client"

import { useEffect, useState } from 'react';
import styles from '@/styles/formCompsStyles.module.css';
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
  const [halls, setHalls] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [displayHalls, setDisplayHalls] = useState([]);
  const [selectedHalls, setSelectedHalls] = useState(data.hallStatusPairs || []);

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
    //hallStatusPairs: data.hallStatusPairs || [],
  });

  //console.log(formData)

  //setDisplayHalls(data.hallStatusPairs);

  const filteredLocations = locations.filter(location => location.faculty === formData.faculty);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nameRegex = /^[.a-zA-Z0-9\s]*$/;

    if (name === 'fromDate' && formData.toDate !== '' && value > formData.toDate) {
      toast.warning("From Date cannot be after to Date.");
      return;
    }

    if (name === 'fromDate') {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set time to midnight for today's date

      if (new Date(value) < today) {
        toast.warning("From Date cannot be before today.");
        return;
      }
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
      const now = new Date();
      const thirtyMinutesLater = new Date(now.getTime() + 30 * 60 * 1000); // Adds 30 minutes

      if (fromDateTime < thirtyMinutesLater) {
        toast.warning("From Time must be at least 30 minutes from now.");
        return;
      }
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

    setDisplayHalls([]);
    setHalls([]);
    setSelectedHalls([]);
  };

  const visit = (value) => {
    setIsLoading(true);
    if (value == "Update") {
      router.push('/gestor/InfraGestor/reservations/listView');
    }
    else if (value == "Cancel") {
      router.push('/gestor/InfraGestor/cancel-reservation');
    }
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

  const fetchSublocations = async() => {
    try {
      const res = await axios.get(`/api/pages/gestor/master/subLocation?location=${formData.location}`)

      if (res.status === 200){
        setHalls(res.data); //console.log(halls);
      }
      else{
        throw new Error;
      }
    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(() => {

    if(formData.location !== '') fetchSublocations();

  }, [formData.location]);

  /*const fetchFilteredReservations = async () => {
    if (formData.location && formData.fromDate && formData.toDate) {
      try {
        const res = await axios.get(`/api/pages/gestor/InfraGestor/reservations?location=${formData.location}&fromDate=${formData.fromDate}&toDate=${formData.toDate}`);
        const reservations = res.data;
        //console.log("234.reservations = ",reservations);
        if (formData.fromTime && formData.toTime) {
          // Filter reservations by time
          const filtered = reservations.filter(reservation =>
            new Date(`${formData.fromDate}T${reservation.fromTime}`) <= new Date(`${formData.toDate}T${formData.toTime}`) &&
            new Date(`${formData.toDate}T${reservation.toTime}`) >= new Date(`${formData.fromDate}T${formData.fromTime}`)
          );
          setFilteredReservations(filtered);
        } else {
          console.log("243.reservations = ",reservations);
          setFilteredReservations(reservations);
          console.log("245.filteredReservations = ",filteredReservations)
        }
        console.log("247.filteredReservations = ",filteredReservations)
      } catch (err) {
        console.error("Error fetching reservations:", err);
      }
      finally {
        const displayHalls = halls.map((hall) => {
          const reservation = filteredReservations.find(res => res.hallNo === hall.subLocationCode);

          return {
            hallNo: hall.subLocationCode,
            hallCap: hall.hallCap,
            status: reservation ? reservation.status : (formData.fromTime === '' || formData.toTime === '') ? '' : 'Free',
            title: reservation ? reservation.title : '',
            reservedBy: reservation ? reservation.reservedBy : '',
            dateTime: reservation ? reservation.dateTime : '',
          };

        });

        setDisplayHalls(displayHalls);
        console.log("displayHalls = ",displayHalls);
      }
    }
    else {

      const displayHalls = halls.map((hall) => {

        return {
          hallNo: hall.subLocationCode,
          hallCap: hall.hallCap,
          status: '',
          title: '',
          reservedBy: '',
          dateTime: '',
        };

      });

      setDisplayHalls(displayHalls);
    }
  };*/

  const fetchFilteredReservations = async () => {
    if (formData.location && formData.fromDate && formData.toDate) {
      try {
        const res = await axios.get(`/api/pages/gestor/InfraGestor/reservations?location=${formData.location}&fromDate=${formData.fromDate}&toDate=${formData.toDate}`);
        const reservations = res.data;

        // Filter reservations by time if fromTime and toTime are set
        /* if (formData.fromTime && formData.toTime) {
          const filtered = reservations.filter(reservation =>
            new Date(`${formData.fromDate}T${reservation.fromTime}`) <= new Date(`${formData.toDate}T${formData.toTime}`) &&
            new Date(`${formData.toDate}T${reservation.toTime}`) >= new Date(`${formData.fromDate}T${formData.fromTime}`)
          );
          setFilteredReservations(filtered);
        } else {
          setFilteredReservations(reservations);
        }*/

          let filtered = reservations;

          if (formData.fromTime) {
            const fromDateTime = new Date(`${formData.fromDate}T${formData.fromTime}`);
            filtered = filtered.filter(reservation => {
              const reservationEndTime = new Date(`${reservation.fromDate}T${reservation.toTime}`);
              return reservationEndTime >= fromDateTime;
            });
          }

          if (formData.toTime) {
            const toDateTime = new Date(`${formData.toDate}T${formData.toTime}`);
            filtered = filtered.filter(reservation => {
              const reservationStartTime = new Date(`${reservation.toDate}T${reservation.fromTime}`);
              return reservationStartTime <= toDateTime;
            });
          }

          if (method === "Cancel") {
            filtered = filtered.filter(reservation => {
              return reservation.docID === formData.docID;
            });
          }

          setFilteredReservations(filtered);

      } catch (err) {
        console.error("Error fetching reservations:", err);
      }
    }
  };

  useEffect(() => {

    fetchFilteredReservations(); //dconsole.log("filtereedReservation = ", filteredReservations);

  }, [halls, formData.fromDate, formData.toDate, formData.fromTime, formData.toTime]);

  useEffect(() => {
    const updatedDisplayHalls = halls.map((hall) => {
      const reservation = filteredReservations.find(res => res.hallNo === hall.subLocationCode);

      if (method === 'Cancel' && !reservation) {
        return null;
      }

      return {
        hallNo: hall.subLocationCode,
        hallCap: hall.hallCap,
        status: reservation ? reservation.status : (formData.fromTime === '' || formData.toTime === '') ? '' : (method === 'Cancel') ? '' : 'Free',
        title: reservation ? reservation.title : '',
        reservedBy: reservation ? reservation.reservedBy : '',
        dateTime: reservation ? reservation.dateTime : '',
      };
    }).filter(Boolean);

    setDisplayHalls(updatedDisplayHalls);
  }, [halls, filteredReservations, formData.fromTime, formData.toTime]);

  const handleCheckboxChange = (hallNo, hallCap, isChecked) => {
    setSelectedHalls((prev) => {
      if (isChecked) {
        return [...prev, { hallNo, hallCap, status: 'Reserved'}];
      } else {
        return prev.filter((hall) => hall.hallNo !== hallNo);
      }
    });
  };

  const handleSave = async(e) => {
    e.preventDefault();

    try {

      if(Object.values(formData).some(value => value === '' || value === null || value === undefined)){
        toast.warning("All fields required");
        return;
      }

      setIsLoading(true);

      const saveData = {
        ...formData,
        hallStatusPairs: selectedHalls,
      };

      //console.log(saveData);

      let res;

      if(method == 'Create') {
        res = await axios.post('/api/pages/gestor/InfraGestor/reservations', saveData);
      }

      if(method == 'Update') {
        res = await axios.put('/api/pages/gestor/InfraGestor/reservations', saveData);
      }

      if (method == 'Cancel') {
        const cancelData = {docID: formData.docID, cancel: "Yes"}
        res = await axios.put('/api/pages/gestor/InfraGestor/reservations', cancelData);
      }

      if (res.status === 200) {
        //console.log(res.data.message);

        // Update docID
        const x = formData.docID.split('/');
        const newDocId = `${x[0]}/${x[1]}/${parseInt(x[2])+1}`;

        formReset(newDocId);

        (method == 'Create') && setIsLoading(false);

        setTimeout(() => {
          (method == 'Update') && router.push('/gestor/InfraGestor/reservations/listView');
          (method == 'Cancel') && router.push('/gestor/InfraGestor/cancel-reservation');
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
        {/* Title */}
        <h2 className={styles.title}>
          {(method == "Update" || method == "Cancel") && <button className={styles.backBtn} onClick={() => visit(method)}><HiArrowLeft /></button>}
          {(method == "Update")? "Update" : (method == "Cancel")? "Cancel" : "Create"} Reservation
        </h2>

        {/* Document Section */}
        <div className={styles.docSection}>
          <div className={styles.formGroup}>
            <label>Doc ID</label>
            <input type="text" className={styles.inputField} name='docID' value={formData.docID} disabled/>
          </div>
          <div className={styles.formGroup}>
            <label>Doc Date</label>
            <input type="text" className={styles.inputField} name='docDate' value={formData.docDate} disabled/>
          </div>
        </div>
      </div>

    <div className={styles.container}>

      {/* Button Row */}
        <div className={styles.buttonGroup}>
          {(method == "Create") && <button className={styles.button} onClick={() => visit('Update')}>List View</button>}
          {(method == "Update") && <button className={styles.button} onClick={goNew}>New</button>}
          {(method != "Cancel") && <button className={styles.button} onClick={() => formReset(formData.docID)}>Clear all</button>}
          <button className={styles.button} onClick={handleSave}>{(method !== "Create")? (method === "Cancel")? "Cancel" : "Update" : "Save"}</button>
        </div>

       {/* Form Fields */}
      <div className={styles.formBody3}>

      <div className={styles.formGroup}>
          <label>Faculty</label>
          <select className={styles.inputField2} name='faculty' value={formData.faculty} onChange={handleChange} disabled={method === 'Cancel'} >
              <option value="" disabled>Select faculty</option>
              {facultys.map((faculty, index) => (
                <option key={index} value={faculty.facultyName}>{faculty.facultyName}</option>
              ))}
            </select>
        </div>

        {/* Location Name */}
        <div className={styles.formGroup}>
          <label>Location Name</label>
          <select className={styles.inputField2} name='location' value={formData.location} onChange={handleChange} disabled={(method === 'Cancel') || (formData.faculty === '')} >
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
          <input type="date" className={styles.inputField2} name='fromDate' value={formData.fromDate} onChange={handleChange} disabled={method === 'Cancel'} />
        </div>

        {/* To Date */}
        <div className={styles.formGroup}>
          <label>To Date</label>
          <input type={(formData.fromDate === '') ? "text" : "date"} placeholder='Add From Date first' className={styles.inputField2} name='toDate' value={formData.toDate} onChange={handleChange} disabled={(method === 'Cancel') || (formData.fromDate === '')} />
        </div>

        {/* From Time */}
        <div className={styles.formGroup}>
          <label>From Time</label>
          <input type={(formData.toDate === '') ? "text" : "time"} placeholder='Add To Date first' className={styles.inputField2} name='fromTime' value={formData.fromTime} onChange={handleChange} disabled={(method === 'Cancel') || (formData.toDate === '')} />
        </div>

        {/* To Time */}
        <div className={styles.formGroup}>
          <label>To Time</label>
          <input type={(formData.fromTime === '') ? "text" : "time"} placeholder='Add From Time first' className={styles.inputField2} name='toTime' value={formData.toTime} onChange={handleChange} disabled={(method === 'Cancel') || (formData.fromTime === '')} />
        </div>

        {/* Booking Type */}
        <div className={styles.formGroup}>
          <label>Booking Type</label>
          <select className={styles.inputField2} name='bookTyp' value={formData.bookTyp} onChange={handleChange} disabled={method === 'Cancel'} >
            <option value='' disabled>Select booking type</option>
            <option value='Internal use'>Internal use</option>
            <option value='External use'>External use</option>
          </select>
        </div>

        {/* Event Title */}
        <div className={styles.formGroup}>
          <label>Event Title</label>
          <input type="text" className={styles.inputField2} placeholder='Enter event title here' name='title' value={formData.title} onChange={handleChange} disabled={method === 'Cancel'} />
        </div>

        {/* Organizer */}
        <div className={styles.formGroup}>
          <label>Organizer</label>
          <input type="text" className={styles.inputField2} placeholder='Enter organizer name here' name='organizer' value={formData.organizer} onChange={handleChange} disabled={method === 'Cancel'} />
        </div>

        <div className={styles.formGroup}>
          <label>Reservation Remarks</label>
          <input type="text" className={styles.inputField2} placeholder='Enter remarks here' name='remark' value={formData.remark} onChange={handleChange} disabled={method === 'Cancel'} />
        </div>

        <div className={styles.formGroup}>
          <label>Repeat</label>
          <select className={styles.inputField2} name='repeat' value={formData.repeat} onChange={handleChange} disabled={method === 'Cancel'} >
            <option value='' disabled>Select repeat</option>
            <option value='None'>None</option>
            <option value='Daily'>Daily</option>
            <option value='Weekly'>Weekly</option>
            <option value='Monthly'>Monthly</option>
            <option value='Yearly'>Yearly</option>
          </select>
        </div>

        {/* Active Status with Radio Buttons */}
        <div className={styles.formGroupActive}>
          <label>Active?</label>
          <div className={styles.activeOptions}>
            <label>
              <input type="radio" name="active" value="Yes" checked={formData.active === 'Yes'} onChange={handleChange} disabled={method === 'Cancel'} /> Yes
            </label>
            <label>
              <input type="radio" name="active" value="No" checked={formData.active === 'No'} onChange={handleChange} disabled={method === 'Cancel'} /> No
            </label>
          </div>
        </div>

        {/* Canceled */}
        {/*(method === 'Cancel') && <div className={styles.formGroup}>
          <label>Canceled?</label>
          <div className={styles.activeOptions}>
            <label>
              <input type="radio" name="cancel" value="Yes" checked={formData.cancel === 'Yes'} onChange={handleChange} /> Yes
            </label>
            <label>
              <input type="radio" name="cancel" value="No" checked={formData.cancel === 'No'} onChange={handleChange} /> No
            </label>
          </div>
        </div>*/}
      </div>

      {/* Table */}
      <div className={styles.tableContainer}>
      <table className={styles.table}>
          <thead>
            <tr>
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
            {displayHalls.length > 0 ? (
              displayHalls.map((hall, index) => (
                <tr key={index}>
                  <td>{hall.hallNo}</td>
                  <td>{hall.hallCap}</td>
                  <td className={hall.status === "Free" ? styles.green : styles.red}>{hall.status}</td>
                  <td>{hall.title}</td>
                  <td>{hall.reservedBy}</td>
                  <td>{hall.dateTime}</td>
                  <td>{(hall.status !== '') ? (hall.status === 'Free') ?
                    /* (method === 'Cancel') ?
                      ''
                    : */
                      <input type='checkbox' onChange={(e) => handleCheckboxChange(hall.hallNo, hall.hallCap, e.target.checked)} checked={selectedHalls.some((selected) => selected.hallNo === hall.hallNo)} />
                    :
                    (method === 'Update') ?
                      <input type='checkbox' onChange={(e) => handleCheckboxChange(hall.hallNo, hall.hallCap, e.target.checked)} checked={selectedHalls.some((selected) => selected.hallNo === hall.hallNo) || hall.title !== formData.title} disabled={hall.title !== formData.title} />
                    :
                      <input type='checkbox' checked disabled /> : ''}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center' }}>...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default ReservationComp;