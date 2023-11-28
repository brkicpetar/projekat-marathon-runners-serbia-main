import mongoose from "mongoose";

const productScheme = new mongoose.Schema({
    title: String,
    image: [String],
    categories: [String],
    gender: String,
    collection: [String],
    price: String
});

export const productModel = mongoose.model('Product', productScheme);