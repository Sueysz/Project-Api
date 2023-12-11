import express from "express";
import TrainRepository from "../repositories/TrainRepository.js";
import { errorHandling } from "../errorHandling.js";
import { processRequestBody } from "zod-express-middleware";
import { trainPayload } from "../schema/zodTrainSchema.js";

const router = express.Router();

router.post("/",processRequestBody(trainPayload), async (req, res) => {
    try {
        const train = await TrainRepository.createTrain(req.body);
        res.status(201).json(train);
    } catch (error) {
        errorHandling(res, error, "An error occurred while creating the train",400);
    }

});

router.get("/", async (req, res) => {
    try {
        const limit = Number(req.query.limit) || 10;
        const trains = await TrainRepository.listTrain(limit);
        res.status(200).json(trains);
    } catch (error) {
        errorHandling(res, error, "An error occurred while fetching the list of trains",503);
    }

});

router.put("/:id",processRequestBody(trainPayload), async (req, res) => {
    try {
        const { id } = req.params;
        const train = await TrainRepository.updateTrain(id, req.body);
        res.status(200).json(train);
    } catch (error) {
        errorHandling(res, error, "An error occurred while updating the train",400);
    }

});

router.delete("/:id", async (req, res) => {
    try {
        await TrainRepository.deleteTrain(req.params.id);
        res.status(204).end();
    } catch (error) {
        errorHandling(res,error,"An error occurred while deleting the train",503);
    }
    
});

export default router;
