import {  
    startRegistration, 
    verifyRegistrationOTP,
    resendRegistrationOTP,
    loginUser, 
    logoutUser, 
    sendResetOTP, 
    verifyResetOTP, 
    resetPassword 
} from "../services/authService.js";

export const startRegistrationController = async (req, res) => {
    try {
        const result = await startRegistration(req.body);

        res.status(200).json({
            success: true,
            message: result.message,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const verifyRegistrationOTPController = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const result = await verifyRegistrationOTP(email, otp);

        res.status(201).json({
            success: true,
            message: result.message,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const resendRegistrationOTPController = async (req, res) => {
    try {
        const { email }  = req.body;
        
        const result = await resendRegistrationOTP(email);

        res.status(200).json({
            success: true,
            message: result.message,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const login = async (req, res) => {
    try {
        const data = await loginUser(req.body);

        res.status(200).json({
            message: "User logged successfully",
            data,
        });
        
    } catch (error) {
        res.status(401).json({
            message: error.message,
        });
    }
};

export const logout = async (req, res) => {
    try {
        await logoutUser(req.user.userId);

        res.status(200).json({
            message: "Logged out successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const sendResetOTPController = async (req, res) => {
    try {
        const { email } = req.body;

        const result = await sendResetOTP(email);

        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

export const verifyResetOTPController = async (req, res) => {
    try {
        const { email, otp } = req.body;
        
        const result = await verifyResetOTP(email, otp);

        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

export const resetPasswordController = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;

        const result = await resetPassword (
            email,
            password,
            confirmPassword,
        );

        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};