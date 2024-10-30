"use server"

import CreateFacultyComp from '@/components/createFacultyComp/CreateFacultyComp';
import { dbConnect } from '@/lib/mongo';
import { Faculty } from '@/model/faculty-model';

const CreateFaculty = async({ searchParams }) => {

  const { docID } = searchParams || {};
  //console.log("Search params docID = ", docID);

  let formData = {};

  await dbConnect();

  const faculty = docID ? await Faculty.findOne({ docID }) : null;

  if(faculty){

    formData = {
      docID: faculty.docID,
      docDate: faculty.docDate,
      facultyCode: faculty.facultyCode,
      facultyName: faculty.facultyName,
      Active: faculty.Active,
    };

  }
  else {

    const currentYear = (new Date().getFullYear()) % 100;

    const preDocID = await Faculty.findOne({}, { docID: 1, _id: 0 }).sort({ _id: -1 });

    let id;

    if(!preDocID){
      id = 1;
    }
    else{
      id = parseInt(preDocID.docID.split('/')[2]) + 1;
    }

    const newdocId = `${currentYear}/FAC/${id}`;

    formData = {
      docID: newdocId,
    };
  }

  return (
    <CreateFacultyComp
      data={formData}
      method={docID ? 'Update':'Create'}
    />
  );
};

export default CreateFaculty;