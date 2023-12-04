import mongoose from "mongoose"

const TrainSchema = new mongoose.Schema({
    name: {type: String, required: true},
    start_station: { type: mongoose.Schema.Types.ObjectId, ref: 'TrainStation', required: true },
    end_station: { type: mongoose.Schema.Types.ObjectId, ref: 'TrainStation', required: true },
    time_of_departure: {type: Date, required: true}
});

export const TrainModel = mongoose.model("Train",TrainSchema);