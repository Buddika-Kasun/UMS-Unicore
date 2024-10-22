"use server"
import "server-only";

import { dbConnect } from "@/lib/mongo";
import { Location } from "@/model/location-model";
import { xssSanitize } from "@/security/purify";
import { NextResponse } from "next/server";

const sanitize = (value) => {
    const sanitizedData = {
        docID: xssSanitize(value.docID),
        docDate: xssSanitize(value.docDate),
        faculty: xssSanitize(value.faculty),
        cost: xssSanitize(value.cost),
        locationType: xssSanitize(value.locationType),
        active: xssSanitize(value.active),
        buildingNo: value.buildingNo,
        floorNo: value.floorNo,
        locName: xssSanitize(value.locName),
        locCode: xssSanitize(value.locCode),
    };

        // Validate the email using a regular expression pattern
        //if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(email)) {
        //    return NextResponse.json({ message: 'Invalid email format.' }, { status: 409 });
        //}

    return sanitizedData;
}

export async function POST(req) {

    //console.log("api/pages/gestor/master = Catch req");

    try {

        const data = await req.json();

        // XSS Protection
        const sanitizedData = sanitize(data);

        await dbConnect();

        await Location.create(sanitizedData);

    }
    catch(err) {
        return NextResponse.json({message: err.message}, { status: 500 });
    }

    return NextResponse.json({message: "Saved Location"}, { status: 200 });
}

export async function PUT(req) {

    //console.log("api/pages/gestor/master = Catch req");

    try {

        const data = await req.json();

        // XSS Protection
        const sanitizedData = sanitize(data);

        await dbConnect();

        const result = await Location.updateOne({docID: sanitizedData.docID}, {$set: sanitizedData});

        if (result.modifiedCount === 0) {
            return NextResponse.json({message: "No document was updated. Please check the Doc ID."}, { status: 500 });
        }

    }
    catch(err) {
        return NextResponse.json({message: err.message}, { status: 500 });
    }

    return NextResponse.json({message: "Updated Location"}, { status: 200 });
}