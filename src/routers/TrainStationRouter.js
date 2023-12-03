import express from "express";
import TrainsStationRepository from "../repositories/TrainsStationRepository.js";

const router = express.Router();

router.post("/create", async (req, res) => {
    const station = await TrainsStationRepository.createTrainStation(req.body);
});

router.get("/",async (req, res) => {
    const station = await TrainsStationRepository.listTrainStation();
    res.json(station);
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const station = await TrainsStationRepository.updateTrainStation(id, req.body);
    res.json(req.body);
});

router.delete("/delete/:id", async (req, res) => {
    await TrainsStationRepository.deleteTrainStation(req.params.id)
});

export default router;
