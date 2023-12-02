import mongoose from "mongoose"

const BookingSchema = new mongoose.Schema({
    name: {type: String, required: true},
    open_at: {type: String, required: true},
    close_at: {type: String, required: true},
    img: {type: Blob, required: true}
});

export const BookingModel = mongoose.model("Booking",BookingSchema);