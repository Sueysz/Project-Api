import express from "express";
import UserRepository from "../repositories/UserRepository.js";
import { processRequestBody } from "zod-express-middleware";
import { UserModel } from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { UserCreateSchema } from "../schema/zodSchema.js";
import { errorHandling } from "../utils/errorHandling.js";
import { verifyAuthorization } from "../adminMiddleware/authorizationMiddleware.js";
import { authentificationMiddleWare } from "../adminMiddleware/authentificationMiddleware.js";
import { autoCatch } from "../utils/handler.js";

const router = express.Router();

router.post("/register", processRequestBody(UserCreateSchema), autoCatch (async (req, res) => {
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
}));

router.post("/login", autoCatch (async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return errorHandling(res, { errorMessage: "bad request", errorCode: 400 })
  }
  const user = await UserModel.findOne({ email });
  if (!user) {
    return errorHandling(res, { errorMessage: "bad credentials", errorCode: 401 })
  }
  // @ts-ignore
  const isCorrectPassword = await bcrypt.compare(password, user.password)
  if (!isCorrectPassword) {
    return errorHandling(res, { errorMessage: "bad credentials", errorCode: 401 })
  }
  const token = jwt.sign(
    { sub: user._id },
    // @ts-ignore
    process.env.TOKEN_SECRET,
    {
      expiresIn: "2h",
    }
  );
  return res.status(200).json({ token });

}));

// Only admin / employee can get all users
// @ts-ignore
router.get("/", authentificationMiddleWare, verifyAuthorization(["Admin", "Employee"]),autoCatch (async (req, res) => {
  const user = await UserRepository.listUser();
  res.status(200).json(user);
}));

// Only admin / employee can get all users
router.get("/:id", authentificationMiddleWare, autoCatch(async (req, res) => {
  const id = req.params.id

  // @ts-ignore
  if (req.params.id !== req.user._id && req.user.role === "User") {
    return errorHandling(res, { errorMessage: "Forbidden", errorCode: 403 })
  }

  const users = await UserRepository.getById(id);
  res.json(users);
}));

// Only admin / your self can update user
router.put("/:id", authentificationMiddleWare, verifyAuthorization(["Admin", "Employee", "User"]), autoCatch(async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  // @ts-ignore
  if (req.user.role !== "Admin" && req.user._id !== id) {
    return errorHandling(res, { errorMessage: "Access Denied", errorCode: 403 });
  }

  // Role change check
  // @ts-ignore
  if (role !== undefined && req.user.role !== "Admin") {
    return errorHandling(res, { errorMessage: "Only Admin can change user roles", errorCode: 403 });
  }

  // Update user
  await UserRepository.updateUser(id, req.body);

  // Success response
  return res.send("User updated successfully");
}));

// Only your self can delete your self
// @ts-ignore
router.delete("/delete/:id", authentificationMiddleWare, autoCatch( async(req, res) => {
  const { id } = req.params;

  // @ts-ignore
  if (req.user._id.toString() !== id) {
    return errorHandling(res, { errorMessage: "Access Denied", errorCode: 403 });
  }
  await UserRepository.deleteUser(id);

  res.status(200).send("User deleted successfully");
}));

export default router;
