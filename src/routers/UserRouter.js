import express from "express";
import UserRepository from "../repositories/UserRepository.js";

const router = express.Router();

router.post("/create", (req, res) => {
});

// route 
router.get("/",async (req, res) => {
    const users = await UserRepository.listUser();
    res.json(users);
});

router.put("/:id", (req, res) => {
});

router.delete("/delete/:id", (req, res) => {
    
});

export default router;
