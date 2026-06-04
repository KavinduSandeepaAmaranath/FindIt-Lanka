import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateAccessToken } from "../utils/generateAccessToken.js";
import { generateRefreshToken } from "../utils/generateRefreshToken.js";

export const registerUser = async ({ name, email, phoneNumber, district, password, confirmPassword }) => {
    try {
        if (password !== confirmPassword) {
            throw new Error("Password does not match");
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error("User already exists");
        }        

        const hashedPassword = await bcrypt.hash(password, 10);

        return await User.create({ name, email, phoneNumber, district, password: hashedPassword });
        
    } catch (error) {
        throw error;
    }
};