import Link from "next/link";
import style from "./authForms.module.css";

function RegisterForm({isRegister}) {
    return (
        <div className={`${style.childContainer} ${isRegister? style.activeCreateContainer : style.deactiveCreateContainer}`}>
            <div className={style.hR}>Create an Account</div>
            <form action="#" className={style.formR}>
                <div className={`${style.field} ${style.fieldR}`}>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="nameS" name="name" placeholder="Enter your name" required />
                </div>
                <div className={`${style.field} ${style.fieldR}`}>
                    <label htmlFor="facluty">Faculty</label>
                    <input type="text" id="faculty" name="faculty" placeholder="Select your faculty" required />
                </div>
                <div className={`${style.field} ${style.fieldR}`}>
                    <label htmlFor="type">User Type</label>
                    <input type="text" id="type" name="type" placeholder="Select the type of user you want" required />
                </div>
                <div className={`${style.field} ${style.fieldR}`}>
                    <label htmlFor="emailR">Email</label>
                    <input type="email" id="emailR" name="emailR" placeholder="Enter your email" required />
                </div>
                <div className={`${style.fieldPW} ${style.field}`}>
                    <div className={style.pw}>
                        <label htmlFor="pwR">Password</label>
                        <input type="password" id="pwR" name="pwR" placeholder="Enter your password" required />
                    </div>
                    <div className={style.pw}>
                        <label htmlFor="confirmPw">Confirm Password</label>
                        <input type="password" id="confirmPw" name="ConfirmPw" placeholder="Confirm your password" required />
                    </div>
                </div>
                <div className={style.btnsR}>
                    <button type="submit" className={style.submitBtn}>Create</button>
                    <span>
                        Already have an account? &nbsp;
                        <Link href={"/authPages?mode=login"} className={style.visitBtn}>Log in</Link>
                    </span>
                </div>
            </form>
            <div className={style.footer}>All Right Reserved</div>
        </div>
    )
}

export default RegisterForm;