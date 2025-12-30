import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";
import { getAllUsers, updateUserStatus } from "../controllers/admin.controller.js";

const router = express.Router();

router.get(
  "/users",
  authMiddleware,
  roleMiddleware("admin"),
  getAllUsers
);

router.patch("/users/:userId/status", authMiddleware, roleMiddleware("admin"), updateUserStatus);


export default router;
