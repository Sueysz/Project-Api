import express from "express";
import TrainRepository from "../repositories/TrainRepository.js";
import { processRequestBody } from "zod-express-middleware";
import { TrainPayload } from "../schema/zodSchema.js";
import { TrainModel } from "../models/TrainModel.js";
import { authentificationMiddleWare } from "../adminMiddleware/authentificationMiddleware.js";
import { verifyAuthorization } from "../adminMiddleware/authorizationMiddleware.js";

const router = express.Router();

router.post("/",authentificationMiddleWare,verifyAuthorization("Admin"), processRequestBody(TrainPayload), async (req, res) => {
    const train = await TrainRepository.createTrain(req.body);
    res.status(201).json(train);
});

router.get("/", async (req, res) => {
    const { limit = 10, sortBy, sortOrder } = req.query;

    /** @typedef {import('mongoose').SortOrder} SortOrder */
    /** @type {{ [key: string]: SortOrder }} */
    let sortOptions = { name: 'asc' }

    if (sortBy) {
        if (sortOrder === "desc") {
            sortOptions = { [sortBy.toString()]: 'desc' }
        } else {
            sortOptions = { [sortBy.toString()]: 'asc' }
        }
    }

    const trains = await TrainModel.find({}, {})
        .limit(Number(limit))
        .sort(sortOptions)
        .exec();
    res.status(200).json(trains);
});

router.put("/:id", processRequestBody(TrainPayload), async (req, res) => {
    const { id } = req.params;
    const train = await TrainRepository.updateTrain(id, req.body);
    res.status(200).json(train);
});

router.delete("/:id", async (req, res) => {
    await TrainRepository.deleteTrain(req.params.id);
    res.status(204).end();
});

export default router;
