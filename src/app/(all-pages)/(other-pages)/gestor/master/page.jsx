"use server"

import LocationForm from '@/components/locationForm/LocationForm';
import { dbConnect } from '@/lib/mongo';
import { Location } from '@/model/location-model';

const CreateLocationForm = async() => {

  const currentYear = (new Date().getFullYear()) % 100;

  await dbConnect();
  const preDocID = await Location.findOne({}, { docID: 1, _id: 0 }).sort({ _id: -1 });

  const id = parseInt(preDocID.docID.split('/')[2]) + 1;

  const newdocId = `${currentYear}/LOC/${id}`;

  /*const formData = {
    docID: newdocId,
    docDate: new Date(Date.now()).toLocaleString(),
    faculty: 'Faculty of Law',
    cost: '',
    locationType: '',
    active: 'yes',
    buildingNo: 0,
    floorNo: 0,
    locName: '',
    locCode: 'LOC/1',
  }*/

  const formData = {
    docID: newdocId,
  }

  return (
    <LocationForm data={formData}/>
  )
}

export default CreateLocationForm;
