import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('Mongodb is already connected');
        return;
    }

    try {
        const URI = (process.env.MONDO_DB_URI) ? process.env.MONDO_DB_URI : 'mongodb://localhost:27017'
        await mongoose.connect(URI, {
            dbName: 'promptor',
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        isConnected = true;
    } catch (error) {
        console.log(error);
    }
}