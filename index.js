import express from "express";
import passport from "passport"
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cors())

app.get("/",(req,res)=>{
    console.log("hello")
})
const port = 3000;
app.listen(port,()=>{
    console.log(`app listening at http://localhost:${port}`);
})