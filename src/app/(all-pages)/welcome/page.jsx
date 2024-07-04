import Link from "next/link";
import style from "./welcome.module.css";

const WelcomePage = () => {
    return (
        <div className={style.container}>
            <div className={style.imageContainer}>
                <img src="/logo.png" alt="" />
                <div className={style.textContainer}>
                    <div className={style.h1}>
                        <span>Welcome</span>&nbsp;
                        <span className={style.child2}>to</span>&nbsp;
                        <span>UniCore</span>
                    </div>
                    <div className={style.h2}>University Management System</div>
                </div>
            </div>
            <div className={style.buttonField}>
                <Link href={'/login'} className={style.button}>Log in</Link>
                <Link href={'/register'} className={style.button}>Register</Link>
            </div>
        </div>
    )
}

export default WelcomePage;