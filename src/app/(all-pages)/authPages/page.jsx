"use client"

import Link from "next/link";
import style from "./authPages.module.css";
import { useSearchParams } from "next/navigation";
import RegisterForm from "@/components/authForms/registerForm";
import LoginForm from "@/components/authForms/loginForm";
import LoadingComp from "../loadingPage/page";
import { useEffect, useReducer, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import handleMiddlewareMsg from "@/util/handleMiddlewareMsg";

const AuthPage = () => {

    const searchParams = useSearchParams();

    const path = searchParams.get("mode"); // get router query (path from "mode")
    const mode = path !== "register";

    const message = searchParams.get("message");
    const messageDisplayedRef = useReducer(false);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!messageDisplayedRef.current && message) {
            handleMiddlewareMsg(message);
            messageDisplayedRef.current = true; // Mark the message as displayed
        }
    }, [message]);

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