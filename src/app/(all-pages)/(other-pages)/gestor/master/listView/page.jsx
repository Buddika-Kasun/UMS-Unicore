"use server"

import React from "react";
import ListView from "@/components/listView/ListView";
import { dbConnect } from "@/lib/mongo";
import { Location } from "@/model/location-model";

const listView = async() => {

  await dbConnect();

  const formData = await Location.find({},{_id: 0, __v:0}).lean();

  const headers = [
    "Doc ID",
    "Doc Date",
    "Faculty",
    "Cost Center",
    "Location Type",
    "Active",
    "Building No",
    "Floor No",
    "Location Name",
    "Location Code",
  ];

  return (
    <div>
      <ListView data={formData} headers={headers} path='/gestor/master?docID=' />
    </div>
  );
};

export default listView;