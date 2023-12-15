import fs from "fs/promises";

const myFile = await fs.readFile("./train.jpg");
console.log(myFile.toString("base64"));