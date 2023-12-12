import jwt from "jsonwebtoken";
import { createTokenBoth } from "../createTokenBoth.js"; 

export function bothCheckMiddleware(req, res, next) {
    const authorization = req.headers["authorization"];
    if (!authorization) {
    return res.status(403).json("Forbidden");
    }

    const token = authorization.replace("Bearer ", "");
    const secretKey = process.env.TOKEN_SECRET; 

    jwt.verify(token, secretKey, (err, user) => {
    if (!authorization || (authorization !== "Admin" && authorization !== "Employee")) {
        return res.status(403).json("Forbidden");
    }

    req.user = user;
    next();
    });
}

const generatedToken = createTokenBoth();
console.log('Generated Token for Both:', generatedToken);
