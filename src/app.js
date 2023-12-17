import express from "express";
import cors from "cors"
import dotenv from "dotenv"

import swaggerUi from "swagger-ui-express";
import { parse } from "yaml";
import fs from "node:fs/promises";

// Import Router
import BookingRouter from "./routers/BookingRouter.js";
import TrainRouter from "./routers/TrainRouter.js"
import TrainStationRouter from "./routers/StationRouter.js"
import UserRouter from "./routers/UserRouter.js"
import { errorHandling } from "./utils/errorHandling.js";

const swaggerDocument = parse(await fs.readFile("./openapi.yaml", "utf8"));

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors())

app.use("/booking", BookingRouter);
app.use("/trains", TrainRouter);
app.use("/trains-stations", TrainStationRouter);
app.use("/users", UserRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use((error,req,res,next)=>{
    errorHandling(res,{error})
});
export default app;
