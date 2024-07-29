import Link from "next/link";
import style from "./authForms.module.css";

function LoginForm({isLogin}) {
    return (
        <div className={`${style.childContainer} ${isLogin? style.deactiveLoginContainer : style.activeLoginContainer}`}>
            <div className={style.hL}>Welcome to UniCore</div>
            <form action="/gestor/master" className={style.formL}>
                <div className={style.field}>
                    <label htmlFor="emailL">Email</label>
                    <input type="text" id="emailL" name="email" placeholder="Enter your email" required />
                </div>
                <div className={style.field}>
                    <label htmlFor="pwL">Password</label>
                    <input type="password" id="pwL" name="pw" placeholder="Enter your password" required />
                </div>
                <div className={style.btnsL}>
                    <button type="submit" className={style.submitBtn}>Log in</button>
                    <span>
                        Don’t have an account? &nbsp;
                        <Link href={"/authPages?mode=register"} className={style.visitBtn}>Sign up</Link>
                    </span>
                </div>
            </form>
            <div className={style.footer}>All Right Reserved</div>
        </div>
    )
}

export default LoginForm;