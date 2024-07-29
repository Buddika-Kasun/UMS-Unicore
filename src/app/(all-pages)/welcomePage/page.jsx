"use client"

import Link from "next/link";
import style from "./welcomePage.module.css";
import Footer from "@/components/footer/Footer";

const WelcomePage = () => {
    return (
        <>
            <div className={style.container}>

                <div className={style.imageContainer}>
                    <img src="/logo.png" alt="" />
                </div>

                <div className={style.textContainer}>
                    <div className={style.h1}>
                        <span>Welcome</span>
                        <span>&nbsp;to&nbsp;</span>
                        <span>UniCore</span>
                    </div>
                    <div className={style.h2}>University Management System</div>
                </div>

                <div className={style.buttonField}>
                    <Link href={"/authPages?mode=login"} className={style.button}>Log in</Link>
                    <Link href={"/authPages?mode=register"} className={style.button}>Register</Link>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default WelcomePage;