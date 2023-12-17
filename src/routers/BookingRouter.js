import express from "express";
import BookingRepository from "../repositories/BookingRepository.js";
import { autoCatch } from "../utils/handler.js";
import { authentificationMiddleware } from "../adminMiddleware/authentificationMiddleware.js"
import { errorHandling } from "../utils/errorHandling.js";
import { processRequestBody } from "zod-express-middleware";
import { BookingSchema, BookingValidationSchema } from "../schema/zodSchema.js";
import TrainRepository from "../repositories/TrainRepository.js";
import UserRepository from "../repositories/UserRepository.js";
import { verifyAuthorization } from "../adminMiddleware/authorizationMiddleware.js";

const router = express.Router();

router.post("/", authentificationMiddleware, processRequestBody(BookingSchema), autoCatch(async (req, res) => {
    const train = await TrainRepository.getTrainById(req.body.train_id)
    if (!train) {
        return errorHandling(res, { errorMessage: 'Train does not exist', errorCode: 400 })
    }
    const ticket = await BookingRepository.createBooking(req.user.id, req.body.train_id)
    res.status(201).json({id : ticket._id})
}));

router.post("/validate/:id", authentificationMiddleware, verifyAuthorization(["Employee", "Admin"]), processRequestBody(BookingValidationSchema), autoCatch(async (req, res) => {
    const ticket = await BookingRepository.getBookingById(req.params.id)
    if (!ticket) {
        return errorHandling(res, { errorMessage: 'Ticket does not exist', errorCode: 400 })
    }
    const train = await TrainRepository.getTrainById(req.body.train_id)
    if (!train) {
        return errorHandling(res, { errorMessage: 'Train does not exist', errorCode: 400 })
    }
    const trainId = train._id.toString()
    const user = await UserRepository.getById(req.body.user_id)
    if (!user) {
        return errorHandling(res, { errorMessage: 'User does not exist', errorCode: 400 })
    }
    const userId = user._id.toString()
    // @ts-ignore
    if (trainId !== req.body.train_id && userId !== req.body.user_id) {
        return errorHandling(res, { errorMessage: 'Ticket for the wrong train and user', errorCode: 402 })
    }
    if (trainId !== req.body.train_id) {
        return errorHandling(res, { errorMessage: 'Ticket for the wrong train', errorCode: 402 })
    }
    if (userId !== req.body.user_id) {
        return errorHandling(res, { errorMessage: 'Ticket for the wrong user', errorCode: 402 })
    }

    res.status(200).json({ ticket })
}));

export default router;
