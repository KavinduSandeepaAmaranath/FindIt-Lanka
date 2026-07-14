import express from "express";
import { 
    startRegistrationController, 
    verifyRegistrationOTPController,
    resendRegistrationOTPController,
    login, 
    logout, 
    resetPasswordController, 
    sendResetOTPController,  
    verifyResetOTPController 
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/startRegistration", startRegistrationController);
router.post("/verifyRegistrationOTP", verifyRegistrationOTPController);
router.post("/resendRegistrationOTP", resendRegistrationOTPController);
router.post("/login", login);
router.post("/logout", protect, logout);
router.post("/sendResetOTP", sendResetOTPController);
router.post("/verifyResetOTP", verifyResetOTPController);
router.post("/resetPassword", resetPasswordController);

export default router;