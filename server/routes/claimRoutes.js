import express from "express";
import { 
    createClaimController,
    getAllClaimsController,
    getMyClaimsController,
    getClaimsForFoundItemController, 
    approveClaimController,
    rejectClaimController,
    cancelClaimController,
} from "../controllers/claimController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createClaimController);
router.get("/All", getAllClaimsController);
router.get("/my", protect, getMyClaimsController);
router.get("/:id/claims-item", getClaimsForFoundItemController);
router.patch("/:id/approve", protect, approveClaimController);
router.patch("/:id/reject", protect, rejectClaimController);
router.patch("/:id/cancel", protect, cancelClaimController);

export default router;