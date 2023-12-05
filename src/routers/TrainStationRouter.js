import express from "express";
import TrainsStationRepository from "../repositories/TrainsStationRepository.js";
import { errorHandling } from "../errorHandling.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const station = await TrainsStationRepository.createTrainStation(req.body);
        res.status(201).json(station);
    } catch (error) {
        errorHandling(res, error, "An error occurred while creating the train-station", 400);
    }
});

router.get("/", async (req, res) => {
    try {
        const station = await TrainsStationRepository.listTrainStation();
        res.json(station);
    } catch (error) {
        errorHandling(res, error, "An error occured while fetching the list of train-station", 503);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const station = await TrainsStationRepository.getTrainStation();
        res.json(station);
    } catch (error) {
        errorHandling(res, error, "An error occured while fetching the list of train-station", 503);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const station = await TrainsStationRepository.updateTrainStation(id, req.body);
        res.json(station);
    } catch (error) {
        errorHandling(res, error, "An error occurred while updating the train-station", 400);
    }

});

router.delete("/:id", async (req, res) => {
    try {
        await TrainsStationRepository.deleteTrainStation(req.params.id)
        res.status(204).end()
    } catch (error) {
        errorHandling(res, error, "an error occured while deleting the train-station", 400);
    }
});



router.get("/:id/images", async (req, res) => {
    try {
        let imageTrain = "";

        await TrainsStationRepository.getTrainStation(req.params.id).then((train) => {
            // @ts-ignore Img existe bien mais mon eslint me met une erreur ts car il pense que je type mal mais en js on ne type pas.
            imageTrain = train.img
        });
        res.status(200).send(imageTrain);
    } catch (error) {
        errorHandling(res, error, "an error occured while retrieving image from db", 500);
    }
})

export default router;
