import {model, models, Schema} from "mongoose";

const costCenterSchema = new Schema({
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
    costCenterCode: {
        required: true,
        type: String,
    },
    costCenterName: {
        required: true,
        type: String,
    },
    active: {
        required: true,
        type: String,
    },
});

export const CostCenter = models.CostCenter || model("CostCenter", costCenterSchema);
