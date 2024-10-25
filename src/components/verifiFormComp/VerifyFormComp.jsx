"use client"

import { useState } from 'react';
import styles from './verifyFormComp.module.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { HiArrowLeft } from "react-icons/hi";
import SubLoading from '@/components/loading/SubLoading';

const LocationForm = ({reqUser}) => {

  const router = useRouter();

  const [role, setRole] = useState(reqUser.type);

  const handleChange = (e) => {
    const {value} = e.target;
    setRole(value)
  };

  const visit = () => {
    router.push('/setup/pendingUsers');
  }

  const approve = async() => {
    const data = {
      _id:reqUser._id,
      role:role,
      type:role,
      verification: {
        state: "approved",
      }
    }

    try{
      const res = await axios.put('/api/pages/profile', data);

      if (res.status === 200) {
        //console.log(res.data.message);

        //formReset(newDocId);

        //setIsLoading(false);

        toast.success(res.data.message, {
            autoClose: 2000,
        });

        setTimeout(() => {
          router.push('/setup/pendingUsers');
        }, 1000);

      }
      else {
        throw err;
      }

    }
    catch(err) {
      //console.log(err);
      //setIsLoading(false);
      toast.error('An unexpected error occurred while processing.');
    }
};


  return (
    <>
      <div className={styles.header}>
        <h2 className={styles.title}>
          <button className={styles.backBtn} onClick={visit}><HiArrowLeft /></button>
          Verify User
        </h2>
      </div>

    <div className={styles.container}>

      {/* Form Fields Section */}
      <div className={styles.form}>
          <div className={styles.formGroup}>
            <label>Request on</label>
            <input type="text" className={styles.input} value={new Date(reqUser.verification.createDate).toLocaleString()}  disabled />
          </div>

          <div className={styles.formGroup}>
            <label>Verification type</label>
            <input type="text" className={styles.input} value={reqUser.verification.type} disabled />
          </div>

          <div className={styles.formGroup}>
            <label>Faculty</label>
            <input type="text" className={styles.input} value={reqUser.faculty} disabled />
          </div>

          <div className={styles.formGroup}>
            <label>Request role</label>
              <select className={styles.input} value={role} onChange={handleChange}>
                <option value="System Admin">System Admin</option>
                <option value="Student">Student</option>
                <option value="Staff">Staff</option>
                <option value="Library Staff">Library Staff</option>
                <option value="Administrators">Administrators</option>
                <option value="Test">Test</option>
              </select>
          </div>

          <div className={styles.formGroup}>
            <label>Name</label>
            <input type="text" className={styles.input} value={reqUser.name} disabled />
          </div>

          <div className={styles.vfRight}>Add</div>

          <div className={styles.buttonGroup}>
            <button className={styles.button1}>Reject</button>
            <button className={styles.button}>Approve</button>
          </div>

      </div>
    </div>
    </>
  );
};

export default LocationForm;
