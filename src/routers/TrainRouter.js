import express from "express";
import TrainRepository from "../repositories/TrainRepository.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const train = await TrainRepository.createTrain(req.body);
    res.status(201).json(train);
});

router.get("/", async (req, res) => {
    const trains = await TrainRepository.listTrain();
    console.log("Trains:", trains);
    res.json(trains);
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const train = await TrainRepository.updateTrain(id, req.body);
    res.json(train);
});

router.delete("/delete/:id", async (req, res) => {
    await TrainRepository.deleteTrain(req.params.id)
});

export default router;
