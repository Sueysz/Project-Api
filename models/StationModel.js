import mongoose from "mongoose"

const StationSchema = new mongoose.Schema({
    name: {type: String, required: true},
    open_at: {type: String, required: true},
    close_at: {type: String, required: true},
    img: {type: Buffer, required: true}
});

export const UserModel = mongoose.model("Station",StationSchema);