import express from "express";
import {
  getUserNotificationsController,
  markAsReadController,
  markAllAsReadController,
  deleteNotificationController,
} from "../controllers/notificationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getUserNotificationsController);
router.patch("/read-all", protect, markAllAsReadController);
router.patch("/:id/read", protect, markAsReadController);
router.delete("/:id", protect, deleteNotificationController);

export default router;
