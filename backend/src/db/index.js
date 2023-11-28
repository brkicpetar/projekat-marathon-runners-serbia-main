import mongoose from "mongoose";

export const database = {
    initialize() {

        const db = mongoose.connection;
        db.once("open", (_) => {
            console.log(`[${new Date().toISOString()}] Connection to database has been established successfully.`);
        });

        db.on("error", (err) => {
            console.error(`[${new Date().toISOString()}] Error while connection to database!: ${err}`);
        });

        return mongoose.connect('mongodb+srv://marathon:justkeeprunning@cluster0.daa0lmx.mongodb.net/?retryWrites=true&w=majority');
    },
}; 