import { 
    sendOTP, 
    verifyOTP, 
    registerUser, 
    loginUser, 
    logoutUser, 
    sendResetOTP, 
    verifyResetOTP, 
    resetPassword 
} from "../services/authService.js";

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