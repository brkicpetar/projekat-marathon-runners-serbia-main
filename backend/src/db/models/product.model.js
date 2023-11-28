import mongoose from "mongoose";

const productScheme = new mongoose.Schema({
    title: String,
    image1: String,
    image2: String,
    categories:{
        
    }
})