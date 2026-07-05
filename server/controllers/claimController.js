import { createClaim } from "../services/claimService.js";

export const createClaimController = async (req, res) => {
    try {
        const claim = await createClaim({
            ...req.body,
            claimantId: req.user.userId,
        });

        res.status(201).json({
            success: true,
            message: "Claim created successfully",
            claim,
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};