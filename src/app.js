import express from "express";
import passport from "passport"
import cors from "cors"
import dotenv from "dotenv"
import UserRouter from "./routers/UserRouter.js"
import { UserModel } from "./models/UserModel.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors())

app.get("/",(req,res)=>{
    console.log("hello")
});

app.use("/users", UserRouter);

export default app;