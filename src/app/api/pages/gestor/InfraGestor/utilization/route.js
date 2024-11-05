"use server";
import "server-only";

import { dbConnect } from "@/lib/mongo";
import { NextResponse } from "next/server";
import { Reservation } from "@/model/reservation-model";
import { Sublocation } from "@/model/subLocation-model";

export async function GET(req) {
    try {
        await dbConnect();

        const { searchParams } = new URL(req.url);
        const faculty = searchParams.get("faculty");
        const location = searchParams.get("location"); // Specific location or empty for all
        const month = searchParams.get("month");

        // Set up the query filter for active, non-canceled reservations
        const filter = { active: "Yes", cancel: "No" };
        if (faculty) filter.faculty = faculty;

        // Add month filter if provided (matches year-month format, e.g., "2024-03")
        if (month && month !== "00") {
            filter.fromDate = { $regex: `^\\d{4}-${month}` };
        }

        // Prepare location or sublocation data for pie chart
        let locationData;

        if (!location) {
            // No specific location provided; group by location
            locationData = await Reservation.aggregate([
                { $match: filter },
                {
                    $group: {
                        _id: "$location",
                        count: { $sum: 1 },
                    },
                },
            ]);
        } else {
            // Specific location provided; filter and group by sublocation
            filter.location = location;
            locationData = await Reservation.aggregate([
                { $match: filter },
                { $unwind: "$hallStatusPairs" }, // Unwind sublocations
                {
                    $group: {
                        _id: "$hallStatusPairs.hallNo", // Group by sublocation name (hallNo)
                        count: { $sum: 1 },
                    },
                },
            ]);

            // Enrich results with sublocation details
            locationData = await Promise.all(
                locationData.map(async (item) => {
                    const sublocation = await Sublocation.findOne({
                        locationName: location,
                        subLocationCode: item._id,
                    });
                    return {
                        sublocationCode: item._id,
                        sublocationName: sublocation ? sublocation.subLocationName : null,
                        count: item.count,
                    };
                })
            );
        }

        // Prepare monthly reservation data for bar chart
        const monthlyCounts = await Reservation.aggregate([
            { $match: filter },
            {
                $group: {
                    _id: { $substr: ["$fromDate", 5, 2] }, // Extracts the month from `fromDate`
                    count: { $sum: 1 },
                },
            },
            { $sort: { "_id": 1 } },
        ]);

        // Ensure all months are represented in the response
        const allMonths = Array.from({ length: 12 }, (_, i) => {
            const month = (i + 1).toString().padStart(2, '0');
            const monthData = monthlyCounts.find(item => item._id === month);
            return { month, count: monthData ? monthData.count : 0 };
        });

        // Return both location-based and monthly data
        return NextResponse.json({
            locationData,
            monthlyCounts: allMonths
        }, { status: 200 });

    } catch (err) {
        console.error("Error fetching reservation data:", err);
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}
