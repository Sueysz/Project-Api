import express from "express";
import TrainRepository from "../repositories/TrainRepository.js";
import { errorHandling } from "../errorHandling.js";
import { processRequestBody } from "zod-express-middleware";
import { trainCreationPayload } from "./zodTrainSchema.js";

const router = express.Router();

router.post("/",processRequestBody(trainCreationPayload), async (req, res) => {
    try {
        const train = await TrainRepository.createTrain(req.body);
        res.status(201).json(train);
    } catch (error) {
        errorHandling(res, error, "An error occurred while creating the train");
    }

});

router.get("/", async (req, res) => {
    try {
        const trains = await TrainRepository.listTrain();
        res.status(200).json(trains);
    } catch (error) {
        errorHandling(res, error, "An error occurred while fetching the list of trains");
    }

});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const train = await TrainRepository.updateTrain(id, req.body);
        res.status(200).json(train);
    } catch (error) {
        errorHandling(res, error, "An error occurred while updating the train",);
    }

});

router.delete("/:id", async (req, res) => {
    try {
        await TrainRepository.deleteTrain(req.params.id);
        res.status(204).end();
    } catch (error) {
        errorHandling(res,error,"An error occurred while deleting the train");
    }
});

export default router;
