import {model, models, Schema} from "mongoose";

const subLocationSchema = new Schema({
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
    locationName: {
        required: true,
        type: String,
    },
    subLocationName: {
        required: true,
        type: String,
    },
    subLocationCode: {
        required: true,
        type: String,
    },
    active: {
        required: true,
        type: String,
    },
    hallCap: {
        type: String,
        default: "",
    },
    stockLoc: {
        required: true,
        type: String,
    },
    rackNo: {
        type: String,
        default: "",
    },
    binNo:{
        type: String,
        default: "",
    },
    departments: {
        type: [String], // Array to store selected department names
        default: [],
    },
});

export const Sublocation = models.Sublocation || model("Sublocation", subLocationSchema);