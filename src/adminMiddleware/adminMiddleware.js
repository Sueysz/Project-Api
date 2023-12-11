// export function adminMiddleware(req, res, next) {
//     const authorization = req.headers["authorization"];
//       if (!authorization || authorization !== "Admin") {
//         return res.status(403).json("Forbidden");
//     }
//     next();
//   }

  const jwt = require("jsonwebtoken");

  export function adminMiddleware(req, res, next) {
    const authorization = req.headers["authorization"];
    if (!authorization) {
      return res.status(403).json("Forbidden");
    }
  
    const token = authorization.replace("Bearer ", "");
  
    jwt.verify(token, "votre_secret_key", (err, user) => {
      if (err || user.role !== "admin") {
        return res.status(403).json("Forbidden");
      }
      req.user = user;
  
      next();
    });
  }
  