import { TrainModel } from "../models/TrainModel.js";

class TrainsRepository {
    async listTrain(limit = 10) {
        return TrainModel.find(
            {},
            {
                name: true,
                start_station: true,
                end_station: true,
                time_of_departure: true,
            }
        ).limit(limit);
        return trains;
    }

    async createTrain(payload) {

        return TrainModel.create(payload);

    }

    async deleteTrain(id) {
        await TrainModel.deleteOne({ _id: id })
    }

    async updateTrain(id, payload) {
        return TrainModel.findOneAndUpdate(
            {
                _id: id,
            },
            payload,
            { new: true }
        );
    }
}

export default new TrainsRepository();
