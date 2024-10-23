import {model, models, Schema} from "mongoose";

const facultySchema = new Schema({
    docID: {
        required: true,
        type: String,
    },
    facultyCode: {
        required: true,
        type: String,
    },
    facultyName: {
        required: true,
        type: String,
    },
    Active: {
        required: true,
        type: String,
    },
});

export const Faculty = models.Faculty || model("Faculty", facultySchema);
