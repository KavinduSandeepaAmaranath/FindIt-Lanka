import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["match", "claim", "system", "approval"],
      default: "match",
    },
    lostItemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LostItem",
      default: null,
    },
    foundItemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoundItem",
      default: null,
    },
    claimId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Claim",
      default: null,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Notification", notificationSchema);
