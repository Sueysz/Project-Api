import { stationModel } from "../models/StationModel.js";

class StationRepository {
  async listStation() {
    return stationModel.find({},{img: false});
  }
    const { deletedCount } = await stationModel.deleteOne({ _id: id })
    if (deletedCount !== 1) {
      throw new Error("station not found");
    }
  }

  async createStation(payload) {
    return stationModel.create({
      ...payload,
      img: Buffer.from(payload.img, "base64"),
    });
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
