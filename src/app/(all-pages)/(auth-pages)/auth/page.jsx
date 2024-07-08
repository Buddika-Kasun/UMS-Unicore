"use client"

import Link from "next/link";
import style from "./auth.module.css";
import { useSearchParams } from "next/navigation";

const AuthPage = () => {
    const mode = useSearchParams().get("mode"); // get router query (path from "mode")
    const isLogin = mode !== "register";

    return (
        <div className={style.container}>

            <div className={`${style.overlayLeft} ${isLogin? '' : style.overlayRight}`}>
                <img src="/logo.png" alt="" />
            </div>
            
            <div className={`${style.boxRight} ${isLogin? '' : style.boxLeft}`}>
                {/* white box */}
            </div>

            <div className={style.containerBottom}>

                <div className={`${style.childContainer} ${isLogin? style.activeCreateContainer : style.deactiveCreateContainer}`}>    
                    <div className={style.h}>Create an Account</div>
                    <form action="#" className={style.form}>
                        aaaa
                        <Link href={"/auth?mode=login"}>Login</Link>
                    </form>
                    <div className={style.footer}>All Right Reserved</div>
                </div>

                <div className={`${style.childContainer} ${isLogin? style.deactiveLoginContainer : style.activeLoginContainer}`}>
                    <div className={style.h}>Log In</div>
                    <form action="#" className={style.form}>
                        aaaa
                        <Link href={"/auth?mode=register"}>Create</Link>
                    </form>
                    <div className={style.footer}>All Right Reserved</div>
                </div>

            </div>

        </div>
    );
};
  
export default AuthPage;
