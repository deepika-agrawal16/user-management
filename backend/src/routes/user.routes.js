import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { getUserProfile, updateProfile,changePassword } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile", authMiddleware, getUserProfile);
router.put("/profile", authMiddleware, updateProfile);
router.put("/change-password", authMiddleware, changePassword);


export default router;