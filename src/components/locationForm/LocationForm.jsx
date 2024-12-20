"use client"

import { useEffect, useState } from 'react';
import styles from '@/styles/formCompsStyles.module.css';
//import styles from './locationForm.module.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { HiArrowLeft } from "react-icons/hi";
import SubLoading from '../loading/SubLoading';

const LocationForm = (
  {
    data,
    method,
    facultys,
    costCenters,
    buildings,
    locationTypes,
    floors,
  }
) => {

  const [isloading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    docID: data.docID,
    docDate: data.docDate || new Date(Date.now()).toLocaleString(),
    //docDate: new Date(Date.now()).toLocaleString(), // when update use new date time
    faculty: data.faculty || '',
    cost: data.cost || '',
    locationType: data.locationType || '',
    active: data.active || '',
    buildingNo: data.buildingNo || '',
    floorNo: data.floorNo || '',
    locName: data.locName || '',
    locCode: data.locCode || '',
  });

  //const [formData, setFormData] = useState(data.data);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const nameRegex = /^[.a-zA-Z0-9\s]*$/;

    if(name === 'locName' && !nameRegex.test(value)) {
        toast.warning("Location name should only contain letters,numbers and spaces.");
        return;
    }

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const formReset = (docID) => {
    setFormData({
      docID: docID,
      docDate: new Date(Date.now()).toLocaleString(),
      faculty: '',
      cost: '',
      locationType: '',
      active: '',
      buildingNo: '',
      floorNo: '',
      locName: '',
      locCode: '',
    });
  };

  const handleSave = async(e) => {
    e.preventDefault();

    try {
      if(Object.values(formData).some(value => value === '' || value === null || value === undefined)){
        toast.warning("All fields required");
        return;
      }
      // console.log(formData);

      setIsLoading(true);

      let res;

      if(method == 'Create') {
        res = await axios.post('/api/pages/gestor/master/location', formData);
      }

      if(method == 'Update') {
        res = await axios.put('/api/pages/gestor/master/location', formData);
      }

      if (res.status === 200) {
        //console.log(res.data.message);

        // Update docID
        const x = formData.docID.split('/');
        const newDocId = `${x[0]}/${x[1]}/${parseInt(x[2])+1}`;

        formReset(newDocId);

        setIsLoading(false);

        setTimeout(() => {
          (method == 'Update') && router.push('/gestor/master/createLocation/listView');
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

  const router = useRouter();

  const visit = () => {
    setIsLoading(true);
    router.push('/gestor/master/createLocation/listView');
  }

  const goNew = async() => {

    setIsLoading(true);

    try {
      const res = await axios.get('/api/pages/gestor/master/location', {params: {last: 'true'}});
      formReset(res.data);
    }
    catch (error) {
      setIsLoading(false);
        toast.error('An unexpected error occurred while getting data.');
    }

    setIsLoading(false);
    router.push('/gestor/master/createLocation');
  }

  useEffect(() => {
    const selectedFaculty = facultys.find(fac => fac.facultyName === formData.faculty);
    const selectedBuilding = buildings.find(bld => bld.valueDscrp === formData.buildingNo);
    const selectedFloor = floors.find(flr => flr.valueDscrp === formData.floorNo);

    if (selectedFaculty && selectedBuilding && selectedFloor) {
      const newLocCode = `${selectedFaculty.facultyCode}/${selectedBuilding.valueCode}/${selectedFloor.valueCode}`;
      setFormData(prevData => ({ ...prevData, locCode: newLocCode }));
    }
  }, [formData.faculty, formData.buildingNo, formData.floorNo]);

  return (
    <>
      {isloading && <SubLoading />}
      <div className={styles.header}>
        {/* Title */}
        <h2 className={styles.title}>
          {(method == "Update") && <button className={styles.backBtn} onClick={visit}><HiArrowLeft /></button>}
          {(method == "Update")? "Update" : "Create"} Location
        </h2>

        {/* Document Section */}
        <div className={styles.docSection}>
          <div className={styles.formGroup}>
            <label>Doc ID</label>
            <input type="text" className={styles.inputField} value={formData.docID} disabled />
          </div>

          <div className={styles.formGroup}>
            <label>Doc Date</label>
            <input type="text" className={styles.inputField} value={formData.docDate} disabled />
          </div>
        </div>
      </div>

    <div className={styles.container}>

      {/* Buttons Row */}
      <div className={styles.buttonGroup}>
        {(method == "Create") && <button className={styles.button} onClick={visit}>List View</button>}
        {(method == "Update") && <button className={styles.button} onClick={goNew}>New</button>}
        <button className={styles.button} onClick={() => formReset(formData.docID)}>Clear all</button>
        <button className={styles.button} onClick={handleSave}>{(method == "Update")? "Update" : "Save"}</button>
      </div>

      {/* Form Field */}
      <div className={styles.formBody2}>

        <div className={styles.formGroup}>
          <label>Location Code</label>
          <input type="text" className={styles.inputField2} value={formData.locCode} disabled />
        </div>

        <div className={styles.formGroup}>
          <label>Faculty</label>
          <select className={styles.inputField2} name='faculty' value={formData.faculty} onChange={handleChange} required>
            <option value="" disabled>Select Faculty</option>
            {facultys.map((faculty, index) => (
              <option key={index} value={faculty.facultyName}>{faculty.facultyName}</option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Building No</label>
          <select className={styles.inputField2} name='buildingNo' value={formData.buildingNo} onChange={handleChange}>
            <option value="" disabled>Select building</option>
            {buildings.map((building, index) => (
              <option key={index} value={building.valueDscrp}>
                {building.valueDscrp}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Floor No</label>
          <select className={styles.inputField2} name='floorNo' value={formData.floorNo} onChange={handleChange}>
            <option value="" disabled>Select floor</option>
            {floors.map((floor, index) => (
              <option key={index} value={floor.valueDscrp}>
                {floor.valueDscrp}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Location Name</label>
          <input type="text" className={styles.inputField2} placeholder="Enater location name" name='locName' value={formData.locName} onChange={handleChange} />
        </div>

        <div className={styles.formGroup}>
          <label>Cost Center</label>
          <select className={styles.inputField2} name='cost' value={formData.cost} onChange={handleChange}>
            <option value="" disabled>Select Cost Center</option>
            {costCenters.map((costCenter, index) => (
              <option key={index} value={costCenter}>{costCenter}</option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Location Type</label>
          <select className={styles.inputField2} name='locationType' value={formData.locationType} onChange={handleChange}>
            <option value="" disabled>Select location type</option>
            {locationTypes.map((locationType, index) => (
              <option key={index} value={locationType.valueDscrp}>
                {locationType.valueDscrp}
              </option>
            ))}
          </select>
        </div>

        {/* Active Status with Radio Buttons */}
        <div className={styles.formGroupActive}>
          <label>Active?</label>
          <div className={styles.activeOptions}>
            <label>
              <input type="radio" name="active" value="Yes" checked={formData.active === 'Yes'} onChange={handleChange}/> Yes
            </label>
            <label>
              <input type="radio" name="active" value="No" checked={formData.active === 'No'} onChange={handleChange}/> No
            </label>
          </div>
        </div>

      </div>
    </div>
    </>
  );
};

export default LocationForm;
