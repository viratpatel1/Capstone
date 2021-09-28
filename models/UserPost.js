import mongoose from 'mongoose';

const userform = new mongoose.Schema({
    contentType: {
        type: String
    },
    filename: {
        type: String
    },
    image: {
        type: String
    },
    imagemsg: {
        type: String
    }
});

export const UserPost = mongoose.model("UserPost", userform)