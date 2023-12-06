import express from "express";
import UserRepository from "../repositories/UserRepository.js";
import { processRequestBody } from "zod-express-middleware";
import passport from "../passport.js";
import { z } from "zod";
import { UserModel } from "../models/UserModel.js";


const router = express.Router();

const UserCreateSchema = z.object({
    email: z.string(),
    username: z.string(),
    password: z.string().min(4),
  });

router.get("/", async (req, res)=>{
    const user = await UserRepository.listUser();
    res.status(201).json(user);
})

router.post("/", processRequestBody(UserCreateSchema), async (req, res) => {
  try {
    UserModel.register(
      new UserModel({
        username: req.body.username,
        email: req.body.email,
        role: "User",
      }),
      req.body.password,
      (err, account) => {
        if (err) {
          console.error(err);
          return res.status(400).json(err);
        }
  
        passport.authenticate("local")(req, res, () => {
          res.status(201).send("Created");
        });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

router.get("/:id",async(req,res)=>{
    const id = req.params.id
    const users = await UserRepository.listUser();
    res.json(users);
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const user = await UserRepository.updateUser(id, req.body);
    res.json(user);
});

router.delete("/delete/:id", async (req, res) => {
    await UserRepository.deleteUser(req.params.id)
});

export default router;
