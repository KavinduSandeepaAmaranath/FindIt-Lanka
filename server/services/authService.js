import User from "../models/User.js";
import EmailVerification from "../models/EmailVerification.js";
import bcrypt from "bcryptjs";
import { generateOTP } from "../utils/generateOTP.js";
import { sendEmail } from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";
import { generateAccessToken } from "../utils/generateAccessToken.js";
import { generateRefreshToken } from "../utils/generateRefreshToken.js";
import ResetPassword from "../models/ResetPassword.js";

export const sendOTP = async (email) => {
    email = email.toLowerCase().trim();
    
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("Email is already registered");
    }

    const otp = generateOTP();

    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await EmailVerification.findOneAndUpdate(
        { email },
        {
            email,
            otp,
            verified: false,
            expiresAt,
        },
        {
            upsert: true,
            returnDocument: "after",
        }
    );

    await sendEmail({
        to: email,
        subject: "FindIt Lanka Email Verification",
        html: `
            <h2>Email Verification</h2>
            <p>Your verification code is:</p>
            <h1>${otp}</h1>
            <p>This code will expire in 5 minutes.</p>
        `,
    });

    return {
        message: "Verification code sent successfully",
    };
    
};

export const verifyOTP = async (email, otp) => {
    email = email.toLowerCase().trim();
    
    const verification = await EmailVerification.findOne({ email });

    if (!verification) {
        throw new Error("Verification record not found");
    }

    if (verification.verified) {
        throw new Error("Email is already verified");
    }

    if (verification.expiresAt < new Date()) {
        throw new Error("OTP has expired");
    }

    if (verification.otp !== String(otp)) {
        throw new Error("Invalid OTP");
    }

    verification.verified = true;

    await verification.save();

    return {
        message: "Email verified successfully"
    };
    
};

export const registerUser = async ({ 
    name, 
    email, 
    phoneNumber, 
    district, 
    password, 
    confirmPassword, 
}) => {

    email = email.toLowerCase().trim();

    const verification = await EmailVerification.findOne({ email });

    if (!verification) {
        throw new Error("Email has not been verified");
    }

    if (!verification.verified) {
        throw new Error("Please verify your email first");
    }
    
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

    await EmailVerification.deleteOne({ email });

    return user;

};

export const loginUser = async ({ email, password }) => {
    email = email.toLowerCase().trim();
    
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("Invalid email or password");
        }

        if (user.status === "suspended") {
            throw new Error("Account has been suspended");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error("Invalid email or password");
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        user.refreshToken = refreshToken;

        await user.save();

        return {
            accessToken,
            refreshToken,
        }
};

export const logoutUser = async (userId) => {
    return await User.findByIdAndUpdate(
        userId,
        { refreshToken: null },
        { returnDocument: "after" }
    );
};

export const sendResetOTP = async (email) => {
    email = email.toLowerCase().trim();

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
        throw new Error("User not found");
    }

    const otp = generateOTP();

    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await ResetPassword.findOneAndUpdate(
        { email },
        {
            email,
            otp,
            verified: false,
            expiresAt,
        },
        {
            upsert: true,
            returnDocument: "after",
        },
    );

    await sendEmail({
        to: email,
        subject: "FindIt Lanka Password Reset",
        html: `
            <h2>Password Reset Verification</h2>
            <p>Your verification code for Password Reset is:</p>
            <h1>${otp}</h1>
            <p>This code will expire in 5 minutes.</p>
        `,
    });

    return {
        message: "Reset Password Verification code sent successfully",
    };
};

export const verifyResetOTP = async (email, otp) => {
    email = email.toLowerCase().trim();
    
    const verification = await ResetPassword.findOne({ email });

    if (!verification) {
        throw new Error("Reset password verification record not found");
    }

    if (verification.verified) {
        throw new Error("Reset OTP has already been verified");
    }

    if (verification.expiresAt < new Date()) {
        throw new Error("OTP has expired");
    }

    if (verification.otp !== String(otp)) {
        throw new Error("Invalid OTP");
    }

    verification.verified = true;

    await verification.save();

    return {
        message: "Reset OTP verified successfully"
    };
    
};

export const resetPassword = async (email, password, confirmPassword ) => {
    email = email.toLowerCase().trim();

    const resetRecord = await ResetPassword.findOne({ email });

    if (!resetRecord) {
        throw new Error("Password reset request not found");
    }    

    if (!resetRecord.verified) {
        throw new Error("Please verify the reset OTP first");
    }

    if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,64}$/;

    if (!passwordRegex.test(password)) {
        throw new Error(
            "Password must be 8-64 characters long and include at least one uppercase letter, one lowercase letter, and one number"
        );
    }

    const user = await User.findOne({ email });
    
    if (!user) {
        throw new Error("User not found");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    user.refreshToken = null;

    await user.save();

    await ResetPassword.deleteOne({ email });

    return {
        message: "Password reset successfully",
    };
};