"use server"
import "server-only";

import { dbConnect } from "@/lib/mongo";
import { User } from "@/model/user-model";
import { NextResponse } from "next/server";

export async function GET(req) {
    try{

        await dbConnect();

        const users = await User.find({},{_id: 1, name: 1, role:1});

        return NextResponse.json(users, { status: 200 });

    }
    catch(err){
        return NextResponse.json({message: err.message}, { status: 500 });
    }
}

export async function DELETE(req) {
    try{

        const {id} = await req.json();

        //console.log("hit  ", id);

        await dbConnect();

        await User.deleteOne({_id: id});

    }
    catch(err){
        return NextResponse.json({message: err.message}, { status: 500 });
    }

    return NextResponse.json({message: "Deleted user"}, { status: 201 });
}