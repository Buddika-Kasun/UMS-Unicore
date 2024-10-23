"use client"

import React, { useState } from 'react';
import styles from './createCostCenterComp.module.css';
import { useRouter } from 'next/navigation';
import SubLoading from '../loading/SubLoading';

const CreateCostCenterComp= ({data, method}) => {

  const [isloading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    docID: data.docID,
    createDate: new Date(Date.now()).toLocaleString(), // when update use new date time
    createBy: data.createdBy || '',
    faculty: data.faculty || '',
    costCenterCode: data.costCenterCode || '',
    costCenterName: data.costCenterName || '',
    active: data.active || '',
  });

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
      createDate: new Date(Date.now()).toLocaleString(), // when update use new date time
      createBy: '',
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
        <h2 className={styles.title}>Create Cost Center</h2>
      </div>

      <div className={styles.container}>

        <div className={styles.buttonRow}>
          <div className={styles.buttonGroup}>
            <button className={styles.button} onClick={formReset}>New</button>
            <button className={styles.button} onClick={handleSave}>Save</button>
          </div>
        </div>

        <form className={styles.form}>

          <div className={styles.formGroup}>
            <label>Doc ID</label>
            <input type="text" name='docID' className={styles.input} value={formData.docID} disabled />
          </div>

          <div className={styles.formGroup}>
            <label>Create By</label>
            <input type="text" name='createBy' className={styles.input} value={formData.createBy} onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label>Create Date</label>
            <input type="text" name='createDate' className={styles.input} value={formData.createDate} disabled/>
          </div>

          <div className={styles.formGroup}>
            <label>Faculty</label>
            <select className={styles.input} name='faculty' value={formData.faculty} onChange={handleChange}>
              <option>Select</option>
              <option>Faculty 1</option>
              <option>Faculty 2</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Cost Center Code</label>
            <input type="text" name='costCenterCode' className={styles.input} placeholder="Enter cost center code" value={formData.costCenterCode} onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label>Cost Center Name</label>
            <input type="text" name='costCenterName' className={styles.input} placeholder="Enter cost cenet name" value={formData.costCenterName} onChange={handleChange} />
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
