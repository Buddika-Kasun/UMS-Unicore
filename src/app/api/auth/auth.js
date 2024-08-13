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
                            /*return {
                                id: user.id,
                                email: user.email,
                                name: user.name,  // Add any additional properties you want to include in the session
                                role: user.role,  // Example of including a custom property
                            }*/
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
});