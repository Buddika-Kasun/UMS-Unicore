"use server"
import "server-only";

import { dbConnect } from "@/lib/mongo";
import { Location } from "@/model/location-model";
import { xssSanitize } from "@/security/purify";
import { NextResponse } from "next/server";

export async function POST(req) {

    console.log("api/pages/gestor/master = Catch req");

    try {

        const data = await req.json();

        // XSS Protection
        const sanitizedData = {
            docID: xssSanitize(data.docID),
            docDate: xssSanitize(data.docDate),
            faculty: xssSanitize(data.faculty),
            cost: xssSanitize(data.cost),
            locationType: xssSanitize(data.locationType),
            active: xssSanitize(data.active),
            buildingNo: data.buildingNo,
            floorNo: data.floorNo,
            locName: xssSanitize(data.locName),
            locCode: xssSanitize(data.locCode),
        }
        console.log(sanitizedData);

        // Validate the email using a regular expression pattern
        //if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(email)) {
        //    return NextResponse.json({ message: 'Invalid email format.' }, { status: 409 });
        //}

        await dbConnect();

        await Location.create(sanitizedData);

    }
    catch(err) {
        return NextResponse.json({message: err.message}, { status: 500 });
    }

    return NextResponse.json({message: "Saved Location"}, { status: 200 });
}