import Link from "next/link";
import style from "./login.module.css"

const LoginPage = () => {
    return (
        <div className={style.container}>
            <div className={style.header}>
                <img src="/logo.png" alt="" />
                <div>Log In</div>
            </div>
            <div className={style.body}>
                <div className={style.register}>
                    Don't have an account?&nbsp;
                    <Link href={'/register'}>Register</Link>
                </div>
                <div className={style.providers}>
                    <div className={style.google}>g</div>
                    <div className={style.github}>h</div>
                    <div className={style.facebook}>f</div>
                </div>
                <div>OR</div>
                <div className={style.credentials}>
                    <form action="">
                        <input type="text" name="uName" />
                        <input type="password" name="pw"/>
                        <button></button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;