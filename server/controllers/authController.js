import { registerUser } from "../services/authService";

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