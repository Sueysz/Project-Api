import { stationModel } from "../models/StationModel.js";
import TrainsRepository from './TrainRepository.js'
import jimp from "jimp";

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
      const image = await jimp.read(Buffer.from(payload.img, "base64"))
      return await stationModel.create({
        ...payload,
        img: await image.resize(200, 200).getBufferAsync(jimp.MIME_PNG)
      });
    } catch (error) {
      if (error.message.startsWith("E11000 duplicate key error collection:")) {
        throw new Error("Station already created")
      }
      throw error
    }
  }

  async updateStation(id, payload) {
    try {
      return stationModel.findOneAndUpdate({ _id: id }, payload, { new: true });
    } catch (error) {
      if (error.message.startsWith('Cast to ObjectId failed for value "')) {
        return null
      }
      throw error
    }

  }

  async getStation(id) {
    try {
      return await stationModel.findOne({ _id: id }, { img: false });
    } catch (error) {
      if (error.message.startsWith('Cast to ObjectId failed for value "')) {
        return null
      }
      throw error
    }

  }

  async getStationByName(name) {
    try {
      return await stationModel.findOne({ name }, { img: false });
    } catch (error) {
      if (error.message.startsWith('Cast to ObjectId failed for value "')) {
        return null
      }
      throw error
    }

  }

  async getStationImage(id) {
    try {
      return await stationModel.findOne({ _id: id }, { img: true });
    } catch (error) {
      if (error.message.startsWith('Cast to ObjectId failed for value "')) {
        return null
      }
      throw error
    }
  }
}

export default new StationRepository();
