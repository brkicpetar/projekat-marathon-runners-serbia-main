import mongoose from "mongoose";

const raceScheme = new mongoose.Schema({
    title: String,
    images: [String],
    type: String,
    categories: [String],
    city: String,
    collection: [String],
    participants: String,
    dateProp: String
});

export const raceModel = mongoose.model('Race', raceScheme);