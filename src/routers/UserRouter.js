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

router.get("/:id",async(req,res)=>{
    const id = req.params.id
    const users = await UserRepository.listUser();
    res.json(users);
})

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const user = await UserRepository.updateUser(id, req.body);
    res.json(user);
});

router.delete("/delete/:id", async (req, res) => {
    await UserRepository.deleteUser(req.params.id)
});

export default router;
