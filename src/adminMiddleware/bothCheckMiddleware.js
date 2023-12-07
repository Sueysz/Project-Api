export function bothCheckMiddleware(req, res, next) {
    const authorization = req.headers["authorization"];
    if (!authorization || (authorization !== "Admin" && authorization !== "Employee")) {
        return res.status(403).json("Forbidden");
    }
    next();
    }