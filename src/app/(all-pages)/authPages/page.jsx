"use client"

import Link from "next/link";
import style from "./authPages.module.css";
import { useSearchParams } from "next/navigation";
import RegisterForm from "@/components/authForms/registerForm";
import LoginForm from "@/components/authForms/loginForm";

const AuthPage = () => {
    const path = useSearchParams().get("mode"); // get router query (path from "mode")
    const mode = path !== "register";

    return (
        <div className={style.container}>

            <div className={`${style.overlayLeft} ${mode? '' : style.overlayRight}`}>
                <img src="/logo.png" alt="" />
            </div>

            <div className={`${style.boxRight} ${mode? '' : style.boxLeft}`}>
                {/* white box */}
            </div>

            <div className={style.containerBottom}>

                <RegisterForm isRegister={mode} />

                <LoginForm isLogin={mode} />

            </div>

        </div>
    );
};

export default AuthPage;