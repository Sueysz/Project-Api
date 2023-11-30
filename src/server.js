import app from "./app.js";
import "./db.js";

const port = process.env.PORT || 3000;

app.listen(process.env.PORT,()=>{
    console.log(`app listening at http://localhost:${port}`);
});
