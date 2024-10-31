"use server"

import CreateSubLocation from '@/components/createSubLocation/CreateSubLocation';
import { dbConnect } from '@/lib/mongo';
import { Faculty } from '@/model/faculty-model';
import { List } from '@/model/list-model';
import { Location } from '@/model/location-model';
import { Sublocation } from '@/model/subLocation-model';
import React from 'react';

const SubLocationForm = async({ searchParams }) => {

  const { docID } = searchParams || {};
  //console.log("Search params docID = ", docID);

  let formData = {};

  await dbConnect();

  const subLocationData = docID ? await Sublocation.findOne({ docID }) : null;

  if(subLocationData){

    formData = {
      docID: subLocationData.docID,
      docDate: subLocationData.docDate,
      faculty: subLocationData.faculty,
      locationName: subLocationData.locationName,
      subLocationName: subLocationData.subLocationName,
      subLocationCode: subLocationData.subLocationCode,
      hallCap: subLocationData.hallCap,
      stockLoc: subLocationData.stockLoc,
      rackNo: subLocationData.rackNo,
      binNo: subLocationData.binNo,
      active: subLocationData.active,
      departments: subLocationData.departments,
    };

  }
  else {

    const currentYear = (new Date().getFullYear()) % 100;

    const preDocID = await Sublocation.findOne({}, { docID: 1, _id: 0 }).sort({ _id: -1 });

    let id;

    if (!preDocID) {
      id = 1;
    }
    else {
      id = parseInt(preDocID.docID.split('/')[2]) + 1;
    }

    const newdocId = `${currentYear}/SLOC/${id}`;

    formData = {
      docID: newdocId,
    };
  }

  const facultys = await Faculty.find({}, { facultyName: 1, facultyCode: 1, _id: 0 }).lean();

  const locations = await Location.find({}, { locName: 1, faculty: 1, _id: 0 }).lean();

  const deps = await List.find({ listCode: 'DEP' }, { faculty: 1, details: 1, _id: 0 }).lean();

  // Transform the result to include faculty and details
  const depNames = deps.map(dep => ({
    faculty: dep.faculty,
    details: dep.details.map(detail => ({
      valueCode: detail.valueCode,
      valueDscrp: detail.valueDscrp
    }))
  }));

  //console.log(depNames)

  return (
    <CreateSubLocation
      data = {formData}
      method={docID ? 'Update':'Create'}
      facultys = {facultys}
      locations = {locations}
      deps = {depNames}
    />
  );
};

export default SubLocationForm;
