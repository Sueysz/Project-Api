import app from "./app.js";
import "./db.js";

app.listen(process.env.Port,()=>{
    console.log(`app listening at http://localhost:${process.env.Port}`);
});