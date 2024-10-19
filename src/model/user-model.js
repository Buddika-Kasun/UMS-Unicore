import {model, models, Schema} from "mongoose";
import { stringifyCookie } from "next/dist/compiled/@edge-runtime/cookies";

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
        default: "guest", // Assign default value
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
    loginDate: {
        type: Date,
        default: Date.now,
    },
    verification: {
        state: {
            type: String,
            default: "none",
        },
        type: {
            type: String,
        },
        image: {
            type: String,
        },
    },
});

export const User = models.User || model("User", userSchema);