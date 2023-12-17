import { TrainModel } from "../models/TrainModel.js";
import StationRepository from "./StationRepository.js";

class TrainsRepository {
    async getTrainById(id) {
        try {
            return await TrainModel.findOne({ _id: id })
        } catch (error) {
            if (error.message.startsWith('Cast to ObjectId failed for value "')) {
                return null
            }
            throw error
        }

    }

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
    }

    /**
    * @param {*} station
    * @returns {Promise<Array<*>>}
    */
    async listTrainByStation(station) {
        const trainsStartingInStation = await TrainModel.find({ start_station: station.name }, {})
        const trainsEndingInStation = await TrainModel.find({ end_station: station.name }, {})
        return trainsStartingInStation.concat(trainsEndingInStation)
    }

    async createTrain(payload) {
        const startStation = await StationRepository.getStationByName(payload.start_station)
        const endStation = await StationRepository.getStationByName(payload.end_station)
        if (!startStation && !endStation) {
            throw new Error("Invalid station: Invalid startStation and endStation")
        }
        if (!startStation) {
            throw new Error("Invalid station: Invalid startStation")
        }
        if (!endStation) {
            throw new Error("Invalid station: Invalid endStation")
        }

        return TrainModel.create(payload);

    }

    async deleteTrain(id) {
        await TrainModel.deleteOne({ _id: id })
    }

    async updateTrain(id, payload) {
        try {
            return await TrainModel.findOneAndUpdate(
                {
                    _id: id,
                },
                payload,
                { new: true }
            );
        } catch (error) {
            if (error.message.startsWith('Cast to ObjectId failed for value "')) {
                return null
            }
            throw error
        }

    }
}

export default new TrainsRepository();
