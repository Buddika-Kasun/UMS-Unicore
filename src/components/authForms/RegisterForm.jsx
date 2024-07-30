import Link from "next/link";
import style from "./authForms.module.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { encrypt } from "@/app/middleware/encryption";

const RegisterForm = ({isRegister}) => {

    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        faculty: '',
        type: '',
        email: '',
        pw: '',
        confirmPw: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const formReset = () => {
        setFormData({
            name: '',
            faculty: '',
            type: '',
            email: '',
            pw: '',
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
            //     name: formData.get('name'),
            //     faculty: formData.get('faculty'),
            //     type: formData.get('type'),
            //     email: formData.get('emailR'),
            //     pw: hashedPw,
            // };

            const {name, faculty, type, email, pw, confirmPw} = formData;

            if (pw !== confirmPw) {
                alert('Passwords do not match!');
                return;
            }

            const encryptedPw = encrypt(pw, 'bikz');

            const data = {name, faculty, type, email, encryptedPw};

            console.log(data);

            const res = await axios.post('/api/register', data);

            res.status === 201 && router.push('/authPages?mode=login');
            console.log(res.data);

            formReset();
        }
        catch (err) {
            console.error(err);
        }

    }

    return (
        <div className={`${style.childContainer} ${isRegister? style.activeCreateContainer : style.deactiveCreateContainer}`}>
            <div className={style.hR}>Create an Account</div>
            <form className={style.formR} name="form" action="" onSubmit={handleRegister}>
                <div className={`${style.field} ${style.fieldR}`}>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="nameS"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                    />
                </div>
                <div className={`${style.field} ${style.fieldR}`}>
                    <label htmlFor="facluty">Faculty</label>
                    <input
                        type="text"
                        id="faculty"
                        name="faculty"
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
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        placeholder="Select the type of user you want"
                        required
                    />
                </div>
                <div className={`${style.field} ${style.fieldR}`}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className={`${style.fieldPW} ${style.field}`}>
                    <div className={style.pw}>
                        <label htmlFor="pw">Password</label>
                        <input
                            type="password"
                            id="pw"
                            name="pw"
                            value={formData.pw}
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
                            id="confirmPw"
                            name="confirmPw"
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