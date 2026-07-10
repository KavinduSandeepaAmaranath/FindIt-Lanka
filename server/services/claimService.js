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