import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import passport from "./passport.js";
import session from "express-session";


// Import Router
import BookingRouter from "./routers/BookingRouter.js";
import TrainRouter from "./routers/TrainRouter.js"
import TrainStationRouter from "./routers/TrainStationRouter.js"
import UserRouter from "./routers/UserRouter.js"

const app = express();
dotenv.config();
app.use(express.json());
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: process.env.SESSION_RESAVE === 'true',
      saveUninitialized: process.env.SESSION_SAVE_UNINITIALIZED === 'true',
  
    })
  );
app.use(cors())
app.use(passport.initialize());
app.use(passport.session());

app.use("/booking", BookingRouter);
app.use("/trains", TrainRouter);
app.use("/trains-stations", TrainStationRouter);
app.use("/users", UserRouter);

export default app;
