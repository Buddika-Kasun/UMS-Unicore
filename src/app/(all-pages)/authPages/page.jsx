"use client"

import Link from "next/link";
import style from "./authPages.module.css";
import { useSearchParams } from "next/navigation";
import RegisterForm from "@/components/authForms/registerForm";
import LoginForm from "@/components/authForms/loginForm";
import LoadingComp from "../loadingPage/page";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const AuthPage = () => {
    const path = useSearchParams().get("mode"); // get router query (path from "mode")
    const mode = path !== "register";

    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className={style.container}>

            {isLoading &&
                <div className={`${style.loadingContainer} ${mode? style.loadingRight : style.loadingLeft}`}>
                    <LoadingComp size={0.15}/>
                </div>
            }

            <div className={`${style.overlayLeft} ${mode? '' : style.overlayRight}`}>
                <img src="/logo.png" alt="" />
            </div>

            <div className={`${style.boxRight} ${mode? '' : style.boxLeft}`}>
                {/* white box */}
            </div>

            <div className={style.containerBottom}>

                <RegisterForm isRegister={mode} setIsLoading={setIsLoading} />

                <LoginForm isLogin={mode} setIsLoading={setIsLoading} />

            </div>

        </div>
    );
};

export default AuthPage;