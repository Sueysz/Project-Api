import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    email: {type: String, required: true},
    pseudo: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, required:true, enum:["Admin","Employee","User"]}
});

export const UserModel = mongoose.model("user", UserSchema);