import express from "express";
import UserRepository from "../repositories/UserRepository.js";
import { processRequestBody } from "zod-express-middleware";
import { UserModel } from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { UserCreateSchema } from "../schema/zodSchema.js";
import { errorHandling } from "../errorHandling.js";
import { verifyAuthorization } from "../adminMiddleware/authorizationMiddleware.js";
import { authentificationMiddleWare } from "../adminMiddleware/authentificationMiddleware.js";

const router = express.Router();

router.post("/register", processRequestBody(UserCreateSchema), async (req, res) => {
  const { email, username, password } = req.body;
  if (!email || !username || !password) {
    return errorHandling(res, { errorCode: 400 })
  }
  const oldUser = await UserModel.findOne({ email });
  if (oldUser) {
    return errorHandling(res, { errorCode: 409 });
  }
  const encryptedPassword = await bcrypt.hash(password, 10);
  const user = await UserModel.create({
    email: email.toLowerCase(),
    username,
    password: encryptedPassword,
    role: "User",
  });
  res.status(201).json(user);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return errorHandling(res, { errorMessage: "bad request", errorCode: 400 })
  }
  const user = await UserModel.findOne({ email });
  if (!user) {
    return errorHandling(res, { errorMessage: "bad credentials", errorCode: 401 })
  }
  const isCorrectPassword = await bcrypt.compare(password, user.password)
  if (!isCorrectPassword) {
    return errorHandling(res, { errorMessage: "bad credentials", errorCode: 401 })
  }
  const token = jwt.sign(
    { sub: user._id },
    process.env.TOKEN_SECRET,
    {
      expiresIn: "2h",
    }
  );
  return res.status(200).json({ token });

});

// Only admin / employee can get all users
router.get("/",AuthentificationMiddleWare ,verifyAuthorization("Admin"), async (req, res) => {
    const user = await UserRepository.listUser();
    res.status(200).json(user);
});

// Only admin / employee can get all users
router.get("/:id", AuthentificationMiddleWare, verifyAuthorization("Admin"||"Employee"), async (req, res) => {
  const id = req.params.id
  const users = await UserRepository.getById(id);
  res.json(users);
});

// Only admin / your self can update user
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  await UserRepository.updateUser(id, req.body);
  res.send()
});

// Only your self can delete your self
router.delete("/delete/:id", async (req, res) => {
  await UserRepository.deleteUser(req.params.id)
});

export default router;
