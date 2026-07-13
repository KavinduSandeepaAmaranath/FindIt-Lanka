import express from "express";
import { login, logout, register, resetPasswordController, sendOTPController, sendResetOTPController, verifyOTPController, verifyResetOTPController } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/sendOTP", sendOTPController);
router.post("/verifyOTP", verifyOTPController);
router.post("/login", login);
router.post("/logout", protect, logout);
router.post("/sendResetOTP", sendResetOTPController);
router.post("/verifyResetOTP", verifyResetOTPController);
router.post("/resetPassword", resetPasswordController);

export default router;