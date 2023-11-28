import mongoose from 'mongoose';

const BlogPostSchema = new mongoose.Schema({
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
        type: mongoose.isObjectIdOrHexString,
        ref: "User",
        requiered: true
    },
    comments:[{
        content: String,
        author:{
            type: mongoose.isObjectIdOrHexString,
            ref: "User",
            requiered: true
        }
    }]
});

export const blogPostModel = mongoose.model('BlogPost', BlogPostSchema);