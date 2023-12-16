import jwt from "jsonwebtoken";
import UserRepository from "../repositories/UserRepository.js";
import { errorHandling } from "../utils/errorHandling.js";
import "dotenv/config" 

export const authentificationMiddleWare = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token|| !token.startsWith("Bearer ")) {
        return res.status(403).send("A token is required for authentication");
    }
    const tokenValue = token.slice(7);

    // @ts-ignore
    jwt.verify(tokenValue, process.env.TOKEN_SECRET, async (err, payload) => {
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