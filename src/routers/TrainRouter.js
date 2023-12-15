import express from "express";
import TrainRepository from "../repositories/TrainRepository.js";
import { errorHandling } from "../errorHandling.js";
import { processRequestBody } from "zod-express-middleware";
import { trainPayload } from "../schema/zodSchema.js";
import { TrainModel } from "../models/TrainModel.js";

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
