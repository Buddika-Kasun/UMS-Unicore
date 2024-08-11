import { findUserByEmail } from "@/queries/users";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {authConfig} from "./auth.config";
import bcrypt from "bcryptjs";

export const {
    handlers: {GET, POST},
    auth,
    signIn,
    signOut
} = NextAuth({
    ...authConfig,
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                if (credentials === null) return null;
                console.log("credencials = ", credentials);//
                try {
                    const user = findUserByEmail(credentials?.email);
                    console.log('user =',user);//
                    if (user) {
                        const isMatch = user?.pw === credentials?.pw;
                        //const isMatch = await bcrypt.compare(credentials?.pw, user?.pw); // DB
                        console.log(user);//
                        if (isMatch) {
                            return user;
                        }
                        else {
                            throw ("406 - Check your password!");
                        }
                    }
                    else{
                        throw ("401 - User not found");
                    }
                }
                catch(err) {
                    console.log('In auth.js = ', err);//
                    throw (err);
                }
            }
        }),
        // ...add more providers here
    ],
    secret: process.env.NEXTAUTH_SECRET, // Ensure this is set
    session: {
        // Configure session expiry
        maxAge: 24 * 60 * 60, // Session will expire in 24 hours (in seconds)
        //maxAge: 30,
        updateAge: 60 * 60, // Session will be updated every hour (in seconds)
    },
});