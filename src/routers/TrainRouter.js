import express from "express";
import TrainRepository from "../repositories/TrainRepository.js";
import { processRequestBody } from "zod-express-middleware";
import { TrainPayload } from "../schema/zodSchema.js";
import { TrainModel } from "../models/TrainModel.js";
import { authentificationMiddleWare } from "../adminMiddleware/authentificationMiddleware.js";
import { verifyAuthorization } from "../adminMiddleware/authorizationMiddleware.js";
import { getSortOptions } from "../utils/sort.js";
import { autoCatch } from '../utils/handler.js'
import { errorHandling } from "../utils/errorHandling.js";

const router = express.Router();

router.post("/", authentificationMiddleWare, verifyAuthorization("Admin"), processRequestBody(TrainPayload), autoCatch(async (req, res) => {
    try {
        const train = await TrainRepository.createTrain(req.body);
        res.status(201).json(train);
    } catch (error) {
        if (error.message.startsWith("Invalid station: ")) {
            return errorHandling(res, { errorMessage: error.message.slice(17), errorCode: 400 })
        }
        throw error
    }
   
}));

router.get("/", autoCatch(async (req, res) => {
    const { limit = 10, sortBy, sortOrder } = req.query;
    const sortOptions = getSortOptions(sortBy, sortOrder)

    const trains = await TrainModel.find({}, {})
        .limit(Number(limit))
        .sort(sortOptions)
        .exec();
    res.status(200).json(trains);
}));

router.put("/:id", authentificationMiddleWare, verifyAuthorization("Admin"), processRequestBody(TrainPayload), autoCatch(async (req, res) => {
    const { id } = req.params;
    const train = await TrainRepository.updateTrain(id, req.body);
    res.status(200).json(train);
}));

router.delete("/:id", authentificationMiddleWare, verifyAuthorization("Admin"), autoCatch(async (req, res) => {
    await TrainRepository.deleteTrain(req.params.id);
    res.status(204).end();
}));

export default router;
