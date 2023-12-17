import express from "express";
import cors from "cors"
import dotenv from "dotenv"

// Import Router
import BookingRouter from "./routers/BookingRouter.js";
import TrainRouter from "./routers/TrainRouter.js"
import TrainStationRouter from "./routers/StationRouter.js"
import UserRouter from "./routers/UserRouter.js"
import { errorHandling } from "./utils/errorHandling.js";
import { autoCatch } from "./utils/handler.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors())

app.use(autoCatch)
app.use("/booking", BookingRouter);
app.use("/trains", TrainRouter);
app.use("/trains-stations", TrainStationRouter);
app.use("/users", UserRouter);
app.use((error,req,res,next)=>{
    errorHandling(res,{error})
});
export default app;
