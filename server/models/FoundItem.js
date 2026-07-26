import mongoose from "mongoose";

const foundItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 5,
        maxLength: 100,
    },
    category: {
        type: String,
        required: true,
        enum: [
            "Electronics",
            "Personal Items",
            "Pets & Animals",
            "Bags & Wallets",
            "Documents",
            "Clothing",
            "Vehicles",
            "Jewellery",
            "Others"
        ],
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minLength: 10,
        maxLength: 1000,
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
    location: {
        type: String,
        required: true,
        trim: true,
        minLength: 8,
        maxLength: 200,
    },
    foundDate: {
        type: Date,
        required: true,
    }, 
    images: [
        {
            type: String,
        },
    ],
    status: {
        type: String,
        enum: ["found", "returned", "closed"],
        default: "found",
    },
    approvalStatus: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
   
},
{
    timestamps: true,
}
);

export default mongoose.model("FoundItem", foundItemSchema);