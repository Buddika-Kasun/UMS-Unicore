"use server";

import React from "react";
import ListView from "@/components/listView/ListView";
import { dbConnect } from "@/lib/mongo";
import { Sublocation } from "@/model/subLocation-model";

const listView = async () => {
  await dbConnect();

  // Fetch data from MongoDB
  const records = await Sublocation.find({}, { _id: 0, __v: 0 }).lean();

  // Map data to match the headers
  const formData = records.map((record) => [
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
    record.departments ? record.departments.join(", ") : "", // Join departments if it's an array
    record.active,
  ]);

  // Headers order
  const headers = [
    "Doc ID",
    "Doc Date",
    "Faculty",
    "Location Name",
    "Sublocation Code",
    "Sublocation Name",
    "Stock Location",
    "Hall Capacity",
    "Rack No",
    "Bin No",
    "Departments",
    "Active",
  ];

  return (
    <div>
      <ListView
        title="Sub Locations"
        initData={formData}
        headers={headers}
        updatePath="/gestor/master/createSubLocation?docID="
        reqPath="/api/pages/gestor/master/subLocation"
        backPath="/gestor/master/createSubLocation"
      />
    </div>
  );
};

export default listView;
