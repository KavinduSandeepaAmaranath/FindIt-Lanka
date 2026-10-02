import Claim from "../models/Claim.js";
import LostItem from "../models/LostItem.js";
import FoundItem from "../models/FoundItem.js";

export const createClaim = async ({
    claimantId,
    foundItemId,
    lostItemId,
    message,
}) => {
    const lostItem = await LostItem.findOne({
        _id: lostItemId,
        userId: claimantId,
    });
    if (!lostItem) {
        throw new Error("Lost item not found");
    }

    if (lostItem.status !== "lost") {
        throw new Error("This lost item is no longer active");
    }

    const foundItem = await FoundItem.findById(foundItemId);
    if (!foundItem) {
        throw new Error("Found item not found");
    }

    if (foundItem.userId.toString() === claimantId.toString()) {
        throw new Error("You cannot claim your own found item");
    }
    
    if (foundItem.status !== "found") {
        throw new Error("This item is no longer available for claiming");
    }

    const existingClaim = await Claim.findOne({
        claimantId,
        foundItemId,
        status: {
            $in: ["pending", "approved"],
        },
    });

    if (existingClaim) {
        throw new Error("You have already submitted a claim for this found item");
    }

    const claim = await Claim.create({
        claimantId,
        foundItemId,
        lostItemId,
        message,
    });

    return claim;

};

export const getAllClaims = async () => {
    return await Claim.find()
    .populate("claimantId")
    .populate("foundItemId")
    .populate("lostItemId");
};

export const getMyClaims = async (claimantId) => {
    return await Claim.find({ claimantId })
    .populate("claimantId")
    .populate("foundItemId")
    .populate("lostItemId");
};

export const getClaimsForFoundItem = async (foundItemId) => {
    const claims = await Claim.find({ foundItemId })
    .populate("claimantId")
    .populate("foundItemId")
    .populate("lostItemId");

    if(claims.length === 0) {
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
    if (foundItem.userId.toString() !== userId.toString()) {
        throw new Error("You are not authorized to approve this claim");
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
    if (foundItem.userId.toString() !== userId.toString()) {
        throw new Error("You are not authorized to reject this claim");
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

    if(!claim) {
        throw new Error("Claim not found");
    }
    if(claim.claimantId.toString() !== userId.toString()) {
        throw new Error("You are not authorized to cancel this claim");
    }
    if(claim.status !== "pending") {
        throw new Error("Only pending claims can be cancelled");
    }

    claim.status = "cancelled";

    await claim.save();

    return claim;
};