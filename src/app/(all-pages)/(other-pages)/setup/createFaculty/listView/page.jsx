"use server"

import React from "react";
import ListView from "@/components/listView/ListView";
import { dbConnect } from "@/lib/mongo";
import { Faculty } from "@/model/faculty-model";

const listView = async() => {

  await dbConnect();

  const formData = await Faculty.find({},{_id: 0, __v:0}).lean();

  const headers = [
    "Doc ID",
    "Doc Date",
    "Faculty Code",
    "Faculty Name",
    "Active",
  ];

  return (
    <div>
        <ListView
            title={'Faculties'}
            initData={formData}
            headers={headers}
            updatePath={"/setup/createFaculty?docID="}
            reqPath={"/api/pages/setup/createFaculty"}
            backPath={'/setup/createFaculty'}
        />
    </div>
  );
};

export default listView;