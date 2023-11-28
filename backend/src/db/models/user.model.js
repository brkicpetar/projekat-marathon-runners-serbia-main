import mongoose from "mongoose";

const userScheme = new mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    bio: String,
    shippingData:{
        adress: String,
        city: String,
        postcode: String,
        mobile: String
    }
});

export const userModel = mongoose.model('User', userScheme);