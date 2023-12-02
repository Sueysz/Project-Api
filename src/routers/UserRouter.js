import express from "express";
import UserRepository from "../repositories/UserRepository.js";

const router = express.Router();

router.post("/create", async (req, res) => {
    const user = await UserRepository.createUser(req.body);

    res.status(201).json(user);
});

// route 
router.get("/",async (req, res) => {
    const users = await UserRepository.listUser();
    res.json(users);
});

router.put("/:id", (req, res) => {
});

router.delete("/delete/:id", async (req, res) => {
    await UserRepository.deleteUser(req.params.id)
});

export default router;
