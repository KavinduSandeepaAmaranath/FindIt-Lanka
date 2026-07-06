import express from "express";
import { 
    createClaimController,
    getMyClaimsController 
} from "../controllers/claimController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createClaimController);
router.get("/my", protect, getMyClaimsController);

export default router;