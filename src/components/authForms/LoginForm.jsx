"use client"

import Link from "next/link";
import style from "./authForms.module.css";
import { IoMdEye } from "react-icons/io";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import EyeBtn from "../eyeBtn/eyeBtn";
const CryptoJS = require('crypto-js');

function LoginForm({isLogin, setIsLoading, setError}) {

    const router = useRouter();
    //const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        emailL: '',
        pwL: '',
    });
    const [attempts, setAttempts] = useState(0);
    const maxAttempts = 3;
    const [showPassword, setShowPassword] = useState(false);
    const passwordRef = useRef(null);

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
        if (passwordRef.current) {
            passwordRef.current.focus(); // Focus on the password field
        }
    };

    const handleOnfocus = () => {
        setShowPassword(false);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const formReset = () => {
        setFormData({
            emailL: '',
            pwL: '',
        });
    }

    const handleLogin = async(event) => {
        event.preventDefault();

        if (attempts >= maxAttempts) {
            setError('You have been locked out due to too many failed attempts.');
            return;
        }

        try {
            setIsLoading(true);

            const {emailL, pwL} = formData;

            const encryptedPw = CryptoJS.AES.encrypt(pwL, "tEsT123#").toString();

            const data = {email: emailL, pw: encryptedPw};

            const res = await axios.post('/api/login', data);

            //setIsLoading(false);

            if(res.status === 203) {
                setIsLoading(false);
                setAttempts(prevAttempts => prevAttempts + 1);
                console.error('Error = ', res.data.message);//
                setError(res.data.message);
                //alert(res.data.message);
            }
            else if(res.status === 200){
                formReset();
                setAttempts(0);
                router.push('/dashboard');
            }

        }
        catch(err) {
            setIsLoading(false);
            console.error('Error login user:', err);//
            setError('An unexpected error occurred while login the user.');
        }
    }

    return (
        <div className={`${style.childContainer} ${isLogin? style.deactiveLoginContainer : style.activeLoginContainer}`}>
            <div className={style.hL}>Welcome to UniCore</div>
            <form className={style.formL}  onSubmit={handleLogin}>
                <div className={style.field}>
                    <label htmlFor="emailL">Email</label>
                    <input
                        type="email"
                        name="emailL"
                        id="emailL"
                        value={formData.emailL}
                        onChange={handleChange}
                        onFocus={handleOnfocus}
                        placeholder="Enter your email"
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        required
                    />
                </div>
                <div className={style.field}>
                    <label htmlFor="pwL">Password</label>
                    <div className={style.pwContainer}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="pwL"
                            id="pwL"
                            value={formData.pwL}
                            minLength={8}
                            maxLength={15}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            ref={passwordRef}
                            className={style.pswd}
                            required
                        />
                        <EyeBtn fun={togglePasswordVisibility} clickStat={showPassword}/>
                    </div>
                </div>
                <div className={style.btnsL}>
                    <button type="submit" className={style.submitBtn} disabled={attempts >= maxAttempts}>
                        {attempts >= maxAttempts ? "Locked Out" : "Log in"}
                    </button>
                    {/* {error && <div className={style.error}>{error}</div>} */}
                    <span>
                        Don’t have an account? &nbsp;
                        <Link onClick={formReset} href={"/authPages?mode=register"} className={style.visitBtn}>Sign up</Link>
                    </span>
                </div>
            </form>
            <div className={style.footer}>All Right Reserved</div>
        </div>
    )
}

export default LoginForm;