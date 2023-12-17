import app from "./app.js";
import "./db.js";

const PORT = process.env.PORT ?? 3000;

app.listen(PORT,()=>{
    console.log(`app listening at http://localhost:${PORT}`);
});
