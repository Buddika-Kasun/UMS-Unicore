"use client"

import { useEffect, useState } from "react";
import style from "./profile.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import { MdEdit } from "react-icons/md";

const Profile = ({ user: initialUser, }) => {

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

    handleUploadVF();

    try {
      const data = {type, verifyType, email: user.email, createdDate: Date.now()};

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

  const [formattedDateF, setFormattedDateF] = useState("");
  const [formattedDateL, setFormattedDateL] = useState("");
  const [formattedTimeF, setFormattedTimeF] = useState("");
  const [formattedTimeL, setFormattedTimeL] = useState("");

  useEffect(() => {
    const optionsDate = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const optionsTime = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };

    setFormattedDateF(new Date(user.createdDate).toLocaleDateString('en-GB', optionsDate));
    setFormattedDateL(new Date(user.loginDate).toLocaleDateString('en-GB', optionsDate));
    setFormattedTimeF(new Date(user.createdDate).toLocaleTimeString('en-GB', optionsTime));
    setFormattedTimeL(new Date(user.loginDate).toLocaleTimeString('en-GB', optionsTime));
  }, []);

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(user.dp || null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));  // Create a preview URL for the selected image
    }
  };

  const handleUploadDP = async () => {
    if (!selectedFile) {
      toast.warning("Please select a photo");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", selectedFile);  // Match the key used in backend
    formData.append("userEmail", user.email); // Include user email to identify in backend

    try {
      const response = await axios.post("/api/pages/profile/dp", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });//console.log(response.data.url)

      if (response.data && response.data.url) {
        setUser((prevUser) => ({ ...prevUser, profilePicUrl: response.data.url }));
        toast.success("Profile picture uploaded successfully!", { autoClose: 2000 });
      }
    } catch (error) {
      //console.error("Error uploading avatar:", error);
      toast.error("Failed to upload avatar. Please try again.", { autoClose: 2000 });
    }
  };

  const [selectedFileVF, setSelectedFileVF] = useState(null);
  const [previewVF, setPreviewVF] = useState(user.vf || null);

  const handleFileChangeVF = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFileVF(file);
      setPreviewVF(URL.createObjectURL(file));  // Create a preview URL for the selected image
    }
  };

  const handleUploadVF = async () => {
    if (!selectedFileVF) {
      toast.warning("Please select a photo");
      return;
    }

    const formData = new FormData();
    formData.append("vrfyImg", selectedFileVF);  // Match the key used in backend
    formData.append("userEmail", user.email); // Include user email to identify in backend

    try {
      const response = await axios.put("/api/pages/profile/dp", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });//console.log(response.data.url)

      if (response.data && response.data.url) {
        setUser((prevUser) => ({ ...prevUser, profilePicUrl: response.data.url }));  //
        //toast.success("Profile picture uploaded successfully!", { autoClose: 2000 });
      }
    } catch (error) {
      //console.error("Error uploading avatar:", error);
      toast.error("Failed to upload verify photo. Please try again.", { autoClose: 2000 });
    }
  };

  return (
    <div className={style.container}>
      <div className={style.title}>Profile</div>
      <div className={style.bodyContainer}>
        <div className={style.left}>
          <div className={style.dpContainer}>
            <div className={style.con}>
            <label className={style.dp}>
              {!preview && "Profile Picture"}
              {!preview && <input type="file" accept="image/*" onChange={handleFileChange} className={style.hide}/>}
              {preview && <img src={preview} alt="Profile Preview" className={style.previewImage} />}
            </label>
            <div className={style.edit}><MdEdit/></div>
            </div>
            <div className={style.nameContainer}>
              <div className={style.nameMain}>{user.firstName} {user.lastName}</div>
              <div className={style.roleMain}>{user.role}</div>
            </div>
            <button className={style.dpBtn} onClick={handleUploadDP}>
              Upload avatar
            </button>
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
                <label className={style.vfRight}>
                  {!previewVF && 'Add image'}
                  {!previewVF && <input type="file" accept="image/*" onChange={handleFileChangeVF} className={style.hide}/>}
                  {previewVF && <img src={previewVF} alt="Preview Image" className={style.previewImageVF} />}
                </label>
                {/* <div className={style.vfRight}>Add</div> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;