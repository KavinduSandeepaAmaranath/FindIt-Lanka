import express from "express";
import { 
    startRegistrationController, 
    verifyRegistrationOTPController,
    resendRegistrationOTPController,
    login, 
    logout, 
    sendResetOTPController,
    verifyResetOTPController,
    resendResetOTPController,  
    resetPasswordController, 
     
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
router.post("/resendResetOTP", resendResetOTPController);
router.post("/resetPassword", resetPasswordController);

export default router;