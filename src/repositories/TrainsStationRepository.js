import { TrainStationModel } from "../models/TrainStationModel.js";

class TrainStationRepository {
  async listTrainStation() {
    const stations = await TrainStationModel.find(
      {},
      {
        name: true,
        open_at: true,
        close_at: true,
        img: true,
      }
    );
    return stations;
  }

  async deleteTrainStation(id) {
    await TrainStationModel.deleteOne({ _id: id })
  }

  async createTrainStation(payload) {
    const stations = await TrainStationModel.create(payload);

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
}

export default new TrainStationRepository();
