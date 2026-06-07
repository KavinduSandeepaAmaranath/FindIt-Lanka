import express from "express";
import { register, sendOTPController, verifyOTPController } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/sendOTP", sendOTPController);
router.post("/verifyOTP", verifyOTPController);

export default router;