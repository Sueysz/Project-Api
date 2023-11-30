import mongoose from "mongoose"

const BookSchema = new mongoose.Schema({
    name: {type: String, required: true},
    open_at: {type: String, required: true},
    close_at: {type: String, required: true},
    img: {type: Blob, required: true}
});

export const UserModel = mongoose.model("Book",BookSchema);