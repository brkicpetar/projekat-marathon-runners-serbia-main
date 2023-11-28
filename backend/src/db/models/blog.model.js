import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    coverImagePath: String,
    content:{
        type: String,
        required: true
    },
    author: {
        type: mongoose.ObjectId,
        ref: "User",
        required: true
    },
    comments:[{
        content: String,
        author:{
            type: mongoose.ObjectId,
            ref: "User",
            required: true
        }
    }]
});

export const postModel = mongoose.model('POst', PostSchema);