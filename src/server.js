import app from "./app.js";
import "./db.js";

<<<<<<< Updated upstream
app.listen(process.env.Port,()=>{
    console.log(`app listening at http://localhost:${process.env.Port}`);
=======
const port = process.env.PORT || 3000;

app.listen(process.env.PORT,()=>{
    console.log(`app listening at http://localhost:${port}`);
>>>>>>> Stashed changes
});