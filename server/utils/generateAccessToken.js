import jwt from "jsonwebtoken";

export const generateAccessToken = (user) => {
    if (!user || !user._id) {
        throw new Error("Invalid user data for Generate Access Token");
    }

    if (!process.env.ACCESS_TOKEN_SECRET) {
        throw new Error("ACCESS_TOKEN_SECRET is not defined");
    }

    return jwt.sign(
        {
            userId: user._id,
            role: user.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30m" }
    );
};