import mongoose from "mongoose";

console.log("connecting to mongoDB");
const dbURL = process.env.MONGO_DB_URL || "default_connection_string";
export const client = await mongoose.connect(
    dbURL,
    {
        serverSelectionTimeoutMS: 5000,
    }
);
console.log("connected to mongoDB");