"use client"

import Link from "next/link";
import style from "./auth.module.css";
import { useSearchParams } from "next/navigation";

const AuthPage = () => {
    const mode = useSearchParams().get("mode"); // get router query (path from "mode")
    const isLogin = mode !== "register";

    return (
        <div className={style.container}>

            <div className={style.overlay}>
                <img src="/logo.png" alt="" />
            </div>
            
            <div className={style.login}>
                <div className={style.h}>Log In</div>
                <form action="#" className={style.form}>
                    aaaa
                    <Link href={"/auth?mode=register"}>Create</Link>
                </form>
            </div>

            <div className={style.create}>
                <div className={style.h}>Create an Account</div>
                <form action="#" className={style.form}>
                    aaaa
                    <Link href={"/auth?mode=login"}>Login</Link>
                </form>
            </div>

        </div>
    );
};
  
export default AuthPage;
