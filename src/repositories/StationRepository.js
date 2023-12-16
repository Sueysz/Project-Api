import { stationModel } from "../models/StationModel.js";
import TrainsRepository from './TrainRepository.js'

class StationRepository {
  async listStation() {
    return stationModel.find({}, { img: false });
  }

  async deleteStation(id) {
    const station = await this.getStation(id)
    if (!station) {
      throw new Error("station not found");
    }
    const trains = await TrainsRepository.listTrainByStation(station)
    if (trains.length !== 0) {
      throw new Error(`Trains ${trains.map(t => t._id).join(', ')} still use it`)
    }
    const { deletedCount } = await stationModel.deleteOne({ _id: id })
    if (deletedCount !== 1) {
      throw new Error("station not found");
    }
  }

  async createStation(payload) {
    try {
      return await stationModel.create({
        ...payload,
        img: Buffer.from(payload.img, "base64"),
      });
    } catch (error) {
      if (error.message.startsWith("E11000 duplicate key error collection:")) {
        throw new Error("Station already created")
      }
      throw error
    }
  }

  async updateStation(id, payload) {
    return stationModel.findOneAndUpdate({ _id: id }, payload, { new: true });
  }

  async getStation(id) {
    return stationModel.findOne({ _id: id }, { img: false });
  }

  async getStationByName(name) {
    return stationModel.findOne({ name }, { img: false });
  }
}

export default new StationRepository();
