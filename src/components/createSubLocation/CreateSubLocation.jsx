"use client"

import React, { useState } from 'react';
import styles from './SubLocation.module.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import SubLoading from '../loading/SubLoading';

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
    departments: data.departments || [],
  });

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
    if (name === 'faculty') {
      const selectedFaculty = value;
      const departments = deps
        .filter(dep => (dep.faculty === selectedFaculty) || (selectedFaculty === 'All'))
        .flatMap(dep => dep.details.map(detail => ({
          valueCode: detail.valueCode,
          valueDscrp: detail.valueDscrp,
        })));

      setSelectedDepartments(departments);
    }
  };

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

    const handleSave = async(e) => {
      e.preventDefault();
  
      try {
        /* if(Object.values(formData).some(value => value === '' || value === null || value === undefined)){
          toast.warning("All fields required");
          return;
        } */
        // console.log(formData);
  
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

  return (
    <>
      {isloading && <SubLoading />}
      <div className={styles.header}>
        <h2 className={styles.title}>Create Sub Location</h2>

        <div className={styles.docInfo}>
          <div className={styles.formGroup}>
            <label>Doc ID</label>
            <input type="text" className={styles.input} value={formData.docID} disabled  />
          </div>
          <div className={styles.formGroup}>
            <label>Doc Date</label>
            <input type="text" className={styles.input} value={formData.docDate} disabled/>
          </div>
        </div>
      </div>

      <div className={styles.container}>

        {/* Button Group */}
        <div className={styles.buttonRow}>
          <div className={styles.buttonGroup}>
            <button className={styles.button}>List View</button>
            <button className={styles.button} onClick={() => formReset(formData.docID)}>New</button>
            <button className={styles.button} onClick={handleSave}>Save</button>
          </div>
        </div>

        <form className={styles.form}>
          {/* Faculty */}
          <div className={styles.formGroup}>
            <label>Faculty</label>
            <select className={styles.input} name='faculty' value={formData.faculty} onChange={handleChange} >
              <option value="" disabled>Select Faculty</option>
              <option value="All">All</option>
              {facultys.map((faculty, index) => (
                <option key={index} value={faculty.facultyName}>{faculty.facultyName}</option>
              ))}
            </select>
          </div>

          {/* Location Name */}
          <div className={styles.formGroup}>
            <label>Location Name</label>
            <select className={styles.input} name='locationName' value={formData.locationName} onChange={handleChange}>
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

          {/* Sublocation Name */}
          <div className={styles.formGroup}>
            <label>Sublocation Name</label>
            <input type="text" className={styles.input} name='subLocationName' value={formData.subLocationName} onChange={handleChange} />
          </div>

          {/* Sublocation Code */}
          <div className={styles.formGroup}>
            <label>Sublocation Code</label>
            <input type="text" className={styles.input} name='subLocationCode' value={formData.subLocationCode} onChange={handleChange} />
          </div>

          {/* Stock Location */}
          <div className={styles.formGroup}>
            <label>Stock Location</label>
            <div className={styles.inlineGroup}>
              <label className={styles.radio}>
                <input type="radio" name="stockLoc" value="Yes" checked={formData.stockLoc === 'Yes'} onChange={handleChange} /> Yes
              </label>
              <label className={styles.radio}>
                <input type="radio" name="stockLoc" value="No" checked={formData.stockLoc === 'No'} onChange={handleChange} /> No
              </label>
            </div>
          </div>

          {/* Hall Capacity */}
          {(formData.stockLoc === 'No') && <div className={styles.formGroup}>
            <label>Hall Capacity</label>
            <input type="text" className={styles.input} name='hallCap' value={formData.hallCap} onChange={handleChange} />
          </div>}

          {/* Rack No */}
          {(formData.stockLoc === 'Yes') && <><div className={styles.formGroup}>
            <label>Rack No</label>
            <input type="text" className={styles.input} name='rackNo' value={formData.rackNo} onChange={handleChange} />
          </div>

          {/* Bin No */}
          <div className={styles.formGroup}>
            <label>Bin No</label>
            <input type="text" className={styles.input} name='binNo' value={formData.binNo} onChange={handleChange} />
          </div>
          </>}

          {/* Active */}
          <div className={styles.formGroup}>
            <label>Active?</label>
            <div className={styles.inlineGroup}>
              <label className={styles.radio}>
                <input type="radio" name="active" value="Yes" checked={formData.active === 'Yes'} onChange={handleChange} /> Yes
              </label>
              <label className={styles.radio}>
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
