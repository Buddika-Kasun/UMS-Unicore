"use client"

import Link from "next/link";
import style from "./auth2.module.css";
import { useSearchParams } from "next/navigation";

const AuthPage = () => {
    const mode = useSearchParams().get("mode"); // get router query (path from "mode")
    const isLogin = mode !== "register";

    return (
        <div className={style.container}>

            <div className={`${style.overlayLeft} ${isLogin? '' : style.overlayRight}`}>
                <img src="/logo.png" alt="" />
            </div>
            
            {/* test 1 */}
            {/* <div className={`${style.login} ${isLogin? '' : style.create}`}>
                {isLogin? (
                    <>
                        <div className={style.h}>Log In</div>
                        <form action="#" className={style.form}>
                            aaaa
                            <Link href={"/auth2?mode=register"}>Create</Link>
                        </form>
                    </>
                ):(
                    <>
                        <div className={style.h}>Create an Account</div>
                        <form action="#" className={style.form}>
                            aaaa
                            <Link href={"/auth2?mode=login"}>Login</Link>
                        </form>
                    </>
                )}
                <div className={style.footer}>All Right Reserved</div>
            </div> */}

            
            
        </div>
    );
};
  
export default AuthPage;
