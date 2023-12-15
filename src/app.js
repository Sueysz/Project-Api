import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import { sessionMiddleWare } from "./session.js";

// Import Router
import BookingRouter from "./routers/BookingRouter.js";
import TrainRouter from "./routers/TrainRouter.js"
import TrainStationRouter from "./routers/TrainStationRouter.js"
import UserRouter from "./routers/UserRouter.js"
import { errorHandling } from "./errorHandling.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(sessionMiddleWare);
app.use(cors())


app.use("/booking", BookingRouter);
app.use("/trains", TrainRouter);
app.use("/trains-stations", TrainStationRouter);
app.use("/users", UserRouter);
app.use((error,req,res,next)=>{
    errorHandling(res,{error})
});
export default app;
