"use client"

import { useState } from 'react';
// import styles from './createFaculty.module.css';
import styles from '@/styles/formCompsStyles.module.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import SubLoading from '@/components/loading/SubLoading';
import { HiArrowLeft } from "react-icons/hi";
import { useRouter } from 'next/navigation';

const CreateFacultyComp = (
  {
    data,
    method,
  }
) => {

  const [isloading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    docID: data.docID,
    docDate: data.docDate || new Date(Date.now()).toLocaleString(),
    facultyCode: data.facultyCode || '',
    facultyName: data.facultyName || '',
    Active: data.Active || '',
  });

  //console.log(formData);

  const router = useRouter();

  const visit = () => {
    setIsLoading(true);
    router.push('/setup/createFaculty/listView');
  }

  const goNew = async() => {

    setIsLoading(true);

    try {
      const res = await axios.get('/api/pages/setup/createFaculty', {params: {last: 'true'}});
      formReset(res.data);
    }
    catch (error) {
      setIsLoading(false);
        toast.error('An unexpected error occurred while getting data.');
    }

    setIsLoading(false);
    router.push('/setup/createFaculty');
  }

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

      //console.log(" ");

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

        setTimeout(() => {
          (method == 'Update') && router.push('/setup/createFaculty/listView');
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
      console.log(err);
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
          {(method === "Update") ? "Update" : "Create"} Faculty
        </h2>

        {/* Document Section */}
        <div className={styles.docSection}>
          <div className={styles.formGroup}>
            <label>Doc ID</label>
            <input type="text" name='docID' className={styles.inputField} value={formData.docID} disabled />
          </div>

          <div className={styles.formGroup}>
            <label>Doc Date</label>
            <input type="text" name='docDate' className={styles.inputField} value={formData.docDate} disabled/>
          </div>
        </div>
      </div>
    <div className={styles.container}>

      {/* Buttons Row */}
      <div className={styles.buttonGroup}>
        {(method == "Create") && <button className={styles.button} onClick={visit}>List View</button>}
        {(method == "Update") && <button className={styles.button} onClick={goNew}>New</button>}
        <button className={styles.button} onClick={() => formReset(formData.docID)}>Clear all</button>
        <button className={styles.button} onClick={handleSave}>{(method === "Update") ? "Update" : "Save"}</button>
      </div>

      {/* Form Fields */}
      <div className={styles.formBody}>

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
    </div>
  </>
  );
};

export default CreateFacultyComp;
