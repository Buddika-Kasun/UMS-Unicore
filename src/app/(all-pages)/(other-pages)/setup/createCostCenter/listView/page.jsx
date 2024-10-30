"use server"

import React from "react";
import ListView from "@/components/listView/ListView";
import { dbConnect } from "@/lib/mongo";
import { CostCenter } from "@/model/costCenter-model";

const listView = async() => {

  await dbConnect();

  const formData = await CostCenter.find({},{_id: 0, __v:0}).lean();

  const headers = [
    "Doc ID",
    "Doc Date",
    "Faculty",
    "CC Code",
    "CC Name",
    "Active",
  ];

  return (
    <div>
        <ListView
            title={'Cost Centers'}
            initData={formData}
            headers={headers}
            updatePath={"/setup/createCostCenter?docID="}
            reqPath={"/api/pages/setup/createCostCenter"}
            backPath={'/setup/createCostCenter'}
        />
    </div>
  );
};

export default listView;