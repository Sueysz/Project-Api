import express from "express";
import passport from "passport"
import cors from "cors"
import dotenv from "dotenv"
// Import Router
import BookingRouter from "./routers/BookingRouter.js";
import TrainRouter from "./routers/TrainRouter.js"
import TrainStationRouter from "./routers/TrainStationRouter.js"
import UserRouter from "./routers/UserRouter.js"
// Import des models
import { BookingModel } from "./models/BookingModel.js";
import { TrainModel } from "./models/TrainModel.js";
import { TrainStationModel } from "./models/TrainStationModel.js";
import { UserModel } from "./models/UserModel.js";
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

app.use("/booking", BookingRouter);
app.use("/trains", TrainRouter);
app.use("/trains-stations", TrainStationRouter);
app.use("/users", UserRouter);

export default app;
