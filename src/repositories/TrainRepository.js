import { TrainModel } from "../models/TrainModel.js";

class TrainsRepository {
    async listTrain() {
        const trains = await TrainModel.find(
            {},
            {
                name: true,
                start_station: true,
                end_station: true,
                time_of_departure: true,
            }
        );
        return trains;
    }

    async createTrain(payload) {
        const user = await TrainModel.create(payload);

        return user;
    }

    async deleteTrain(id) {
        await TrainModel.deleteOne({ _id: id })
    }

    async updateTrain(id, payload) {
        const upTrain = await TrainModel.findOneAndUpdate(
            {
                _id: id,
            },
            payload
        );
        return upTrain;
    }
}

export default new TrainsRepository();
