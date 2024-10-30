"use client"

import React, { useState } from 'react';
import styles from './reserItem.module.css';
import { toast } from 'react-toastify';
import SubLoading from '../loading/SubLoading';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { HiArrowLeft } from "react-icons/hi";

const ListFormComp = ({data, method, user, facultys}) => {

    const [isloading, setIsLoading] = useState(false);

    const router = useRouter();

    const [formData, setFormData] = useState({
        docID: data.docID,
        // docDate: data.docDate || new Date(Date.now()).toLocaleString(),
        docDate: data.docDate || new Date(Date.now()).toLocaleString(), // when update use new date time
        faculty: data.faculty || '',
        listCode: data.listCode || '',
        listDscrp: data.listDscrp || '',
        active: data.active || '',
        details: data.details || [{ valueCode: '', valueDscrp: '' }],
        modifiedBy: data.modifiedBy || 'Not modify',
        modifiedDate: data.modifiedDate || 'Not modify',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        const nameRegex = /^[.a-zA-Z0-9\s]*$/;

        if((name === 'listCode' || name === 'listDscrp') && !nameRegex.test(value)) {
            toast.warning("Location name should only contain letters,numbers and spaces.");
            return;
        }

        setFormData((prevData) => ({ ...prevData, [name]: value }));
      };

      // Handle change for the details array
        const handleDetailChange = (index, e) => {
            const { name, value } = e.target;
            const updatedDetails = [...formData.details];
            updatedDetails[index][name] = value;
            setFormData((prevData) => ({ ...prevData, details: updatedDetails }));
        };

        // Add new row in the details array
        const addRow = () => {
            const lastDetail = formData.details[formData.details.length - 1];

            // Check if the last row has empty fields
            if (!lastDetail.valueCode || !lastDetail.valueDscrp) {
                // Notify the user if needed (e.g., with a toast)
                toast.warning("Please fill in all fields before adding a new row.");
                return;
            }

            setFormData((prevData) => ({
                ...prevData,
                details: [...prevData.details, { valueCode: '', valueDscrp: '' }]
            }));
        };

        // Remove a row in the details array by index
        const removeRow = (index) => {
            if (index === 0 && formData.details.length === 1) {
                // Do nothing if it's the first row and it's the only row in the list
                return;
            }
            const updatedDetails = formData.details.filter((_, i) => i !== index);
            setFormData((prevData) => ({ ...prevData, details: updatedDetails }));
        };

      const formReset = (docID) => {
        setFormData({
          docID: docID,
          docDate: new Date(Date.now()).toLocaleString(),
          faculty: '',
          listCode: '',
          listDscrp: '',
          active: '',
          details: [{ valueCode: '', valueDscrp: '' }]
        });
      };

      const listReset = () => {
        setFormData({
            details: [{ valueCode: '', valueDscrp: '' }]
        })
      }

      const goNew = async() => {

        setIsLoading(true);

        try {
          const res = await axios.get('/api/pages/setup/createList', {params: {last: 'true'}});
          formReset(res.data);
        }
        catch (error) {
          setIsLoading(false);
            toast.error('An unexpected error occurred while getting data.');
        }

        setIsLoading(false);
        router.push('/setup/createList');
      }

      const visit = () => {
        setIsLoading(true);
        router.push('/setup/createList/listView');
      }

      const handleSave = async (e) => {
        e.preventDefault();

        // Validate form data for completeness
        const requiredFields = ['docID', 'docDate', 'listCode', 'listDscrp', 'active'];
        const hasEmptyFields = requiredFields.some((field) => !formData[field]);
        const hasEmptyDetailFields = formData.details.some((detail) => !detail.valueCode || !detail.valueDscrp);

        if (hasEmptyFields || hasEmptyDetailFields) {
            toast.warning("All fields are required, including details.");
            return;
        }

        if (method === 'Update') {
            formData.modifiedBy = user;
            formData.modifiedDate = new Date(Date.now()).toLocaleString();
        }

        try {
            setIsLoading(true);
            let res;

            if (method === 'Create') {
                res = await axios.post('/api/pages/setup/createList', formData);
            } else if (method === 'Update') {
                res = await axios.put('/api/pages/setup/createList', formData);
            }

            if (res?.status === 200) {

                if (method === 'Update'){router.push('/setup/createList/listView')}

                const x = formData.docID.split('/');
                const newDocId = `${x[0]}/${x[1]}/${parseInt(x[2]) + 1}`;

                formReset(newDocId);
                toast.success(res.data.message, { autoClose: 2000 });
            } else {
                throw new Error("Save failed");
            }
        } catch (err) {
            console.error(err);
            toast.error('An unexpected error occurred while processing.');
        } finally {
            setIsLoading(false);
        }
    };

  return (
    <>
      {isloading && <SubLoading />}
      <div className={styles.header}>

        <h2 className={styles.title}>
            {(method === "Update") && <button className={styles.backBtn} onClick={visit}><HiArrowLeft /></button>}
            {(method === "Update") ? "Update" : "Create"} List
        </h2>

        <div className={styles.docInfo}>
          <div className={styles.formGroup}>
            <label>Doc ID</label>
            <input type="text" className={styles.input} value={formData.docID} disabled/>
          </div>
          <div className={styles.formGroup}>
            <label>Doc Date</label>
            <input type="text" className={styles.input} value={formData.docDate} disabled/>
          </div>
        </div>

      </div>

      <div className={styles.container}>

        <div className={styles.buttonRow}>
          <div className={styles.buttonGroup}>
          {(method === "Create") && <button className={styles.button} onClick={visit}>List View</button>}
          {(method === "Create") &&  <button className={styles.button} onClick={() => {formReset(formData.docID)}}>New</button>}
          {(method == "Update") && <button className={styles.button} onClick={goNew}>New</button>}
          {(method === "Update") &&  <button className={styles.button} onClick={listReset}>Clear List</button>}
            <button className={styles.button} onClick={handleSave} >{(method === "Update") ? "Update" : "Save"}</button>
          </div>
        </div>

        <form className={styles.form}>
          {/* Left side inputs */}

          <div className={styles.formGroup}>
            <label>Faculty</label>
            <select className={styles.input} name='faculty' value={formData.faculty} onChange={handleChange} disabled={method === "Update"} >
            <option value="" disabled>Select Faculty</option>
            <option value="All">All</option>
              {facultys.map((faculty, index) => (
                <option key={index} value={faculty.facultyName}>{faculty.facultyName}</option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>List Code</label>
            <input type="text" className={styles.input} placeholder="Type list code here" name='listCode' value={formData.listCode} onChange={handleChange} disabled={method === "Update"}/>
          </div>

          <div className={styles.formGroup}>
            <label>List Description</label>
            <input type="text" className={styles.input} placeholder="Type list description here" name='listDscrp' value={formData.listDscrp} onChange={handleChange} disabled={method === "Update"} />
          </div>

          {/* Right side inputs */}
          {(method === "Update") && <><div className={styles.formGroup}>
            <label>Modified By</label>
            <input type="text" className={styles.input} name='modifiedBy' value={formData.modifiedBy} disabled />
          </div>

          <div className={styles.formGroup}>
            <label>Modified Date</label>
            <input type="text" className={styles.input} name='modifiedDate' value={formData.modifiedDate} disabled />
          </div></>}

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
                <th>Value Code</th>
                <th>Value Description</th>
              </tr>
            </thead>
            <tbody>
              {/* <tr>
                <td><input type="text" name='valueCode' className={styles.tableList} placeholder='Enter code' /></td>
                <td><input type="text" name='valueDscrp' className={styles.tableList} placeholder='Enter description' /></td>
                <td name="" className={styles.noTD}><button>+</button></td>
              </tr> */}
              {formData.details.map((detail, index) => (
                    <tr key={index}>
                        <td>
                            <input type="text" name="valueCode" className={styles.tableList} placeholder="Enter code" value={detail.valueCode} onChange={(e) => handleDetailChange(index, e)} />
                        </td>
                        <td>
                            <input type="text" name="valueDscrp" className={styles.tableList} placeholder="Enter description" value={detail.valueDscrp} onChange={(e) => handleDetailChange(index, e)} />
                        </td>
                        <td className={styles.noTD}>
                            <button className={styles.removeBtn} onClick={() => removeRow(index)}>-</button>
                        </td>
                    </tr>
                ))}
                <tr>
                    <td className={styles.noTD} colSpan={2}>
                        <button className={styles.addBtn} onClick={addRow}>Add</button>
                    </td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ListFormComp;
