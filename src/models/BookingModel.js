import mongoose from "mongoose"

const BookingSchema = new mongoose.Schema({
    // departure_trainStation_id: relation (train station)
    // arrival_trainStation_id: relation (train station))
    // train_id: relation (train)
    // departure_hour: datetime
    // arrival_hour: datetime
    //user_id: relation (user)
});

export const BookingModel = mongoose.model("Booking",BookingSchema);
