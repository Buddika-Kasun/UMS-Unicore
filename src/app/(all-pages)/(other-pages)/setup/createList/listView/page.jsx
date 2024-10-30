"use server"

import React from "react";
import ListView from "@/components/listView/ListView";
import { dbConnect } from "@/lib/mongo";
import { List } from "@/model/list-model";

const listView = async() => {

  await dbConnect();

  const formData = await List.find({},{_id: 0, __v:0, details:0, modifiedBy:0, modifiedDate:0}).lean();

  const headers = [
    "Doc ID",
    "Doc Date",
    "Faculty",
    "List Code",
    "List Description",
    "Active",
  ];

  return (
    <div>
      <ListView
        title={'Lists'}
        initData={formData}
        headers={headers}
        updatePath='/setup/createList?docID='
        reqPath='/api/pages/setup/createList'
        backPath='/setup/createList' 
    />
    </div>
  );
};

export default listView;