import express from "express";
import { login, logout, register, sendOTPController, verifyOTPController } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/sendOTP", sendOTPController);
router.post("/verifyOTP", verifyOTPController);
router.post("/logout", protect, logout);

export default router;