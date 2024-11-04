"use server"

import ViewResourceUtilization from '@/components/viewResourceUtilization/ViewResourceUtilization';
import { dbConnect } from '@/lib/mongo';
import { Faculty } from '@/model/faculty-model';
import { Location } from '@/model/location-model';
import React from 'react';

const utilForm = async() => {

  await dbConnect();
  const locations = await Location.find({active: 'Yes'}, { locName: 1, faculty: 1, _id: 0 }).lean();
  const facultys = await Faculty.find({Active: 'Yes'}, { facultyName: 1, facultyCode: 1, _id: 0 }).lean();

  return (
      <ViewResourceUtilization
        locations={locations}
        facultys={facultys}
      />
  );
}

export default utilForm;
