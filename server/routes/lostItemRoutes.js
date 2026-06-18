import express from "express";
import { create, getAllLostItemsController, getLostItemByIdController, getMyLostItemsController, getSingleLostItemController } from "../controllers/lostItemController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, create);

router.get("/all", getAllLostItemsController);
router.get("/my-items", protect, getMyLostItemsController);
router.get("/my-items/:id", protect, getSingleLostItemController);
router.get("/:id", getLostItemByIdController);

export default router;