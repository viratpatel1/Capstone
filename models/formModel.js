import mongoose from "mongoose";

const form = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    number: {
        type: Number,
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String
    }
});
export const Register = mongoose.model("Register", form);