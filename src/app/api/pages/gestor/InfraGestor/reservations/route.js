"use server";
import "server-only";

import { dbConnect } from "@/lib/mongo";
import { xssSanitize } from "@/security/purify";
import { NextResponse } from "next/server";
import { Reservation } from "@/model/reservation-model";

const sanitize = (value) => {
    return {
        docID: xssSanitize(value.docID),
        docDate: xssSanitize(value.docDate),
        reservedBy: xssSanitize(value.reservedBy),
        faculty: xssSanitize(value.faculty),
        bookTyp: xssSanitize(value.bookTyp),
        title: xssSanitize(value.title),
        location: xssSanitize(value.location),
        fromDate: xssSanitize(value.fromDate),
        toDate: xssSanitize(value.toDate),
        fromTime: xssSanitize(value.fromTime),
        toTime: xssSanitize(value.toTime),
        organizer: xssSanitize(value.organizer),
        remark: xssSanitize(value.remark),
        repeat: xssSanitize(value.repeat),
        active: xssSanitize(value.active),
        cancel: xssSanitize(value.cancel),
        hallStatusPairs: value.hallStatusPairs,
    };
};

// CREATE
export async function POST(req) {
    try {
        const data = await req.json();
        const sanitizedData = sanitize(data);

        await dbConnect();
        await Reservation.create(sanitizedData);

        return NextResponse.json({ message: "Saved Reservation" }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}

// READ
export async function GET(req) {
    try {
        const url = new URL(req.url);

        const fetchLast = url.searchParams.get('last');

        const location = url.searchParams.get('location');
        const fromDate = url.searchParams.get('fromDate');
        const toDate = url.searchParams.get('toDate');

        await dbConnect();

        if (fetchLast) {

            const preDocID = await Reservation.findOne({}, { docID: 1, _id: 0 }).sort({ _id: -1 });

            let newDocId;

            if (preDocID) {
                const id = parseInt(preDocID.docID.split('/')[2]) + 1;
                newDocId = `${preDocID.docID.split('/')[0]}/RVC/${id}`;
            }
            else{
                const currentYear = (new Date().getFullYear()) % 100;
                newDocId = `${currentYear}/RVC/1`;
            }

            return NextResponse.json(newDocId, { status: 200 });
        }
        else if(location && fromDate && toDate) {

            const query = {
                location: location,
                fromDate: { $lte: toDate },
                toDate: { $gte: fromDate }
            };

            const records = await Reservation.find(query, {
                "hallStatusPairs.hallNo": 1,
                "hallStatusPairs.hallCap": 1,
                "hallStatusPairs.status": 1,
                title: 1,
                toDate: 1,
                toTime: 1,
                fromDate: 1,
                fromTime:1,
                reservedBy: 1,
                _id: 0, // Exclude the MongoDB ID from the response
            }).lean();

            //console.log(records);

            const reservations = records.map(record => {
                return record.hallStatusPairs.map(pair => ({
                    hallNo: pair.hallNo,
                    hallCap: pair.hallCap,
                    status: pair.status,
                    title: record.title,
                    dateTime: record.toDate + ' ' + record.toTime,
                    reservedBy: record.reservedBy,
                    toTime: record.toTime,
                    toDate: record.toDate,
                    fromTime: record.fromTime,
                    fromDate: record.fromDate,
                }));
            }).flat();

            return NextResponse.json(reservations, { status: 200 });

        }
        else {

            const records = await Reservation.find({}, { _id: 0, __v: 0 }).lean();
            const reservations = records.map(record => [
                record.docID,
                record.docDate,
                record.faculty,
                record.bookTyp,
                record.title,
                record.location,
                record.fromDate + ' ' + record.fromTime,
                record.toDate + ' ' + record.toTime,
                record.organizer,
                record.remark,
                record.repeat,
                record.reservedBy,
                record.active,
                record.cancel
            ]);

            return NextResponse.json(reservations, { status: 200 });
        }
    } catch (err) {
        console.error("error =", err);
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}

// UPDATE
export async function PUT(req) {
    try {
        const data = await req.json();
        const sanitizedData = sanitize(data);

        await dbConnect();
        const result = await Reservation.updateOne({ docID: sanitizedData.docID }, { $set: sanitizedData });

        if (result.modifiedCount === 0) {
            return NextResponse.json({ message: "No document was updated. Please check the Doc ID." }, { status: 500 });
        }

        return NextResponse.json({ message: "Updated Reservation" }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}

// DELETE
export async function DELETE(req) {
    try {
        const data = await req.json();

        await dbConnect();
        const result = await Reservation.deleteOne({ docID: data.docID });

        if (result.deletedCount === 0) {
            return NextResponse.json({ message: "No document found with the specified Doc ID." }, { status: 500 });
        }

        return NextResponse.json({ message: "Deleted Reservation" }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}
