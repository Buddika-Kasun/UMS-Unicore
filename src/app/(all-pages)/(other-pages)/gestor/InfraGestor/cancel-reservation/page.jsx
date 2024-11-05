"use server"

import React from 'react';
import CancelResComp from '@/components/cancelReservation/CancenlResComp';
import { Faculty } from '@/model/faculty-model';
import { Location } from '@/model/location-model';
import { dbConnect } from '@/lib/mongo';

const CancelReservationForm = async() => {

  await dbConnect();

  const facultys = await Faculty.find({Active: 'Yes'}, { facultyName: 1, facultyCode: 1, _id: 0 }).lean();

  const locations = await Location.find({active: 'Yes'}, { locName: 1, faculty: 1, _id: 0 }).lean();

  return (
    <CancelResComp
      facultys={facultys}
      locations={locations}
    />
  );
};

export default CancelReservationForm;
