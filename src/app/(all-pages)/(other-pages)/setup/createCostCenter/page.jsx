"use server"

import CreateCostCenterComp from '@/components/createCostCenterComp/CreateCostCenterComp';
import { dbConnect } from '@/lib/mongo';
import { CostCenter } from '@/model/costCenter-model';

const createCostCenter = async({ searchParams }) => {

  const { docID } = searchParams || {};
  //console.log("Search params docID = ", docID);

  let formData = {};

  await dbConnect();

  const costCenters = docID ? await CostCenter.findOne({ docID }) : null;

  if(costCenters){
    formData = {
      docID: costCenters.docID,
      createDate: costCenters.createDate, // when update use new date time
      createBy: costCenters.createBy,
      faculty: costCenters.faculty,
      costCenterCode: costCenters.costCenterCode,
      costCenterName: costCenters.costCenterName,
      active: costCenters.active,
    };

  }
  else {

    const currentYear = (new Date().getFullYear()) % 100;

    const preDocID = await CostCenter.findOne({}, { docID: 1, _id: 0 }).sort({ _id: -1 });

    let id;

    if (!preDocID) {
      id = 1;
    }
    else {
      id = parseInt(preDocID.docID.split('/')[2]) + 1;
    }

    const newdocId = `${currentYear}/CC/${id}`;

    formData = {
      docID: newdocId,
    };
  }

  const listData = await CostCenter.find({},{_id: 0, __v:0,}).lean();

  return (
    <CreateCostCenterComp data={formData} method={docID ? 'Update':'Create'} list={listData}/>
   );
}

export default createCostCenter;