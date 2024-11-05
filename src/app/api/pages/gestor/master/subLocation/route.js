"use server"
import "server-only";

import { dbConnect } from "@/lib/mongo";
import { xssSanitize } from "@/security/purify";
import { NextResponse } from "next/server";
import { Sublocation } from "@/model/subLocation-model";

const sanitize = (value) => {
    const sanitizedData = {
        docID: xssSanitize(value.docID),
        docDate: xssSanitize(value.docDate),
        faculty: xssSanitize(value.faculty),
        locationName: xssSanitize(value.locationName),
        subLocationName: xssSanitize(value.subLocationName),
        subLocationCode: xssSanitize(value.subLocationCode),
        hallCap: value.hallCap,
        stockLoc: value.stockLoc,
        rackNo: xssSanitize(value.rackNo),
        binNo: xssSanitize(value.binNo),
        active: xssSanitize(value.active),
        departments: xssSanitize(value.departments),
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

        await Sublocation.create(sanitizedData);

    }
    catch(err) {
        return NextResponse.json({message: err.message}, { status: 500 });
    }

    return NextResponse.json({message: "Saved Sublocation"}, { status: 200 });
}



//  RAED    //
export async function GET(req) {

    try {

        const url = new URL(req.url);

        const fetchLast = url.searchParams.get('last');

        const location = url.searchParams.get('location'); // Fetch the 'location' query parameter

        await dbConnect();

        if (fetchLast) {
            const preDocID = await Sublocation.findOne({}, { docID: 1, _id: 0 }).sort({ _id: -1 });
            const id = parseInt(preDocID.docID.split('/')[2]) + 1;
            const newdocId = `${preDocID.docID.split('/')[0]}/SLOC/${id}`;

            return NextResponse.json(newdocId, { status: 200 });
        }
        else if(location) {
            // Define query conditions based on the presence of 'location'
            const query = { locationName: location, active: 'Yes' } ;

            // Fetch sublocations from MongoDB based on the query
            const records = await Sublocation.find(query, { _id: 0, __v: 0 }).lean();

            // Map data to match the headers if needed
            const sublocations = records.map((record) => ({
                subLocationCode: record.subLocationCode,
                hallCap: record.hallCap,
            }));

            return NextResponse.json(sublocations, { status: 200 });
        }
        else{
            //const sublocations = await Sublocation.find({},{_id: 0, __v:0}).lean();

            // Fetch data from MongoDB
            const records = await Sublocation.find({}, { _id: 0, __v: 0 }).lean();

            // Map data to match the headers
            const sublocations = records.map((record) => [
                record.docID,
                record.docDate,
                record.faculty,
                record.locationName,
                record.subLocationCode,
                record.subLocationName,
                record.stockLoc,
                record.hallCap,
                record.rackNo,
                record.binNo,
                record.departments, //? record.departments.join(", ") : "", // Join departments if it's an array
                record.active,
            ]);

            return NextResponse.json(sublocations, { status: 200 });
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

        const result = await Sublocation.updateOne({docID: sanitizedData.docID}, {$set: sanitizedData});

        if (result.modifiedCount === 0) {
            return NextResponse.json({message: "No document was updated. Please check the Doc ID."}, { status: 500 });
        }

    }
    catch(err) {
        return NextResponse.json({message: err.message}, { status: 500 });
    }

    return NextResponse.json({message: "Updated Sublocation"}, { status: 200 });
}



//  DELETE   //
export async function DELETE(req) {

    console.log("api/pages/gestor/master = Catch delete req");

    try {
        const data = await req.json();

        await dbConnect();

        const result = await Sublocation.deleteOne({docID: data.docId});

        if (result.deletedCount === 0) {
            return NextResponse.json({message: "No document found with the specified Doc ID."}, { status: 500 });
        }

    }
    catch(err) {
        console.log(err)
        return NextResponse.json({message: err.message}, { status: 500 });
    }

    return NextResponse.json({message: "Deleted Sublocation"}, { status: 200 });

}