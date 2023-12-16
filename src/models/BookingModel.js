import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    departure_trainStation_id: { type: mongoose.Schema.Types.ObjectId, ref: "TrainStation" },
    arrival_trainStation_id: { type: mongoose.Schema.Types.ObjectId, ref: "TrainStation" },
    train_id: { type: mongoose.Schema.Types.ObjectId, ref: "Train" },
    departure_hour: { type: Date },
    arrival_hour: { type: Date },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export const BookingModel = mongoose.model("Booking", BookingSchema);
