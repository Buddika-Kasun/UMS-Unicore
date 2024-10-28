import { model, models, Schema } from "mongoose";

const listDetailSchema = new Schema({
    valueCode: {
        required: true,
        type: String,
    },
    valueDscrp: {
        required: true,
        type: String,
    },
}, { _id: false });  // Set _id to false to avoid creating a unique ID for each sub-document

const listSchema = new Schema({
    docID: {
        required: true,
        type: String,
    },
    docDate: {
        required: true,
        type: String,
    },
    listCode: {
        required: true,
        type: String,
    },
    listDscrp: {
        required: true,
        type: String,
    },
    modifyBy: {
        required: false,
        type: String,
    },
    modifiedDate: {
        required: false,
        type: String,
    },
    active: {
        required: true,
        type: String,
    },
    details: [listDetailSchema] // Array of `listDetailSchema` objects
});

export const List = models.List || model("List", listSchema);
