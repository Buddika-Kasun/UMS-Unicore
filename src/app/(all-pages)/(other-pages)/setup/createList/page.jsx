"use server"

import ListFormComp from "@/components/listFormComp/ListFormComp";
import { dbConnect } from "@/lib/mongo";
import { List } from "@/model/list-model";


const createList = async({ searchParams }) => {

  const { docID } = searchParams || {};
  //console.log("Search params docID = ", docID);

  let formData = {};

  await dbConnect();

  const list = docID ? await List.findOne({ docID }) : null;

  if(list){

    formData = {
      docID: list.docID,
      docDate: list.docDate,
      listCode: list.listCode,
      listDscrp: list.listDscrp,
      active: list.active,
      details: list.details || [{ valueCode: '', valueDscrp: '' }]
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

  return (
    <ListFormComp data={formData} method={docID ? 'Update':'Create'} />
  )
}

export default createList;