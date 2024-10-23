import {model, models, Schema} from "mongoose";

const facultySchema = new Schema({
    docID: {
        required: true,
        type: String,
    },
    facultyCode: {
        required: true,
        type: String,
        unique: true,
    },
    facultyName: {
        required: true,
        type: String,
        unique: true,
    },
    Active: {
        required: true,
        type: String,
    },
});

facultySchema.index({ facultyCode: 1 }, { unique: true });
facultySchema.index({ facultyName: 1 }, { unique: true });

export const Faculty = models.Faculty || model("Faculty", facultySchema);
