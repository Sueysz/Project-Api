import express from "express";
import TrainRepository from "../repositories/TrainRepository";

const router = express.Router();

router.post("/train/create", async (req, res) => {
    const train = await TrainRepository.createTrain(req.body);
    res.status(201).json(train);
});

router.get("/train", async (req, res) => {
    const trains = await TrainRepository.listTrain();
    res.json(trains);
});

router.put("/train/:id", async (req, res) => {
    const { id } = req.params;
    const train = await TrainRepository.updateTrain(id, req.body);
    res.json(train);
});

router.delete("/train/delete/:id", async (req, res) => {
    await TrainRepository.deleteTrain(req.params.id)
});

export default router;
