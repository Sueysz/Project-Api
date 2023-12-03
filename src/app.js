import express from "express";
import passport from "passport"
import cors from "cors"
import dotenv from "dotenv"
// Import Router
import BookingRouter from "./repositories/BookingRouter.js";
import TrainRouter from "../src/routers/TrainRouter.js"
import TrainStationRouter from "../src/routers/TrainStationRouter.js"
import UserRouter from "./routers/UserRouter.js"

// Import des models
import { BookingModel } from "./models/BookingModel.js";
import { TrainModel } from "./models/TrainModel.js";
import { TrainStationModel } from "./models/TrainStationModel.js";
import { UserModel } from "./models/UserModel.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors())

app.get("/",(req,res)=>{
    console.log("hello")
});

app.use("/booking", UserRouter);
app.use("/trains", TrainRouter);
app.use("/train-station", UserRouter);
app.use("/users", UserRouter);

export default app;
