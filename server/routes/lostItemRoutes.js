import express from "express";
import { create, getAllLostItemsController, getMyLostItemsController } from "../controllers/lostItemController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, create);
router.post("/getAll", getAllLostItemsController);
router.post("/getMyItems", protect, getMyLostItemsController);

export default router;