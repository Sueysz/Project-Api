import app from "./app.js";
import "./db.js";


app.listen(process.env.PORT,()=>{
    console.log(`app listening at http://localhost:${process.env.PORT}`);
});
