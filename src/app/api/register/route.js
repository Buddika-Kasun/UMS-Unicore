import "server-only";

import { dbConnect } from "@/lib/mongo";
import { createUser, findUserByEmail } from "@/queries/users";
import { NextResponse } from "next/server";
import { decrypt } from "@/security/encryption";
import { hash } from "@/security/hashing";
import { xssSanitize } from "@/security/purify";

export async function POST(req) {

    try {

        let {name, faculty, type, email, pw} = await req.json();

        // XSS Protection
        name = xssSanitize(name);
        faculty = xssSanitize(faculty);
        type = xssSanitize(type);
        email = xssSanitize(email);
        pw = xssSanitize(pw);

        // Validate the email using a regular expression pattern
        if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(email)) {
            return NextResponse.json({ message: 'Invalid email format.' }, { status: 409 });
        }

        await dbConnect();

        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return NextResponse.json({ message: 'User already exists with this email' }, { status: 409 });
        }

        const decryptedPw = await decrypt(pw);

        const hashedPw = await hash(decryptedPw);

        const newUser = {name, faculty, type, email, pw: hashedPw};

        await createUser(newUser);
    }
    catch(err) {
        return NextResponse.json({message: err.message}, { status: 500 });
    }

    return NextResponse.json({message: "User has been created"}, { status: 201 });
//*/
    //return NextResponse.json({newUser}, { status: 201 });
    //return NextResponse.json({message: "User has been created"}, { status: 201 });
    //return NextResponse.json({message: 'error'}, { status: 500 });
    //return NextResponse.json({ message: 'User already exists with this email' }, { status: 409 });
}
