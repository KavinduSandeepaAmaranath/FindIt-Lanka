import { sendOTP, verifyOTP, registerUser } from "../services/authService.js";

export const sendOTPController = async (req, res) => {
    try {
        const { email } = req.body;

        const result = await sendOTP(email);

        res.status(200).json(result);

    } catch (error) {
        res.status(400).json({
            message: error.message,
        });        
    }
};

export const verifyOTPController = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const result = await verifyOTP(email, otp);

        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

export const register = async (req, res) => {
    try {
        const user = await registerUser(req.body);

        const { password, ...userWithoutPassword } = user.toObject();
        
        res.status(201).json({
            message: "User registered successfully",
            user: userWithoutPassword,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};