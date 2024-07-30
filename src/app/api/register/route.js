"use server"

import { dbConnect } from "@/lib/mongo";
import { createUser } from "@/queries/users";
import { NextResponse } from "next/server";
import { decrypt } from "@/app/middleware/encryption";
import { hash } from "@/app/middleware/hashing";

export async function POST(req) {

    const {name, faculty, type, email, encryptedPw} = await req.json();

    const decryptedPw = await decrypt(encryptedPw, 'bikz');

    const hashedPw = await hash(decryptedPw, 8);
/*
    const newUser = {name, faculty, type, email, pw: hashedPw};

    await dbConnect();

    try {
        await createUser(newUser);
    }
    catch(err) {
        return NextResponse.json({message: err.message}, { status: 500 });
    }

    return NextResponse.json({message: "User has been created"}, { status: 201 });
*/
    return NextResponse.json({encryptedPw, decryptedPw, hashedPw}, { status: 201 });
}
