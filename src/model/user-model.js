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
        default: "Guest", // Assign default value
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
    loginDate: {
        type: Date,
        default: Date.now,
    },
    profilePicUrl: {
        type: String,
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
        createDate: {
            type: Date,
            default: Date.now,
        },
        verifyImgUrl: {
            type: String,
        }
    },
});

export const User = models.User || model("User", userSchema);