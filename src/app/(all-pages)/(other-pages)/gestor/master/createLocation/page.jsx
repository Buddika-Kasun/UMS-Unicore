"use server"

import LocationForm from '@/components/locationForm/LocationForm';
import { dbConnect } from '@/lib/mongo';
import { Location } from '@/model/location-model';

const CreateLocationForm = async({ searchParams }) => {

  const { docID } = searchParams || {};
  //console.log("Search params docID = ", docID);

  let formData = {};

  await dbConnect();

  const locationData = docID ? await Location.findOne({ docID }) : null;

  if(locationData){

    formData = {
      docID: locationData.docID,
      docDate: locationData.docDate,
      faculty: locationData.faculty,
      cost: locationData.cost,
      locationType: locationData.locationType,
      active: locationData.active,
      buildingNo: locationData.buildingNo,
      floorNo: locationData.floorNo,
      locName: locationData.locName,
      locCode: locationData.locCode,
    };

  }
  else {

    const currentYear = (new Date().getFullYear()) % 100;

    const preDocID = await Location.findOne({}, { docID: 1, _id: 0 }).sort({ _id: -1 });

    let id;

    if (!preDocID) {
      id = 1;
    }
    else {
      id = parseInt(preDocID.docID.split('/')[2]) + 1;
    }

    const newdocId = `${currentYear}/LOC/${id}`;

    formData = {
      docID: newdocId,
    };
  }

  return <LocationForm data={formData} method={docID ? 'Update':'Create'}/>;
}

export default CreateLocationForm;
