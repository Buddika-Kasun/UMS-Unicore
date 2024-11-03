import {model, models, Schema} from "mongoose";

const reservationSchema = new Schema({
    docID: {
        required: true,
        type: String,
    },
    docDate: {
        required: true,
        type: String,
    },
    reservedBy: {
        required: true,
        type: String,
    },
    faculty: {
        required: true,
        type: String,
    },
    bookTyp: {
        required: true,
        type: String,
    },
    title: {
        required: true,
        type: String,
    },
    location: {
        required: true,
        type: String,
    },
    fromDate: {
        required: true,
        type: String,
    },
    toDate: {
        type: String,
        default: "",
    },
    fromTime: {
        required: true,
        type: String,
    },
    toTime: {
        type: String,
        default: "",
    },
    organizer:{
        type: String,
        default: "",
    },
    remark:{
        type: String,
        default: "",
    },
    repeat:{
        type: String,
        default: "",
    },
    active:{
        type: String,
        default: "",
    },
    cancel:{
        type: String,
        default: "",
    },
    hallStatusPairs: [{
        hallNo: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        }
    }]
});

export const Reservation = models.Reservation || model("Reservation", reservationSchema);