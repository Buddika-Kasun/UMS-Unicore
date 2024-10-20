"use server"
import "server-only";

import { NextResponse } from "next/server";
import { decrypt } from "@/security/encryption";
import { doCredentialLogIn } from "../action";
import { xssSanitize } from "@/security/purify";
import { User } from "@/model/user-model";


const getErrMessage = (err) => {
    if(err.includes('406')){
        return "Check your password!";
    }
    else if(err.includes('401')){
        return "User not found!";
    }
    else {
        return "Login Error!";
    }
};

export async function POST(req) {
    let { email, pw, date} = await req.json();

    // XSS Protection
    email = xssSanitize(email);
    pw = xssSanitize(pw);

    // Validate the email using a regular expression pattern
    if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(email)) {
        return NextResponse.json({ message: 'Invalid email format.' }, { status: 409 });
    }

    const decryptedPw = await decrypt(pw);
    console.log("DECRYPTED PW =", decryptedPw);//

    try {
        const res = await doCredentialLogIn({email, decryptedPw});
        console.log("In /login/route = ", res);//

        await User.updateOne({email: email}, {$set: {loginDate: date}});

        return NextResponse.json({message: "Loging successful."}, { status: 200 });
    }
    catch(err) {
        const message = getErrMessage(err);
        console.error("In /login/route err = ", message);//

        return NextResponse.json({message: message}, { status: 203 });
    }

}
