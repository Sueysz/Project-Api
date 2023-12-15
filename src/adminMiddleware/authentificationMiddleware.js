import jwt from "jsonwebtoken";
import UserRepository from "../repositories/UserRepository";
import { errorHandling } from "../errorHandling";

export const AuthentificationMiddleWare = (req, res, next) => {
    const token = req.headers["Authorization"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }

    // @ts-ignore
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, payload) => {
        if(err) {
            return errorHandling(res, { errorMessage: "Invalid token", errorCode: 401 })
        }
        // @ts-ignore
        const { sub: userId } = payload
        req.user = await UserRepository.getById(userId)
        if (!req.user) {
            return errorHandling(res, { errorMessage: "Invalid token", errorCode: 401 })
        }
        next();
    });
};