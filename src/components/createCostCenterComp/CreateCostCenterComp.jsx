"use client"

import { useState } from 'react';
import styles from './createCostCenterComp.module.css';
import { useRouter } from 'next/navigation';
import SubLoading from '../loading/SubLoading';
import { toast } from 'react-toastify';
import axios from 'axios';
import { HiArrowLeft } from "react-icons/hi";

const CreateCostCenterComp = (
  {
    data,
    method,
    facultys,
  }
) => {

  const [isloading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    docID: data.docID,
    docDate: new Date(Date.now()).toLocaleString(), // when update use new date time
    faculty: data.faculty || '',
    costCenterCode: data.costCenterCode || '',
    costCenterName: data.costCenterName || '',
    active: data.active || '',
  });

  const visit = () => {
    setIsLoading(true);
    router.push('/setup/createCostCenter/listView');
  }

  const goNew = async() => {

    setIsLoading(true);

    try {
      const res = await axios.get('/api/pages/setup/createCostCenter', {params: {last: 'true'}});
      formReset(res.data);
    }
    catch (error) {
      setIsLoading(false);
        toast.error('An unexpected error occurred while getting data.');
    }

    setIsLoading(false);
    router.push('/setup/createCostCenter');
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    /* const nameRegex = /^[.a-zA-Z0-9\s]*$/;

    if(name === 'locName' && !nameRegex.test(value)) {
        toast.warning("Location name should only contain letters,numbers and spaces.");
        return;
    } */

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const formReset = (docID) => {
    setFormData({
      docID: docID,
      docDate: new Date(Date.now()).toLocaleString(), // when update use new date time
      faculty: '',
      costCenterCode: '',
      costCenterName: '',
      active: '',
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
        res = await axios.post('/api/pages/setup/createCostCenter', formData);
      }

      if(method == 'Update') {
        res = await axios.put('/api/pages/setup/createCostCenter', formData);
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

  return (
    <>
      {isloading && <SubLoading />}
      <div className={styles.header}>

        <h2 className={styles.title}>
          {(method == "Update") && <button className={styles.backBtn} onClick={visit}><HiArrowLeft /></button>}
          {(method == 'Update')? "Update":"Create"} Cost Center
        </h2>

        <div className={styles.docInfo}>
          <div className={styles.formGroup}>
            <label>Doc ID</label>
            <input type="text" name='docID' className={styles.input} value={formData.docID} disabled />
          </div>
          <div className={styles.formGroup}>
            <label>Doc Date</label>
            <input type="text" name='docDate' className={styles.input} value={formData.docDate} disabled/>
          </div>
        </div>

      </div>

      <div className={styles.container}>

        <div className={styles.buttonRow}>
          <div className={styles.buttonGroup}>
            {(method == "Create") && <button className={styles.button} onClick={visit}>List View</button>}
            {(method == "Update") && <button className={styles.button} onClick={goNew}>New</button>}
            <button className={styles.button} onClick={() => formReset(formData.docID)}>Clear all</button>
            <button className={styles.button} onClick={handleSave}>{(method == 'Update')? "Update":"Save"}</button>
          </div>
        </div>

        <form className={styles.form}>

          <div className={styles.formGroup}>
            <label>Cost Center Code</label>
            <input type="text" name='costCenterCode' className={styles.input} placeholder="Enter cost center code" value={formData.costCenterCode} onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label>Cost Center Name</label>
            <input type="text" name='costCenterName' className={styles.input} placeholder="Enter cost cenet name" value={formData.costCenterName} onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label>Faculty</label>
            <select className={styles.input} name='faculty' value={formData.faculty} onChange={handleChange}>
              <option value="" disabled>Select Faculty</option>
              <option key={'All'} value={'All'}>All</option>
              {facultys.map((faculty, index) => (
                <option key={index} value={faculty}>{faculty}</option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Active?</label>
            <div className={styles.inlineGroup}>
              <label className={styles.radio}>
                <input type="radio" name="active" value="Yes" checked={formData.active === 'Yes'}  onChange={handleChange} /> Yes
              </label>
              <label className={styles.radio}>
                <input type="radio" name="active" value="No" checked={formData.active === 'No'}  onChange={handleChange} /> No
              </label>
            </div>
          </div>
        </form>

      </div>
    </>
  );
};

export default CreateCostCenterComp;
