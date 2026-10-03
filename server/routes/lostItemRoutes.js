import express from "express";
import { 
    create, 
    getAllLostItemsController, 
    getLostItemByIdController, 
    getMyLostItemsController, 
    getSingleLostItemController, 
    markAsRecovered, 
    getRecentLostItemsController,
    remove, 
    update 
} from "../controllers/lostItemController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/create", protect, upload.array("images", 10), create);
router.get("/all", getAllLostItemsController);
router.get("/my-items", protect, getMyLostItemsController);
router.get("/my-items/:id", protect, getSingleLostItemController);
router.get("/:id", getLostItemByIdController);
router.get("/lost-items/recent", getRecentLostItemsController);
router.put("/:id", protect, update);
router.delete("/:id", protect, remove);
router.patch("/:id/recover", protect, markAsRecovered);

export default router;