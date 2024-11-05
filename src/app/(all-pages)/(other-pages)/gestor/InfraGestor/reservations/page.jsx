"use server"

import { auth } from "@/app/api/auth/auth";
import ReservationComp from "@/components/reservationsComp/ReservationComp";
import { dbConnect } from "@/lib/mongo";
import { Faculty } from "@/model/faculty-model";
import { Location } from "@/model/location-model";
import { Reservation } from "@/model/reservation-model";

const ReservationForm = async({searchParams}) => {

  const { docID, method } = searchParams || {};

  const session = await auth();
  const userName = session.user.name;

  const currentMethod = method ? 'Cancel': docID ? 'Update': 'Create';

  let formData = {};

  await dbConnect();

  const reservationData = docID ? await Reservation.findOne({ docID }) : null;

  //console.log(reservationData)

  if(reservationData){

    formData = {
      docID: reservationData.docID,
      docDate: reservationData.docDate,
      faculty: reservationData.faculty,
      bookTyp: reservationData.bookTyp,
      title: reservationData.title,
      location: reservationData.location,
      fromDate: reservationData.fromDate,
      toDate: reservationData.toDate,
      fromTime: reservationData.fromTime,
      toTime: reservationData.toTime,
      organizer: reservationData.organizer,
      remark: reservationData.remark,
      repeat: reservationData.repeat,
      reservedBy: reservationData.reservedBy,
      active: reservationData.active,
      cancel: reservationData.cancel,
      //hallStatusPairs: reservationData.hallStatusPairs,
      hallStatusPairs: reservationData.hallStatusPairs.map(({ hallNo, hallCap, status }) => ({
        hallNo,
        hallCap,
        status
      }))
    };
    console.log(formData);
  }
  else {

    const currentYear = (new Date().getFullYear()) % 100;

    const preDocID = await Reservation.findOne({}, { docID: 1, _id: 0 }).sort({ _id: -1 });

    let id;

    if (!preDocID) {
      id = 1;
    }
    else {
      id = parseInt(preDocID.docID.split('/')[2]) + 1;
    }

    const newdocId = `${currentYear}/RVC/${id}`;

    formData = {
      docID: newdocId,
      reservedBy: userName,
    };
  }

  const facultys = await Faculty.find({Active: 'Yes'}, { facultyName: 1, facultyCode: 1, _id: 0 }).lean();

  const locations = await Location.find({active: 'Yes'}, { locName: 1, faculty: 1, _id: 0 }).lean();

  return (
    <ReservationComp
      facultys = {facultys}
      data = {formData}
      locations = {locations}
      method={currentMethod}
      user={userName}
    />
  );
};

export default ReservationForm;
