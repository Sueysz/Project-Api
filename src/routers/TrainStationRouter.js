import express from "express";
import TrainsStationRepository from "../repositories/TrainsStationRepository.js";
import { errorHandling } from "../errorHandling.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const station = await TrainsStationRepository.createTrainStation(req.body);
        res.status(201).json(station);
    } catch (error) {
        errorHandling(res, error, "An error occurred while creating the train-station",400);
    }
});

router.get("/", async (req, res) => {
    try {
        const station = await TrainsStationRepository.listTrainStation();
        res.json(station);
    } catch (error) {
        errorHandling(res, error, "An error occured while fetching the list of train-station",503);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const station = await TrainsStationRepository.updateTrainStation(id, req.body);
        res.json(station);
    } catch (error) {
        errorHandling(res, error, "An error occurred while updating the train-station",400);
    }

});

router.delete("/:id", async (req, res) => {
    try {
        await TrainsStationRepository.deleteTrainStation(req.params.id)
        res.status(204).end()
    } catch (error) {
        errorHandling(res, error, "an error occured while deleting the train-station",400);
    }
});

export default router;
