import { findUserByEmail } from "@/queries/users";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {authConfig} from "./auth.config";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/mongo";

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
                //console.log("credencials = ", credentials);//
                try {
                    dbConnect();
                    const user = await findUserByEmail(credentials?.email);
                    //console.log('user =',user);//
                    if (user) {
                        //const isMatch = user?.pw === credentials?.pw;
                        const isMatch = await bcrypt.compare(credentials?.pw, user?.pw); // DB
                        //console.log(user);//
                        if (isMatch) {

                            user.pw = undefined;
                            //console.log(user);//
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
});