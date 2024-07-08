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
                    <div className={style.h}>Welcome to UniCore</div>
                    <form action="#" className={style.form}>
                        <div className={style.field}>
                            <label>User Name</label>
                            <input type="text" name="uName" placeholder="Enter your user name" required />   
                        </div>
                        <div className={style.field}>
                            <label>Password</label>
                            <input type="password" name="pw" placeholder="Enter your password" required /> 
                        </div>
                        <div className={style.btns}>
                            <button type="submit" className={style.loginBtn}>Log in</button>
                            <span>
                                Don’t have an account? &nbsp;
                                <Link href={"/auth?mode=register"} className={style.registerBtn}>Sign up</Link>
                            </span>
                        </div>
                    </form>
                    <div className={style.footer}>All Right Reserved</div>
                </div>

            </div>

        </div>
    );
};
  
export default AuthPage;
