import session from "express-session";
import dotenv from "dotenv";

dotenv.config();

export const sessionMiddleWare = session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: true,

})