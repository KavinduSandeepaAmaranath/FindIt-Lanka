import express from "express";
import { create, getAllLostItemsController } from "../controllers/lostItemController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, create);
router.post("/getAll", getAllLostItemsController);

export default router;