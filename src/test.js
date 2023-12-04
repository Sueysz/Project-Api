import { TrainModel } from "./models/TrainModel.js";
import "./db.js";

async function listTrain() {
    const trains = await TrainModel.find(
        {}
    );
    return trains;
}
listTrain().then(console.log).catch(console.error)