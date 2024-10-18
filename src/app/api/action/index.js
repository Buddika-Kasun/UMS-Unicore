"use server"

import { signIn, signOut } from "../auth/auth"

// Handle user sign-out
export async function doLogOut() {
    await signOut({redirectTo: '/authPages?mode=login'});
}

// Handle user sign-in
export async function doCredentialLogIn ({email, decryptedPw}) {

    try {
        const res = await signIn('credentials', {
            email: email,
            pw: decryptedPw,
            redirect: false,
        });
        console.log("In /action/index.js res = ",res);//
        return res;
    }
    catch (err) {
        console.log("In /action/index.js err = ",err);//
        throw (err.message);
    }
};