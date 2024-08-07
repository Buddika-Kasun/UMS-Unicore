"use client"

import Link from "next/link";
import style from "./authForms.module.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
const CryptoJS = require('crypto-js');

const RegisterForm = ({isRegister}) => {

    const router = useRouter();
    const [formData, setFormData] = useState({
        fName: '',
        faculty: '',
        type: '',
        emailR: '',
        pwR: '',
        confirmPw: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        const nameRegex = /^[.a-zA-Z\s]+$/;

        if(name === 'fName' && !nameRegex.test(value)) {
            alert("Name should only contain letters and spaces.");
            return;
        }

        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const formReset = () => {
        setFormData({
            fName: '',
            faculty: '',
            type: '',
            emailR: '',
            pwR: '',
            confirmPw: '',
        });
    }

    const handleRegister = async(event) => {
        event.preventDefault();

        try{
            // const formData = new FormData(event.currentTarget);

            // const pw = formData.get('pwR');
            // const confirmPw = formData.get('confirmPw');

            // const data = {
            //     Name: formData.get('fName'),
            //     faculty: formData.get('faculty'),
            //     type: formData.get('type'),
            //     email: formData.get('emailR'),
            //     pw: hashedPw,
            // };

            const {fName, faculty, type, emailR, pwR, confirmPw} = formData;

            if (pwR !== confirmPw) {
                alert('Passwords do not match!');
                return;
            }

            const encryptedPw = CryptoJS.AES.encrypt(pwR, "tEsT123#").toString();

            const data = {name: fName, faculty, type, email: emailR, pw: encryptedPw};

            const res = await axios.post('/api/register', data);

            res.status === 201 && router.push('/authPages?mode=login');
            console.log(res.data);//

            formReset();
        }
        catch (err) {
            if (err.response && err.response.status === 409) {
                console.error(err.response.data.message);
                alert(err.response.data.message); // Alert the conflict message
            } else {
                console.error('Error registering user:', err);
                alert('An unexpected error occurred while registering the user.');
            }
        }

    }

    return (
        <div className={`${style.childContainer} ${isRegister? style.activeCreateContainer : style.deactiveCreateContainer}`}>
            <div className={style.hR}>Create an Account</div>
            <form className={style.formR} name="form" action="" onSubmit={handleRegister}>
                <div className={`${style.field} ${style.fieldR}`}>
                    <label htmlFor="fName">Name</label>
                    <input
                        type="text"
                        name="fName"
                        id="fName"
                        value={formData.fName}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                    />
                </div>
                <div className={`${style.field} ${style.fieldR}`}>
                    <label htmlFor="faculty">Faculty</label>
                    <input
                        type="text"
                        name="faculty"
                        id="faculty"
                        value={formData.faculty}
                        onChange={handleChange}
                        placeholder="Select your faculty"
                        required
                    />
                </div>
                <div className={`${style.field} ${style.fieldR}`}>
                    <label htmlFor="type">User Type</label>
                    <input
                        type="text"
                        name="type"
                        id="type"
                        value={formData.type}
                        onChange={handleChange}
                        placeholder="Select the type of user you want"
                        required
                    />
                </div>
                <div className={`${style.field} ${style.fieldR}`}>
                    <label htmlFor="emailR">Email</label>
                    <input
                        type="email"
                        name="emailR"
                        id="emailR"
                        value={formData.emailR}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        required
                    />
                </div>
                <div className={`${style.fieldPW} ${style.field}`}>
                    <div className={style.pw}>
                        <label htmlFor="pwR">Password</label>
                        <input
                            type="password"
                            name="pwR"
                            id="pwR"
                            className={style.pswd}
                            value={formData.pwR}
                            minLength={8}
                            maxLength={15}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className={style.pw}>
                        <label htmlFor="confirmPw">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPw"
                            id="confirmPw"
                            className={style.pswd}
                            value={formData.confirmPw}
                            minLength={8}
                            maxLength={15}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            required
                        />
                    </div>
                </div>
                <div className={style.btnsR}>
                    <button type="submit" className={style.submitBtn}>Create</button>
                    <span>
                        Already have an account? &nbsp;
                        <Link href={"/authPages?mode=login"} onClick={formReset} className={style.visitBtn}>Log in</Link>
                    </span>
                </div>
            </form>
            <div className={style.footer}>All Right Reserved</div>
        </div>
    )
}

export default RegisterForm;