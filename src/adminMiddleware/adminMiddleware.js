import jwt from "jsonwebtoken";
import { createTokenAdmin } from "../createTokenAdmin.js"; 

export function adminMiddleware(req, res, next) {
  const authorization = req.headers["authorization"];
  if (!authorization) {
    return res.status(403).json("Forbidden");
  }

  const token = authorization.replace("Bearer ", "");
  const secretKey = process.env.TOKEN_SECRET; 

  jwt.verify(token, secretKey, (err, user) => {
    if (err || user.role !== "Admin") {
      return res.status(403).json("Forbidden");
    }

    req.user = user;
    next();
  });
}

const generatedToken = createTokenAdmin();
console.log('Generated Token for Admin:', generatedToken);