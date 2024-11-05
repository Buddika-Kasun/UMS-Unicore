"use server"

import LocationForm from '@/components/locationForm/LocationForm';
import { dbConnect } from '@/lib/mongo';
import { CostCenter } from '@/model/costCenter-model';
import { Faculty } from '@/model/faculty-model';
import { List } from '@/model/list-model';
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

  const facultys = await Faculty.find({}, { facultyName: 1, facultyCode:1, _id: 0 }).lean();
  //const facultyNames = facultys.map(faculty => faculty.facultyName);

  const costCenters = await CostCenter.find({}, { costCenterName:1, costCenterCode:1, _id:0 }).lean();
  const costCenterNames = costCenters.map(costCenter => costCenter.costCenterName);

  //console.log(costCenterNames)
   
  const buildings = await List.findOne({ listCode: '001' }, { 'details.valueCode': 1, 'details.valueDscrp': 1, _id: 0 }).lean();
  const buildingNames = buildings.details.map((detail) => ({
    valueCode: detail.valueCode,
    valueDscrp: detail.valueDscrp
  }));

  //console.log(buildingNames);

  const locTypes = await List.findOne({ listCode: '003' }, { 'details.valueCode': 1, 'details.valueDscrp': 1, _id: 0 }).lean();
  const locTypeNames = locTypes.details.map((detail) => ({
    valueCode: detail.valueCode,
    valueDscrp: detail.valueDscrp
  }));

  const floors = await List.findOne({ listCode: '002' }, { 'details.valueCode': 1, 'details.valueDscrp': 1, _id: 0 }).lean();
  const floorNames = floors.details.map((detail) => ({
    valueCode: detail.valueCode,
    valueDscrp: detail.valueDscrp
  }));

  return (
    <LocationForm
      data={formData}
      method={docID ? 'Update':'Create'}
      facultys={facultys}
      costCenters={costCenterNames}
      buildings={buildingNames}
      locationTypes={locTypeNames}
      floors={floorNames} 
    />
  );
}

export default CreateLocationForm;
