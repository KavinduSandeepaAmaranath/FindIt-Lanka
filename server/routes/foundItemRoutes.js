import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { 
    create, 
    getAllFoundItemsController, 
    getFoundItemByIdController, 
    getMyFoundItemsController, 
    getSingleFoundItemController, 
    markAsReturned, 
    getRecentFoundItemsController,
    remove, 
    update 
} from "../controllers/foundItemController.js";

const router = express.Router();

router.post("/create", protect, create);
router.get("/all", getAllFoundItemsController);
router.get("/my-items", protect, getMyFoundItemsController);
router.get("/my-items/:id", protect, getSingleFoundItemController);
router.get("/:id", getFoundItemByIdController);
router.get("/found-items/recent", getRecentFoundItemsController);
router.put("/:id", protect, update);
router.delete("/:id", protect, remove);
router.patch("/:id/return", protect, markAsReturned);

export default router;