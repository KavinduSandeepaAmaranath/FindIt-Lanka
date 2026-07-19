import express from "express";

import {
    getDashboardStatisticsController,

    getPendingLostItemsController,
    approveLostItemController,
    rejectLostItemController,
    getAllLostItemsForAdminController,
    getLostItemDetailsController,
    deleteLostItemByAdminController,

    getPendingFoundItemsController,
    approveFoundItemController,
    rejectFoundItemController,
    getAllFoundItemsForAdminController,
    getFoundItemDetailsController,
    deleteFoundItemByAdminController,

    getAllUsersController,
    getUserByIdController,
    suspendUserController,
    activateUserController,
    updateUserRoleController,
    deleteUserController,
} from "../controllers/adminController.js";

import {
    protect,
    adminOnly,
} from "../middleware/authMiddleware.js";

const router = express.Router();

/* Dashboard Route */
router.get("/dashboard", protect, adminOnly, getDashboardStatisticsController);

/* Lost Items */
router.get("/lost-items/pending", protect, adminOnly, getPendingLostItemsController);
router.patch("/lost-items/:id/approve", protect, adminOnly, approveLostItemController);
router.patch("/lost-items/:id/reject", protect, adminOnly, rejectLostItemController);
router.get("/lost-items", protect, adminOnly, getAllLostItemsForAdminController);
router.get("/lost-items/:id", protect, adminOnly, getLostItemDetailsController);
router.delete("/lost-items/:id", protect, adminOnly, deleteLostItemByAdminController);

/* Found Item */
router.get("/found-items/pending", protect, adminOnly, getPendingFoundItemsController);
router.patch("/found-items/:id/approve", protect, adminOnly, approveFoundItemController);
router.patch("/found-items/:id/reject", protect, adminOnly, rejectFoundItemController);
router.get("/found-items", protect, adminOnly, getAllFoundItemsForAdminController);
router.get("/found-items/:id", protect, adminOnly, getFoundItemDetailsController);
router.delete("/found-items/:id", protect, adminOnly, deleteFoundItemByAdminController);

/* User */
router.get("/users", protect, adminOnly, getAllUsersController);
router.get("/users/:id", protect, adminOnly, getUserByIdController);
router.patch("/users/:id/suspend", protect, adminOnly, suspendUserController);
router.patch("/users/:id/activate", protect, adminOnly, activateUserController);
router.patch("/users/:id/role", protect, adminOnly, updateUserRoleController);
router.delete("/users/:id", protect, adminOnly, deleteUserController);

export default router;