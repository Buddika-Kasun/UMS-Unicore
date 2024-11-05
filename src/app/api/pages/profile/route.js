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

//  UPDATE  //
export async function PUT(req) {

    //console.log("api/pages/gestor/master = Catch update req");

    try {

        const data = await req.json();

        // XSS Protection
        //const sanitizedData = sanitize(data);

        await dbConnect();

        const result = await User.updateOne({_id:data._id}, {$set: data});

        if (result.modifiedCount === 0) {
            return NextResponse.json({message: "No such user."}, { status: 500 });
        }

    }
    catch(err) {
        return NextResponse.json({message: err.message}, { status: 500 });
    }

    return NextResponse.json({message: "Approved user"}, { status: 200 });
}