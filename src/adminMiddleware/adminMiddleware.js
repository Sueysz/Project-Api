import jwt from "jsonwebtoken";
import { createTokenAdmin } from "../createTokenAdmin.js"; 

export function adminMiddleware(req, res, next) {
  const authorizationHeader = req.headers["authorization"];

  if (!authorizationHeader) {
    return res.status(403).json("Forbidden: Authorization header missing");
  }

  const token = authorizationHeader.replace("Bearer ", "");
  const secretKey = process.env.TOKEN_SECRET;

  if (!secretKey) {
    return res.status(500).json("Internal Server Error: Token secret is missing");
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err || !isAdmin(user)) {
      return res.status(403).json("Forbidden: Invalid or insufficient privileges");
    }

    req.user = user;
    next();
  });
}

function isAdmin(user) {
  return user && user.role === "Admin";
}

const generatedToken = createTokenAdmin();
console.log('Generated Token for Admin:', generatedToken);