import jwt from "jsonwebtoken";

const config = process.env;

export const DoubleMiddleWare = (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }

    jwt.verify(token, config.TOKEN_SECRET, (err, user) => {
        if(err) {
            return res.status(403).send("Invalid token");
        }
        if (user && user.role !== "Admin" && user.role !== "Employee") {
            return res.status(403).send("Access forbidden. Admin role required.");
        }
        next();
    });
};