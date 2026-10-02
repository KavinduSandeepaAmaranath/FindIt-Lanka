import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import { connectDB } from "../config/db.js";
import User from "../models/User.js";

dotenv.config();

const createAdmin = async () => {
    try {
        await connectDB();

        const existingAdmin = await User.findOne({
            role: "admin",
        });

        if (existingAdmin) {
            console.log("Admin account already exists.");
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash(
            process.env.ADMIN_PASSWORD,
            10
        );

        await User.create({
            name: process.env.ADMIN_NAME,
            email: process.env.ADMIN_EMAIL.toLowerCase().trim(),
            phoneNumber: process.env.ADMIN_PHONE,
            district: process.env.ADMIN_DISTRICT,
            password: hashedPassword,
            role: "admin",
        });

        console.log("Admin account created successfully");

        process.exit(0);
    } catch (error) {
        console.error("Failed to create admin.");
        console.error(error.message);

        process.exit(1);
    }
};

createAdmin();