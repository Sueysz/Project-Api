import express, { json } from "express";
import TrainsStationRepository from "../repositories/StationRepository.js";
import { errorHandling } from "../utils/errorHandling.js";
import { authentificationMiddleWare } from "../adminMiddleware/authentificationMiddleware.js";
import { verifyAuthorization } from "../adminMiddleware/authorizationMiddleware.js";
import { autoCatch } from "../utils/handler.js";

const router = express.Router();

router.post("/", authentificationMiddleWare, verifyAuthorization("Admin"), autoCatch(async (req, res) => {
    try {
        const station = await TrainsStationRepository.createStation(req.body);
        res.status(201).json({id : station._id})
    } catch (error) {
        if (error.message === ("Station already created")) {
            errorHandling(res, { error, errorCode: 409 })
        }
        throw error
    }
}));

router.get("/", autoCatch(async (req, res) => {
    const station = await TrainsStationRepository.listStation();
    res.json(station);
}));

router.get("/:id", autoCatch(async (req, res) => {
    const { id } = req.params;
    const station = await TrainsStationRepository.getStation(id);
    res.json(station);
}));

router.put("/:id", authentificationMiddleWare, verifyAuthorization("Admin"), autoCatch(async (req, res) => {
    const { id } = req.params;
    await TrainsStationRepository.updateStation(id, req.body);
    res.send();

}));

router.delete("/:id", authentificationMiddleWare, verifyAuthorization("Admin"), autoCatch(async (req, res) => {
    try {
        await TrainsStationRepository.deleteStation(req.params.id)
        res.status(204)
            .end()
    } catch (error) {
        if (error.message === "station not found") {
            return errorHandling(res, { error, errorCode: 404 });
        }
        throw error
    }
}));



router.get("/:id/image", autoCatch(async (req, res) => {
    const train = await TrainsStationRepository.getStationImage(req.params.id)
    if (train === null) {
        return res.status(404)
            .send();
    }
    // @ts-ignore
    let imageTrain = train?.img;

    res.status(200)
        .set('Content-Type', 'image/png')
        .send(imageTrain);
}));

export default router;
