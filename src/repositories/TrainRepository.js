import { TrainModel } from "../models/TrainModel.js";

class TrainsRepository {
    async listTrain(limit = 10) {
        const trains = await TrainModel.find(
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
        const train = await TrainModel.create(payload);

        return train;
    }

    async deleteTrain(id) {
        await TrainModel.deleteOne({ _id: id })
    }

    async updateTrain(id, payload) {
        const upTrain = await TrainModel.findOneAndUpdate(
            {
                _id: id,
            },
            payload,
            { new: true }
        );
        return upTrain;
    }
}

export default new TrainsRepository();
