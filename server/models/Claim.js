import mongoose from "mongoose";

const claimSchema = new mongoose.Schema({
    claimantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    foundItemId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FoundItem",
        required: true,
    },
    lostItemId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LostItem",
        required: true,
    },
    message: {
        type: String,
        required: true,
        trim: true,
        minLength: 10,
        maxLength: 500,
    },
    reviewNote: {
        type: String,
        trim: true,
        maxLength: 500,
        default: "",
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected", "cancelled"],
        default: "pending",
    },
},
{
    timestamps: true,
} 
);

export default mongoose.model("Claim", claimSchema);