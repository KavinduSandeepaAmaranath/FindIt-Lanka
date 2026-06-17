import express from "express";
import { create } from "../controllers/lostItemController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/createLostItem", protect, create);

export default router;