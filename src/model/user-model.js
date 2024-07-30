import {model, models, Schema} from "mongoose";

const userSchema = new Schema({
    name: {
        required: true,
        type: String,
    },
    faculty: {
        required: true,
        type: String,
    },
    type: {
        required: true,
        type: String,
    },
    name: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        type: String,
    },
    pw: {
        required: true,
        type: String,
    },
    role: {
        // required: true,
        type: String,
    },
});

export const User = models.User || model("User", userSchema);