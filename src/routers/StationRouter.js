import express from "express";
import TrainsStationRepository from "../repositories/StationRepository.js";
import { errorHandling } from "../utils/errorHandling.js";
import { authentificationMiddleWare } from "../adminMiddleware/authentificationMiddleware.js";
import { verifyAuthorization } from "../adminMiddleware/authorizationMiddleware.js";
import { getSortOptions } from "../utils/sort.js";

const router = express.Router();

router.post("/",authentificationMiddleWare, verifyAuthorization("Admin"), async (req, res) => {
    await TrainsStationRepository.createTrainStation(req.body);
    res.status(201)
        .send()
});

router.get("/", async (req, res) => {
        const station = await TrainsStationRepository.listTrainStation();
    res.json(station);
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const station = await TrainsStationRepository.getTrainStation(id);
    res.json(station);
});

router.put("/:id",authentificationMiddleWare, verifyAuthorization("Admin"), async (req, res) => {
    const { id } = req.params;
    await TrainsStationRepository.updateTrainStation(id, req.body);
    res.send();

});

router.delete("/:id",authentificationMiddleWare, verifyAuthorization("Admin"), async (req, res) => {
    try {
        await TrainsStationRepository.deleteTrainStation(req.params.id)
        res.status(204)
            .end()
    } catch (error) {
        if (error.message === "station not found") {
            return errorHandling(res,{ error, errorCode:404});
        }
        throw error
    }
});



router.get("/:id/image", async (req, res) => {
    const train = await TrainsStationRepository.getTrainStation(req.params.id)
    if (train === null) {
        return res.status(404)
            .send();
    }
    // @ts-ignore
    let imageTrain = train?.img;

    res.status(200)
        .set('Content-Type', 'image/png')
        .send(imageTrain);
})

export default router;
