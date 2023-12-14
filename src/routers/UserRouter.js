import express from "express";
import UserRepository from "../repositories/UserRepository.js";
import { processRequestBody } from "zod-express-middleware";
import { z } from "zod";
import { UserModel } from "../models/UserModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import { adminMiddleWare } from "../adminMiddleware/AdminMiddleWare.js"


const router = express.Router();

  // route creation user
// router.post("/", processRequestBody(UserCreateSchema), async (req, res) => {
//   try {
//     UserModel.register(
//     new UserModel({
//       username: req.body.username,
//       email: req.body.email,
//       role: req.body.role,
//     }),
//     req.body.password,
//     (err, account) => {
//       if (err) {
//         console.error(err);
//         return res.status(400).json(err);
//       }

//         res.status(201).send("Created");
//     }
//   );
// } catch (err) {
//   console.error(err);
//   res.status(400).json(err);
// }
// });

const registerSchema = z.object({
  email: z.string().email(),
  username: z.string(),
  password: z.string(),
  role: z.string().optional(), // Vous pouvez ajuster cela en fonction de votre logique métier
});

router.post("/register", async (req, res) => {
  try {
    const { email, username, password, role } = req.body;
    if (!(email && username && password)) {
      res.status(400).send("All input is required");
    }
    const oldUser = await UserModel.findOne({ email });
    if (oldUser) {
      return res.status(409).send("UserModel Already Exist. Please Login");
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      email: email.toLowerCase(),
      username,
      password: encryptedPassword,
      role: "User",
    });
    const token = jwt.sign(
      { user_id: user._id, email, role },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "2h",
      }
    );
    user.token = token;
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }
    const user = await UserModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email ,role: user.role},
        process.env.TOKEN_SECRET,
        {
          expiresIn: "2h",
        }
      );
      user.token = token;
      return res.status(200).json(user);
    }
    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
});

  // Only admin / employee can get all users (bothCheckMiddleware)
router.get("/", adminMiddleWare , async (req, res) => {
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

  // Only your self can delete your self
  router.delete("/delete/:id", async (req, res) => {
    await UserRepository.deleteUser(req.params.id)
});

export default router;
