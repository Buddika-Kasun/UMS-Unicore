"use client"

import { useState } from "react";
import style from "./profile.module.css";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = ({ user: initialUser, saveVerify }) => {

  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(initialUser);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const [type, setType] = useState(user.type);
  const [verifyType, setVerifyType] = useState("NIC");

  const handleUpload = async(e) => {
    e.preventDefault();

    try {
      const data = {type, verifyType, email: user.email};

      const res = await axios.post('/api/pages/profile', data);

      if (res.status === 201) {
        //console.log(res.data.message);//
        // setIsLoading(false);
        toast.success(res.data.message, {
            autoClose: 2000,
            //onClose: () => {
            //    route.push('/profile');
            //}
        });
      }
    }
    catch(err) {
      console.log(err);
    }
  }

  const optionsDate = {
    weekday: 'long',    // Full day name (e.g., Sunday)
    year: 'numeric',    // Full year (e.g., 2024)
    month: 'long',      // Full month name (e.g., May)
    day: 'numeric',     // Day of the month (e.g., 8)
  };
  const formattedDateF = new Date(user.createdDate).toLocaleDateString('en-GB', optionsDate);
  const formattedDateL = new Date(user.loginDate).toLocaleDateString('en-GB', optionsDate);

  const optionsTime = {
    hour: '2-digit',    // Two-digit hour (e.g., 08)
    minute: '2-digit',  // Two-digit minute (e.g., 30)
    hour12: true,      // Use 12-hour format
  };
  const formattedTimeF = new Date(user.createdDate).toLocaleTimeString('en-GB', optionsTime);
  const formattedTimeL = new Date(user.loginDate).toLocaleTimeString('en-GB', optionsTime);

  return (
    <div className={style.container}>
      <div className={style.title}>Profile</div>
      <div className={style.bodyContainer}>
        <div className={style.left}>
          <div className={style.dpContainer}>
            <div className={style.dp}>Profile Picture</div>
            <div className={style.nameContainer}>
              <div className={style.nameMain}>{user.firstName} {user.lastName}</div>
              <div className={style.roleMain}>{user.role}</div>
            </div>
            <div className={style.dpBtn}>Upload avatar</div>
          </div>
          <div className={style.accessContainer}>
            <div className={style.accessBox}>
              <div className={style.access}>First access on :</div>
              <div className={style.accessDate}>{formattedDateF} at {formattedTimeF}</div>
            </div>
            <div className={style.accessBox}>
              <div className={style.access}>Last access on :</div>
              <div className={style.accessDate}>{formattedDateL} at {formattedTimeL}</div>
            </div>
          </div>
        </div>
        <div className={style.right}>
          <div className={style.detailsContainer}>
            <form className={style.form1}>
              <div className={`${style.formGroup1} ${style.headerBar}`}>
                <div className={style.title1}>BASIC INFO</div>
                <div className={style.editBtn} onClick={handleEditClick}>
                  {isEditing ? "Save" : "Edit"}
                </div>
              </div>
              <div className={style.formGroup1}>
                <div className={style.formGroup3}>
                    <label htmlFor="firstName">FIRST NAME</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className={isEditing ? style.allow : ""}
                      value={user.firstName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                </div>
                <div className={style.formGroup3}>
                    <label htmlFor="lastName">LAST NAME</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className={isEditing ? style.allow : ""}
                      value={user.lastName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                </div>
              </div>
              <div className={style.formGroup2}>
                  <label htmlFor="faculty">FACULTY</label>
                  <input
                    type="text"
                    id="faculty"
                    name="faculty"
                    value={user.faculty}
                    disabled
                  />
              </div>
              <div className={style.formGroup2}>
                  <label htmlFor="email">EMAIL</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={user.email}
                    disabled
                  />
              </div>
            </form>
          </div>
          <div className={style.verificationContainer}>
            <form className={style.form2}>
              <div className={style.title1}>VERIFICATION</div>
              <div className={style.vfContainer}>
                <div className={style.vfLeft}>
                  <div className={style.formGroup4}>
                    <label htmlFor="role">Role</label>
                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="System Admin">System Admin</option>
                        <option value="Student">Student</option>
                        <option value="Staff">Staff</option>
                        <option value="Library Staff">Library Staff</option>
                        <option value="Administrators">Administrators</option>
                        <option value="Test">Test</option>
                    </select>
                  </div>
                  <div className={style.formGroup4}>
                    <label htmlFor="vrify">Verify from</label>
                    <select value={verifyType || ''} onChange={(e) => setVerifyType(e.target.value)}>
                      <option value="Student ID">Student ID</option>
                      <option value="NIC">NIC</option>
                      <option value="Driving licence">Driving licence</option>
                    </select>
                  </div>
                  <div className={style.uploadBtnContainer}>
                    <div className={style.uploadBtn} onClick={handleUpload}>Upload</div>
                  </div>
                </div>
                <div className={style.vfRight}>Add</div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;