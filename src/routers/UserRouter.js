import express from "express";
import UserRepository from "../repositories/UserRepository.js";
import { processRequestBody } from "zod-express-middleware";
import passport from "../passport.js";
import { z } from "zod";
import { UserModel } from "../models/UserModel.js";
import { adminMiddleware } from "../adminMiddleware/adminMiddleware.js";
import { bothCheckMiddleware } from "../adminMiddleware/bothCheckMiddleware.js";


const router = express.Router();

const UserCreateSchema = z.object({
    email: z.string(),
    username: z.string(),
    password: z.string().min(4),
    role: z.string(),
  });

  // route creation user
router.post("/", processRequestBody(UserCreateSchema), async (req, res) => {
  try {
    UserModel.register(
    new UserModel({
      username: req.body.username,
      email: req.body.email,
      role: req.body.role,
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

  // Only admin / employee can get all users (bothCheckMiddleware)
router.get("/", bothCheckMiddleware, async (req, res) => {
  try {
    const user = await UserRepository.listUser();
    res.status(200).json(user);
  } catch (error) {
    console.error("Marche po '-'", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


  // Utile ??
// router.get("/:id", bothCheckMiddleware ,async(req,res)=>{
//     const id = req.params.id
//     const users = await UserRepository.listUser();
//     res.json(users);
// });

  // Only admin / your self can update user
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const user = await UserRepository.updateUser(id, req.body);
    res.json(user);
});

  // Only you can delete your self
router.delete("/delete/:id", async (req, res) => {
    await UserRepository.deleteUser(req.params.id)
});

export default router;
