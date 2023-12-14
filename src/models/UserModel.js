import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {type: String, unique: true},
    username: {type: String},
    password: {type: String},
    role: {type: String, enum:["Admin","Employee","User"]},
    token: { type: String },
});

export const UserModel = mongoose.model("user", UserSchema);