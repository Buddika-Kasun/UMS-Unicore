import { dbConnect } from "@/lib/mongo";
import { User } from "@/model/user-model";
import { NextResponse } from "next/server";
import "server-only";

export async function POST(req) {
    try{

        const {email, type, verifyType, createdDate} = await req.json();

        //console.log(email, type, verifyType);

        await dbConnect();

        await User.updateOne(
            {email: email},
            {$set: {
                verification: {
                    state: "request",
                    type: verifyType,
                    image: "none",
                    createDate: createdDate,
                },
                type: type,
            }}
        );

    }
    catch(err){
        return NextResponse.json({message: err.message}, { status: 500 });
    }

    return NextResponse.json({message: "Details uploaded"}, { status: 201 });
}