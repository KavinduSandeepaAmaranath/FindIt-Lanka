import express from "express";
import { 
    createClaimController,
    getAllClaimsController,
    getMyClaimsController,
    getClaimsForFoundItemController, 
} from "../controllers/claimController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createClaimController);
router.get("/All", getAllClaimsController);
router.get("/my", protect, getMyClaimsController);
router.get("/claims-item/:id", getClaimsForFoundItemController);

export default router;