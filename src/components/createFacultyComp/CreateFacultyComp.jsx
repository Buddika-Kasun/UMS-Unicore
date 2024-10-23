"use client"

import React, { useState } from 'react';
import styles from './createFaculty.module.css';
import ListView from '@/components/listView/ListView';
import axios from 'axios';
import { toast } from 'react-toastify';
import SubLoading from '@/components/loading/SubLoading';
import { useRouter } from 'next/navigation';

const CreateFacultyComp = ({data,method,list}) => {
  const [isloading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    docID: data.docID,
    facultyCode: data.facultyCode || '',
    facultyName: data.facultyName || '',
    Active: data.Active || '',
  });

  const router = useRouter();

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
      facultyCode:'',
      facultyName:'',
      Active:'',
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
        res = await axios.post('/api/pages/setup/createFaculty', formData);
      }

      if(method == 'Update') {
        res = await axios.put('/api/pages/setup/createFaculty', formData);
      }

      if (res.status === 200) {
        //console.log(res.data.message);

        // Update docID
        const x = formData.docID.split('/');
        const newDocId = `${x[0]}/${x[1]}/${parseInt(x[2])+1}`;

        formReset(newDocId);

        setIsLoading(false);

        toast.success(res.data.message, {
            autoClose: 2000,
        });

        router.push('/setup/createFaculty');
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
  
  const Header = [
    "Faculty Code",
    "Faculty Name",
    "Active",
  ];
  
  return (
    <>
    {isloading && <SubLoading />}
    <div className={styles.container}>
      {/* Title */}
      <h2 className={styles.title}>Create Faculty</h2>

      {/* Buttons Row */}
      <div className={styles.buttonGroup}>
        <button className={styles.buttonNew} onClick={formReset}>New</button>
        <button className={styles.buttonSave} onClick={handleSave}>Save</button>
      </div>

      {/* Form Fields */}
      <div className={styles.formBody}>
        <div className={styles.formGroup}>
          <label>Doc ID</label>
          <input type="text" name='docID' className={styles.inputField} value={formData.docID} disabled />
        </div>

        <div className={styles.formGroup}>
          <label>Faculty Code</label>
          <input type="text" name='facultyCode' placeholder="Enter faculty code" value={formData.facultyCode} className={styles.inputField} onChange={handleChange} />
        </div>

        <div className={styles.formGroup}>
          <label>Faculty Name</label>
          <input type="text" name='facultyName' placeholder="Enter faculty name" value={formData.facultyName} className={styles.inputField} onChange={handleChange}  />
        </div>

        {/* Active Status with Radio Buttons */}
        <div className={styles.formGroupActive}>
          <label>Active?</label>
          <div className={styles.activeOptions}>
            <label>
              <input type="radio" name="Active" value="Yes" checked={formData.Active === "Yes"} onChange={handleChange}/> Yes
            </label>
            <label>
              <input type="radio" name="Active" value="No" checked={formData.Active === "No"} onChange={handleChange} /> No
            </label>
          </div>
        </div>
      </div>
      <ListView initData={list} headers={Header} updatePath={"#"} reqPath={"/api/pages/setup/createFaculty"}/>
    </div>
    </>
  );
};

export default CreateFacultyComp;
