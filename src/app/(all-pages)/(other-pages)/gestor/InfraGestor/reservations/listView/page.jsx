"use server";

import React from "react";
import ListView from "@/components/listView/ListView";
import { dbConnect } from "@/lib/mongo";
import { Reservation } from "@/model/reservation-model";

const listView = async () => {
  await dbConnect();

  // Fetch data from MongoDB
  const records = await Reservation.find({}, { _id: 0, __v: 0 }).lean();

  // Map data to match the headers
  const formData = records.map((record) => [
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
    record.cancel,
  ]);

  // Headers order
  const headers = [
    "Doc ID",
    "Doc Date",
    "Faculty",
    "Book Type",
    "Title",
    "Location",
    "From",
    "To",
    "Organizer",
    "Remark",
    "Repeat",
    "Reserved By",
    "Active",
    "Cancel",
  ];

  return (
    <div>
      <ListView
        title="Reservations"
        initData={formData}
        headers={headers}
        updatePath="/gestor/InfraGestor/reservations?docID="
        reqPath="/api/pages/gestor/InfraGestor/reservations"
        backPath="/gestor/InfraGestor/reservations"
      />
    </div>
  );
};

export default listView;
