import mongoose from 'mongoose';

const userform = new mongoose.Schema({
    image: {
        type: String
    },
    imagemsg: {
        type: String
    }
});

export const UserPost = mongoose.model("UserPost", userform)