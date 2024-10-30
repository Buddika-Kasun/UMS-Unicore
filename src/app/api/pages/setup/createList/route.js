"use server";
import "server-only";

import { dbConnect } from "@/lib/mongo";
import { xssSanitize } from "@/security/purify";
import { NextResponse } from "next/server";
import { List } from "@/model/list-model";

// Sanitize incoming data to protect against XSS attacks
const sanitize = (value) => {
    const sanitizedData = {
        docID: xssSanitize(value.docID),
        docDate: xssSanitize(value.docDate),
        faculty: xssSanitize(value.faculty),
        listCode: xssSanitize(value.listCode),
        listDscrp: xssSanitize(value.listDscrp),
        active: xssSanitize(value.active),
        details: value.details.map(detail => ({
            valueCode: xssSanitize(detail.valueCode),
            valueDscrp: xssSanitize(detail.valueDscrp),
        })),
        modifiedBy: xssSanitize(value.modifiedBy),
        modifiedDate: xssSanitize(value.modifiedDate),
    };

    return sanitizedData;
}

//  CREATE  //
export async function POST(req) {
    try {
        const data = await req.json();

        // XSS Protection
        const sanitizedData = sanitize(data);

        await dbConnect();

        await List.create(sanitizedData);
    }
    catch(err) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }

    return NextResponse.json({ message: "List saved successfully" }, { status: 200 });
}

//  READ   //
export async function GET(req) {
    try {
        const url = new URL(req.url);
        const fetchLast = url.searchParams.get('last');

        await dbConnect();

        if (fetchLast) {
            const preDocID = await List.findOne({}, { docID: 1, _id: 0 }).sort({ _id: -1 });
            const id = parseInt(preDocID.docID.split('/')[2]) + 1;
            const newdocId = `${preDocID.docID.split('/')[0]}/LIST/${id}`;

            return NextResponse.json(newdocId, { status: 200 });
        } else {
            const listItems = await List.find({}, { _id: 0, __v: 0, details:0, modifiedBy:0, modifiedDate:0 }).lean();

            return NextResponse.json(listItems, { status: 200 });
        }
    }
    catch(err) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}

//  UPDATE  //
export async function PUT(req) {
    try {
        const data = await req.json();

        // XSS Protection
        const sanitizedData = sanitize(data);

        await dbConnect();

        const result = await List.updateOne({ docID: sanitizedData.docID }, { $set: sanitizedData });

        if (result.modifiedCount === 0) {
            return NextResponse.json({ message: "No document was updated. Please check the Doc ID." }, { status: 500 });
        }
    }
    catch(err) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }

    return NextResponse.json({ message: "List updated successfully" }, { status: 200 });
}

//  DELETE  //
export async function DELETE(req) {
    try {
        const data = await req.json();

        await dbConnect();

        const result = await List.deleteOne({ docID: data.docID });

        if (result.deletedCount === 0) {
            return NextResponse.json({ message: "No document found with the specified Doc ID." }, { status: 500 });
        }
    }
    catch(err) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }

    return NextResponse.json({ message: "List deleted successfully" }, { status: 200 });
}
