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



//  CREATE  //
export async function POST(req) {

    //console.log("api/pages/gestor/master = Catch insert req");

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



//  RAED    //
export async function GET(req) {

    try {

        const url = new URL(req.url);
        const fetchLast = url.searchParams.get('last');

        await dbConnect();

        if (fetchLast) {
            const preDocID = await Location.findOne({}, { docID: 1, _id: 0 }).sort({ _id: -1 });
            const id = parseInt(preDocID.docID.split('/')[2]) + 1;
            const newdocId = `${preDocID.docID.split('/')[0]}/LOC/${id}`;

            return NextResponse.json(newdocId, { status: 200 });
        }
        else{
            const locations = await Location.find({},{_id: 0, __v:0}).lean();

            return NextResponse.json(locations, { status: 200 });
        }

    }
    catch(err) {
        console.log("error = ",err)
        return NextResponse.json({message: err.message}, { status: 500 });
    }

}


//  UPDATE  //
export async function PUT(req) {

    //console.log("api/pages/gestor/master = Catch update req");

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



//  DELETE   //
export async function DELETE(req) {

    console.log("api/pages/gestor/master = Catch delete req");

    try {
        const data = await req.json();

        await dbConnect();

        const result = await Location.deleteOne({docID: data.docId});

        if (result.deletedCount === 0) {
            return NextResponse.json({message: "No document found with the specified Doc ID."}, { status: 500 });
        }

    }
    catch(err) {
        console.log(err)
        return NextResponse.json({message: err.message}, { status: 500 });
    }

    return NextResponse.json({message: "Deleted Location"}, { status: 200 });

}