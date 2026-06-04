import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 100,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
        match: [/^(\+94|0)[0-9]{9}$/, "Please enter a valid Sri Lankan phone number"],
    },
    district: {
        type: String,
        required: true,
        enum: [
            "Ampara",
            "Anuradhapura",
            "Badulla",
            "Batticaloa",
            "Colombo",
            "Galle",
            "Gampaha",
            "Hambantota",
            "Jaffna",
            "Kalutara",
            "Kandy",
            "Kegalle",
            "Kilinochchi",
            "Kurunegala",
            "Mannar",
            "Matale",
            "Matara",
            "Monaragala",
            "Mullaitivu",
            "Nuwara Eliya",
            "Polonnaruwa",
            "Puttalam",
            "Ratnapura",
            "Trincomalee",
            "Vavuniya",
        ],
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 64,
        match: [
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,64}$/,
            "Password must be at least 8 characters, include one uppercase letter, one lowercase letter and one number"
        ],
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    status: {
        type: String,
        enum: ["active", "suspended"],
        default: "active",
    },
    profileImage: {
        type: String,
        default: null,
    },

},
{
    timestamps: true,
});

export default mongoose.model("User", userSchema);