"use client"

import React, { useEffect, useState } from 'react';
import styles from '@/styles/formCompsStyles.module.css';
//import styles from './SubLocation.module.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import SubLoading from '../loading/SubLoading';
import { HiArrowLeft } from 'react-icons/hi';
import { useRouter } from 'next/navigation';

const CreateSubLocation = (
  {
    data,
    facultys,
    locations,
    deps,
    method,
  }
) => {

  const [isloading, setIsLoading] = useState(false);
  const [selectedDepartments, setSelectedDepartments] = useState([]);

  const router = useRouter();

  const [formData, setFormData] = useState({
    docID: data.docID,
    docDate: data.docDate || new Date(Date.now()).toLocaleString(),
    faculty: data.faculty || '',
    locationName: data.locationName || '',
    subLocationName: data.subLocationName || '',
    subLocationCode: data.subLocationCode || '',
    hallCap: data.hallCap || '',
    stockLoc: data.stockLoc || '',
    rackNo: data.rackNo || '',
    binNo: data.binNo || '',
    active: data.active || '',
    departments: data.departments ? data.departments[0].split(',') : [],
  });

  //console.log(formData)

  useEffect(() => {
    // Set initial departments for update
    if (method === "Update" && data.faculty) {
      const departments = deps
        .filter(dep => dep.faculty === data.faculty)
        .flatMap(dep => dep.details.map(detail => ({
          valueCode: detail.valueCode,
          valueDscrp: detail.valueDscrp,
        })));
      setSelectedDepartments(departments);
    }
  }, [method, data.faculty, deps]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nameRegex = /^[.a-zA-Z0-9\s]*$/;

    if (
      (name === 'locationName' ||
       name === 'subLocationName' ||
       name === 'binNo' ||
       name === 'rackNo') &&
      !nameRegex.test(value)
    ) {
      toast.warning("Name fields should only contain letters, numbers, and spaces.");
      return;
    }

    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // When faculty is selected, update the departments
    /*if (name === 'faculty') {
      const selectedFaculty = value;
      const departments = deps
        .filter(dep => (dep.faculty === selectedFaculty) || (selectedFaculty === 'All'))
        .flatMap(dep => dep.details.map(detail => ({
          valueCode: detail.valueCode,
          valueDscrp: detail.valueDscrp,
        })));

      setSelectedDepartments(departments);
    }*/
  };

   // Update selectedDepartments when faculty changes
  useEffect(() => {
    const selectedFaculty = formData.faculty;
    const departments = deps
      .filter(dep => (dep.faculty === selectedFaculty) || (selectedFaculty === 'All'))
      .flatMap(dep => dep.details.map(detail => ({
        valueCode: detail.valueCode,
        valueDscrp: detail.valueDscrp,
      })));

    setSelectedDepartments(departments);
  }, [formData.faculty, deps]);

  const toggleDepartment = (department) => {
    setFormData((prevData) => {
      const updatedDepartments = prevData.departments.includes(department)
        ? prevData.departments.filter(dep => dep !== department)
        : [...prevData.departments, department];
      return { ...prevData, departments: updatedDepartments };
    });
  };

  const formReset = (docID) => {
    setFormData({
      docID: docID,
      docDate: new Date(Date.now()).toLocaleString(),
      faculty: '',
      locationName: '',
      subLocationName: '',
      subLocationCode: '',
      hallCap: '',
      stockLoc: '',
      rackNo: '',
      binNo: '',
      active: '',
      departments: [],
    });
    setSelectedDepartments([]);
  };

    const filteredLocations = formData.faculty === 'All'
    ? locations
    : locations.filter(location => location.faculty === formData.faculty);

    const visit = () => {
      setIsLoading(true);
      router.push('/gestor/master/createSubLocation/listView');
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
      router.push('/gestor/master/createSubLocation');
    }

    const handleSave = async(e) => {
      e.preventDefault();

      try {

        // General required fields validation
        const { stockLoc, hallCap, binNo, rackNo, departments, ...otherFields } = formData;
        if (Object.values(otherFields).some(value => value === '' || value === null || value === undefined)) {
          toast.warning("All fields are required.");
          return;
        }

        // Conditional validation based on stockLoc value
        if (stockLoc === "Yes" && (!binNo || !rackNo)) {
          toast.warning("Bill Number and Rack Number are required when Stock Location is Yes.");
          return;
        } else if (stockLoc === "No" && !hallCap) {
          toast.warning("Hall Capacity is required when Stock Location is No.");
          return;
        }

        // Ensure at least one department is selected
        if (departments.length === 0) {
          toast.warning("At least one department must be selected.");
          return;
        }
        // console.log(formData);

        if (stockLoc === "No") {
          formData.binNo = '';
          formData.rackNo = '';
        }
        else {
          formData.hallCap = '';
        }

        setIsLoading(true);

        let res;

        if(method == 'Create') {
          res = await axios.post('/api/pages/gestor/master/subLocation', formData);
        }

        if(method == 'Update') {
          res = await axios.put('/api/pages/gestor/master/subLocation', formData);
        }

        if (res.status === 200) {
          //console.log(res.data.message);

          // Update docID
          const x = formData.docID.split('/');
          const newDocId = `${x[0]}/${x[1]}/${parseInt(x[2])+1}`;

          formReset(newDocId);

          setIsLoading(false);

          setTimeout(() => {
            (method == 'Update') && router.push('/gestor/master/createSubLocation/listView');
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
          {(method == "Update") && <button className={styles.backBtn} onClick={visit}><HiArrowLeft /></button>}
          {(method == "Update")? "Update" : "Create"} Sub Location
        </h2>

        {/* Document Section */}
        <div className={styles.docSection}>
          <div className={styles.formGroup}>
            <label>Doc ID</label>
            <input type="text" className={styles.inputField} value={formData.docID} disabled  />
          </div>
          <div className={styles.formGroup}>
            <label>Doc Date</label>
            <input type="text" className={styles.inputField} value={formData.docDate} disabled/>
          </div>
        </div>
      </div>

      <div className={styles.container}>

        {/* Button Row */}
        <div className={styles.buttonGroup}>
          {(method == "Create") && <button className={styles.button} onClick={visit}>List View</button>}
          {(method == "Update") && <button className={styles.button} onClick={goNew}>New</button>}
          <button className={styles.button} onClick={() => formReset(formData.docID)}>Clear all</button>
          <button className={styles.button} onClick={handleSave}>{(method == "Update")? "Update" : "Save"}</button>
        </div>

        {/* Form Fields */}
        <form className={styles.formBody}>
          
          <div className={styles.formGroup}>
            <label>Faculty</label>
            <select className={styles.inputField} name='faculty' value={formData.faculty} onChange={handleChange} >
              <option value="" disabled>Select Faculty</option>
              <option value="All">All</option>
              {facultys.map((faculty, index) => (
                <option key={index} value={faculty.facultyName}>{faculty.facultyName}</option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Location Name</label>
            <select className={styles.inputField} name='locationName' value={formData.locationName} onChange={handleChange}>
              {filteredLocations.length > 0 ? (
                <>
                  <option value="" disabled>Select Location</option>
                  {filteredLocations.map((location, index) => (
                    <option key={index} value={location.locName}>
                      {location.locName}
                    </option>
                  ))}
                </>
              ) : (
                <option value="" disabled>
                  No locations available. Please select a faculty.
                </option>
              )}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Sublocation Name</label>
            <input type="text" className={styles.inputField} placeholder='Enter sublocation name' name='subLocationName' value={formData.subLocationName} onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label>Sublocation Code</label>
            <input type="text" className={styles.inputField} placeholder='Enter sublocation code' name='subLocationCode' value={formData.subLocationCode} onChange={handleChange} />
          </div>

          {/* Stock Location */}
          <div className={styles.formGroupActive}>
            <label>Stock Location</label>
            <div className={styles.activeOptions}>
              <label>
                <input type="radio" name="stockLoc" value="Yes" checked={formData.stockLoc === 'Yes'} onChange={handleChange} /> Yes
              </label>
              <label>
                <input type="radio" name="stockLoc" value="No" checked={formData.stockLoc === 'No'} onChange={handleChange} /> No
              </label>
            </div>
          </div>

          {(formData.stockLoc === 'No') && <div className={styles.formGroup}>
            <label>Hall Capacity</label>
            <input type="text" className={styles.inputField} placeholder='Enter hall capacity' name='hallCap' value={formData.hallCap} onChange={handleChange} />
          </div>}

          {(formData.stockLoc === 'Yes') && <><div className={styles.formGroup}>
            <label>Rack No</label>
            <input type="text" className={styles.inputField} placeholder='Enter rack number' name='rackNo' value={formData.rackNo} onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label>Bin No</label>
            <input type="text" className={styles.inputField} placeholder='Enter bin number' name='binNo' value={formData.binNo} onChange={handleChange} />
          </div>
          </>}

          {/* Active Status with Radio Buttons */}
          <div className={styles.formGroupActive}>
            <label>Active?</label>
            <div className={styles.activeOptions}>
              <label>
                <input type="radio" name="active" value="Yes" checked={formData.active === 'Yes'} onChange={handleChange} /> Yes
              </label>
              <label>
                <input type="radio" name="active" value="No" checked={formData.active === 'No'} onChange={handleChange} /> No
              </label>
            </div>
          </div>
        </form>

        {/* Table */}
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Department</th>
                <th>Active</th>
              </tr>
            </thead>
            <tbody>
              {selectedDepartments.length > 0 ? (
                selectedDepartments.map((department, index) => (
                  <tr key={index}>
                    <td>{department.valueDscrp}</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={formData.departments.includes(department.valueDscrp)}
                        onChange={() => toggleDepartment(department.valueDscrp)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">No departments available for the selected faculty.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CreateSubLocation;
