"use server"

import { auth } from "@/app/api/auth/auth";
import ListFormComp from "@/components/listFormComp/ListFormComp";
import { dbConnect } from "@/lib/mongo";
import { Faculty } from "@/model/faculty-model";
import { List } from "@/model/list-model";


const createList = async({ searchParams }) => {

  const { docID } = searchParams || {};
  //console.log("Search params docID = ", docID);

  const session = await auth();
  const userName = session.user.name;

  let formData = {};

  await dbConnect();

  const list = docID ? await List.findOne({ docID }) : null;

  if(list){

    formData = {
      docID: list.docID,
      docDate: list.docDate,
      faculty: list.faculty,
      listCode: list.listCode,
      listDscrp: list.listDscrp,
      active: list.active,
      //details: list.details && list.details.length > 0 ? [...list.details] : [{ valueCode: '', valueDscrp: '' }],
      details: Array.isArray(list.details) && list.details.length > 0 
        ? list.details.map(detail => ({
            valueCode: detail.valueCode || '',
            valueDscrp: detail.valueDscrp || ''
          })) 
        : [{ valueCode: '', valueDscrp: '' }],
        modifiedBy: list.modifiedBy,
        modifiedDate: list.modifiedDate,
    };

  }
  else {

    const currentYear = (new Date().getFullYear()) % 100;

    const preDocID = await List.findOne({}, { docID: 1, _id: 0 }).sort({ _id: -1 });

    let id;

    if(!preDocID){
      id = 1;
    }
    else{
      id = parseInt(preDocID.docID.split('/')[2]) + 1;
    }

    const newdocId = `${currentYear}/LV/${id}`;

    formData = {
      docID: newdocId,
    };
  }

  const facultys = await Faculty.find({Active: 'Yes'}, { facultyName: 1, facultyCode: 1, _id: 0 }).lean();

  return (
    <ListFormComp data={formData} method={docID ? 'Update':'Create'} user={userName} facultys={facultys}/>
  )
}

export default createList;