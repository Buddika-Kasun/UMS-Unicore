"use server";
import "server-only";

import { dbConnect } from "@/lib/mongo";
import { NextResponse } from "next/server";
import { Reservation } from "@/model/reservation-model";

export async function GET(req) {
    try {

        await dbConnect();

        const records = await Reservation.find({active: 'Yes', cancel: 'No'}, {
            docID: 1,
            docDate: 1,
            title: 1,
            bookTyp: 1,
            toDate: 1,
            toTime: 1,
            fromDate: 1,
            fromTime:1,
            reservedBy: 1,
            repeat: 1,
            remark: 1,
            faculty: 1,
            location: 1,
            _id: 0,
        }).lean();

        //console.log(records);

        return NextResponse.json(records, { status: 200 });

    }
    catch (err) {
        console.error("error =", err);
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}
