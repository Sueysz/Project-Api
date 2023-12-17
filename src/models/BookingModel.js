import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    train_id: { type: mongoose.Schema.Types.ObjectId, ref: "Train" },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export const BookingModel = mongoose.model("Booking", BookingSchema);
