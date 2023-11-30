import express from "express";
import passport from "passport"
import cors from "cors"
import dotenv from "dotenv"

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors())

export default app;