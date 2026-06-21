import mongoose from "mongoose";

const lostItemSchema = new mongoose.Schema({
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
            "Documents",
            "Bags",
            "Jewelry",
            "Keys",
            "Clothing",
            "Pets",
            "Other",
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
    lostDate: {
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
        enum: ["lost", "recovered", "closed"],
        default: "lost",
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

export default mongoose.model("LostItem", lostItemSchema);