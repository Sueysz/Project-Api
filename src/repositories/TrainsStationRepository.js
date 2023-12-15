import { TrainStationModel } from "../models/TrainStationModel.js";

class TrainStationRepository {
  async listTrainStation() {
    const stations = await TrainStationModel.find(
      {},
      {
        img: false,
      }
    );
    return stations;
  }

  async deleteTrainStation(id) {
    const { deletedCount } = await TrainStationModel.deleteOne({ _id: id })
    if (deletedCount !== 1) {
      throw new Error("station not found");
    }
  }

  async createTrainStation(payload) {

    const stations = await TrainStationModel.create({
      ...payload,
      img: Buffer.from(payload.img, "base64"),

    });

    return stations;
  }

  async updateTrainStation(id, payload) {
    const upStations = await TrainStationModel.findOneAndUpdate(
      {
        _id: id,
      },
      payload,
      { new: true }
    );
    return upStations;
  }

  async getTrainStation(id) {
    const getTrain = await TrainStationModel.findOne(
      {
        _id: id,
      },
      {
        img: false,
      }
    );
    return getTrain;
  }
}

export default new TrainStationRepository();
