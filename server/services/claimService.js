import mongoose from "mongoose";
import { createNotification } from "./notificationService.js";
import Claim from "../models/Claim.js";
import LostItem from "../models/LostItem.js";
import FoundItem from "../models/FoundItem.js";

export const createClaim = async ({
    claimantId,
    foundItemId,
    lostItemId,
    message = "Item return/claim request",
}) => {
    if (!mongoose.Types.ObjectId.isValid(lostItemId)) {
        throw new Error("Invalid lost item ID. Please select a valid live report.");
    }
    if (!mongoose.Types.ObjectId.isValid(foundItemId)) {
        throw new Error("Invalid found item ID. Please select a valid live report.");
    }

    const lostItem = await LostItem.findById(lostItemId);
    if (!lostItem) {
        throw new Error("Lost item report not found in database.");
    }

    if (lostItem.status !== "lost") {
        throw new Error("This lost item report is no longer active.");
    }

    const foundItem = await FoundItem.findById(foundItemId);
    if (!foundItem) {
        throw new Error("Found item report not found in database.");
    }

    if (foundItem.status !== "found") {
        throw new Error("This found item report is no longer available.");
    }

    const isFounder = foundItem.userId.toString() === claimantId.toString();
    const isOwner = lostItem.userId.toString() === claimantId.toString();

    if (!isFounder && !isOwner) {
        throw new Error("You must be either the owner of the lost item or the founder of the found item.");
    }

    const existingClaim = await Claim.findOne({
        foundItemId,
        lostItemId,
        status: {
            $in: ["pending", "approved"],
        },
    });

    if (existingClaim) {
        throw new Error("A claim or return request has already been submitted for this item pair.");
    }

    const claim = await Claim.create({
        claimantId,
        foundItemId,
        lostItemId,
        message: message || "Item return/claim request",
    });

    const targetUserId = isFounder ? lostItem.userId : foundItem.userId;
    if (targetUserId) {
        await createNotification({
            userId: targetUserId,
            title: isFounder ? "Item Return Offer Received" : "Ownership Claim Received",
            message: isFounder
                ? `Someone has offered to return an item matching your lost report (${lostItem.title}).`
                : `Someone has submitted an ownership claim for your found item (${foundItem.title}).`,
            type: isFounder ? "claim" : "found",
            category: "claims",
            tone: "green",
            icon: "box",
            actionLabel: "Review Request",
            foundItemId: foundItem._id,
            lostItemId: lostItem._id,
            claimId: claim._id,
        });
    }

    return claim;
};

export const getAllClaims = async () => {
    return await Claim.find()
    .populate("claimantId", "fullName name email phone profilePicture profileImage avatar")
    .populate({
        path: "foundItemId",
        populate: { path: "userId", select: "fullName name email phone profilePicture profileImage avatar" }
    })
    .populate({
        path: "lostItemId",
        populate: { path: "userId", select: "fullName name email phone profilePicture profileImage avatar" }
    });
};

export const getMyClaims = async (userId) => {
    const lostItems = await LostItem.find({ userId }).select("_id");
    const lostItemIds = lostItems.map((item) => item._id);

    return await Claim.find({
        lostItemId: { $in: lostItemIds }
    })
    .populate("claimantId", "fullName name email phone profilePicture profileImage avatar")
    .populate({
        path: "foundItemId",
        populate: { path: "userId", select: "fullName name email phone profilePicture profileImage avatar" }
    })
    .populate({
        path: "lostItemId",
        populate: { path: "userId", select: "fullName name email phone profilePicture profileImage avatar" }
    })
    .sort({ createdAt: -1 });
};

export const getMyReturns = async (userId) => {
    const foundItems = await FoundItem.find({ userId }).select("_id");
    const foundItemIds = foundItems.map((item) => item._id);

    return await Claim.find({
        foundItemId: { $in: foundItemIds }
    })
    .populate("claimantId", "fullName name email phone profilePicture profileImage avatar")
    .populate({
        path: "foundItemId",
        populate: { path: "userId", select: "fullName name email phone profilePicture profileImage avatar" }
    })
    .populate({
        path: "lostItemId",
        populate: { path: "userId", select: "fullName name email phone profilePicture profileImage avatar" }
    })
    .sort({ createdAt: -1 });
};

export const getClaimsForFoundItem = async (foundItemId) => {
    const claims = await Claim.find({ foundItemId })
    .populate("claimantId", "fullName name email phone profilePicture profileImage avatar")
    .populate({
        path: "foundItemId",
        populate: { path: "userId", select: "fullName name email phone profilePicture profileImage avatar" }
    })
    .populate({
        path: "lostItemId",
        populate: { path: "userId", select: "fullName name email phone profilePicture profileImage avatar" }
    });

    if (claims.length === 0) {
        throw new Error("No claims found for this found item");
    }
    return claims;
};

export const approveClaim = async (claimId, userId, reviewNote) => {
    const claim = await Claim.findById(claimId);

    if (!claim) {
        throw new Error("Claim not found");
    }
    if (claim.status !== "pending") {
        throw new Error("Only pending claims can be approved");
    }

    const foundItem = await FoundItem.findById(claim.foundItemId);

    if (!foundItem) {
        throw new Error("Found item not found");
    }
    if (foundItem.status !== "found") {
        throw new Error("This found item is no longer available");
    }

    const lostItem = await LostItem.findById(claim.lostItemId);

    if (!lostItem) {
        throw new Error("Lost item not found");
    }
    if (lostItem.status !== "lost") {
        throw new Error("This lost item is no longer available");
    }

    claim.status = "approved";

    if (!reviewNote || !reviewNote.trim()) {
        throw new Error("A review note is required when approving a claim");
    }

    claim.reviewNote = reviewNote.trim();
    
    foundItem.status = "returned";
    lostItem.status = "recovered";

    await claim.save();

    await Claim.updateMany(
        {
            foundItemId: claim.foundItemId,
            _id: { $ne: claim._id },
            status: "pending",
        },
        {
            status: "rejected",
            reviewNote: "Another claim has already been approved for this item.",
        }
    );
    
    await foundItem.save();
    await lostItem.save();

    if (claim.claimantId) {
        await createNotification({
            userId: claim.claimantId,
            title: "Your claim was approved!",
            message: `Your claim for ${foundItem.title} has been approved.`,
            type: "claim",
            category: "claims",
            tone: "green",
            icon: "shield",
            actionLabel: "View Claim",
            foundItemId: foundItem._id,
            lostItemId: lostItem._id,
            claimId: claim._id,
        });
    }

    return claim;
};

export const rejectClaim = async (claimId, userId, reviewNote) => {
    const claim = await Claim.findById(claimId);

    if (!claim) {
        throw new Error("Claim not found");
    }
    if (claim.status !== "pending"){
        throw new Error("Only pending claims can be rejected");
    }

    const foundItem = await FoundItem.findById(claim.foundItemId);
    
    if (!foundItem) {
        throw new Error("Found item not found");
    }
    if (foundItem.status !== "found"){
        throw new Error("This found item is no longer available");
    }

    const lostItem = await LostItem.findById(claim.lostItemId);
    if (!lostItem) {
        throw new Error("Lost item not found");
    }
    if (lostItem.status !== "lost") {
        throw new Error("This lost item is no longer available");
    }

    claim.status = "rejected";

    if (!reviewNote || !reviewNote.trim()) {
        throw new Error("A review note is required when rejecting a claim");
    }

    claim.reviewNote = reviewNote.trim();

    await claim.save();

    return claim;
};

export const cancelClaim = async (claimId, userId) => {
    const claim = await Claim.findById(claimId);

    if (!claim) {
        throw new Error("Claim not found");
    }
    if (claim.claimantId.toString() !== userId.toString()) {
        throw new Error("You are not authorized to cancel this claim");
    }
    if (claim.status !== "pending") {
        throw new Error("Only pending claims can be cancelled");
    }

    claim.status = "cancelled";

    await claim.save();

    return claim;
};
