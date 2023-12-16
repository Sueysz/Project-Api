import { TrainModel } from "../models/TrainModel.js";
import StationRepository from "./StationRepository.js";

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
        if(!startStation && !endStation){
            throw new Error("Invalid station: Invalid startStation and endStation")
        }
        if(!startStation){
            throw new Error("Invalid station: Invalid startStation")
        }
        if(!endStation){
            throw new Error("Invalid station: Invalid endStation")
        }
        
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
