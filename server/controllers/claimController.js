import Claim from "../models/Claim.js";
import { 
    createClaim, 
    getMyClaims,
    getAllClaims 
} from "../services/claimService.js";

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

export const getAllClaimsController = async (req, res) => {
    try {
        const claims = await getAllClaims();

        res.status(200).json({
            success: true,
            count: claims.length,
            claims,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
};

export const getMyClaimsController = async (req, res) => {
    try {
        const claims = await getMyClaims(req.user.userId);

        res.status(200).json({
            success: true,
            count: claims.length,
            claims,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};