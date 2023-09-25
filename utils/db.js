import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
    mongoose.set("strictQuery", true);

    if(isConnected) {
        console.log("Mongodb is already conected!")
        return;
    }

    try {
        await mongoose.connect(process.env.DB_URL, {
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        isConnected = true;

        console.log("connected")
    } catch (error) {
        console.log(error);
    }
}