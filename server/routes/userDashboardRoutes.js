import express from "express";

import {
    getDashboardProfileController,
    getDashboardStatisticsController,
    getMyDashboardLostItemsController,
    getMyDashboardFoundItemsController,
    getRecentDashboardActivitiesController,
} from "../controllers/userDashboardController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", protect, getDashboardProfileController);
router.get("/statistics", protect, getDashboardStatisticsController);
router.get("/lost-items", protect, getMyDashboardLostItemsController);
router.get("/found-items", protect, getMyDashboardFoundItemsController);
router.get("/recent-activities", protect, getRecentDashboardActivitiesController);

export default router;