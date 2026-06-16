import express from "express";
import { } from "../controllers/lostItemController.js";
import { protect } from "../middleware/authMiddleware.js";
import { createLostItem } from "../services/lostItemService";

const router = express.Router();

router.post("/createLostItem", protect, createLostItem);

export default router;