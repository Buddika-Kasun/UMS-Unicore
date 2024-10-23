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
      <ListView title={'Locations'} initData={formData} headers={headers} updatePath='/gestor/master/createLocation?docID=' reqPath='/api/pages/gestor/master' backPath='/gestor/master/createLocation' />
    </div>
  );
};

export default listView;