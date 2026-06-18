import express from "express";
import { create, getAllLostItemsController, getLostItemByIdController, getMyLostItemsController } from "../controllers/lostItemController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, create);
router.post("/getAll", getAllLostItemsController);
router.post("/getMyItems", protect, getMyLostItemsController);

router.get("/getItemById/:id", getLostItemByIdController);

export default router;