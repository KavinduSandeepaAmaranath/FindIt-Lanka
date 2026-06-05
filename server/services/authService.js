import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateAccessToken } from "../utils/generateAccessToken.js";
import { generateRefreshToken } from "../utils/generateRefreshToken.js";

export const registerUser = async ({ 
    name, 
    email, 
    phoneNumber, 
    district, 
    password, 
    confirmPassword 
}) => {

    if (password !== confirmPassword) {
        throw new Error("Password does not match");
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,64}$/;

    if (!passwordRegex.test(password)) {
        throw new Error(
            "Password must be 8-64 characters long and include at least one uppercase letter, one lowercase letter, and one number"
        );
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("User already exists");
    }        

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ 
        name, 
        email, 
        phoneNumber, 
        district, 
        password: hashedPassword 
    });

    return user;

};