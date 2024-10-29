import {model, models, Schema} from "mongoose";

const locationSchema = new Schema({
    docID: {
        required: true,
        type: String,
    },
    docDate: {
        required: true,
        type: String,
    },
    faculty: {
        required: true,
        type: String,
    },
    cost: {
        required: true,
        type: String,
    },
    locationType: {
        required: true,
        type: String,
    },
    active: {
        required: true,
        type: String,
    },
    buildingNo: {
        required: true,
        type: String,
    },
    floorNo: {
        required: true,
        type: String,
    },
    locName: {
        required: true,
        type: String,
    },
    locCode:{
        required: true,
        type: String,
    },
});

export const Location = models.Location || model("Location", locationSchema);