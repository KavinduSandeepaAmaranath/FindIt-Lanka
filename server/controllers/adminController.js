import {
    getDashboardStatistics,
    getPendingLostItems,
    approveLostItem,
    rejectLostItem,
    getAllLostItemsForAdmin,
    getLostItemDetails,
    deleteLostItemByAdmin,

    getPendingFoundItems,
    approveFoundItem,
    rejectFoundItem,
    getAllFoundItemsForAdmin,
    getFoundItemDetails,
    deleteFoundItemByAdmin,

    getAllUsers,
    getUserById,
    suspendUser,
    activateUser,
    updateUserRole,
    deleteUser,
} from "../services/adminService.js";

/* Dashboard */
export const getDashboardStatisticsController = async (req, res) => {
    try {
        const statistics = await getDashboardStatistics();

        res.status(200).json({
            success: true,
            statistics,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/* Lost Item */
export const getPendingLostItemsController = async (req, res) => {
    try {
        const lostItems = await getPendingLostItems();

        res.status(200).json({
            success: true,
            count: lostItems.length,
            lostItems,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const approveLostItemController = async (req, res) => {
    try {
        const lostItem = await approveLostItem(req.params.id);

        res.status(200).json({
            success: true,
            message: "Lost item approved successfully.",
            lostItem,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const rejectLostItemController = async (req, res) => {
    try {
        const lostItem = await rejectLostItem(req.params.id);

        res.status(200).json({
            success: true,
            message: "Lost item rejected successfully.",
            lostItem,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAllLostItemsForAdminController = async (req, res) => {
    try {
        const lostItems = await getAllLostItemsForAdmin();

        res.status(200).json({
            success: true,
            count: lostItems.length,
            lostItems,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getLostItemDetailsController = async (req, res) => {
    try {
        const lostItem = await getLostItemDetails(req.params.id);

        res.status(200).json({
            success: true,
            lostItem,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteLostItemByAdminController = async (req, res) => {
    try {
        await deleteLostItemByAdmin(req.params.id);

        res.status(200).json({
            success: true,
            message: "Lost item deleted successfully.",
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

/* Found Item */
export const getPendingFoundItemsController = async (req, res) => {
    try {
        const foundItems = await getPendingFoundItems();

        res.status(200).json({
            success: true,
            count: foundItems.length,
            foundItems,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const approveFoundItemController = async (req, res) => {
    try {
        const foundItem = await approveFoundItem(req.params.id);

        res.status(200).json({
            success: true,
            message: "Found item approved successfully.",
            foundItem,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const rejectFoundItemController = async (req, res) => {
    try {
        const foundItem = await rejectFoundItem(req.params.id);

        res.status(200).json({
            success: true,
            message: "Found item rejected successfully.",
            foundItem,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAllFoundItemsForAdminController = async (req, res) => {
    try {
        const foundItems = await getAllFoundItemsForAdmin();

        res.status(200).json({
            success: true,
            count: foundItems.length,
            foundItems,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getFoundItemDetailsController = async (req, res) => {
    try {
        const foundItem = await getFoundItemDetails(req.params.id);

        res.status(200).json({
            success: true,
            foundItem,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteFoundItemByAdminController = async (req, res) => {
    try {
        await deleteFoundItemByAdmin(req.params.id);

        res.status(200).json({
            success: true,
            message: "Found item deleted successfully.",
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

/* User */
export const getAllUsersController = async (req, res) => {
    try {
        const users = await getAllUsers();

        res.status(200).json({
            success: true,
            count: users.length,
            users,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getUserByIdController = async (req, res) => {
    try {
        const user = await getUserById(req.params.id);

        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

export const suspendUserController = async (req, res) => {
    try {
        const user = await suspendUser(req.params.id);

        res.status(200).json({
            success: true,
            message: "User suspended successfully.",
            user,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const activateUserController = async (req, res) => {
    try {
        const user = await activateUser(req.params.id);

        res.status(200).json({
            success: true,
            message: "User activated successfully.",
            user,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateUserRoleController = async (req, res) => {
    try {
        const { role } = req.body;

        const user = await updateUserRole(req.params.id, role);

        res.status(200).json({
            success: true,
            message: "User role updated successfully.",
            user,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteUserController = async (req, res) => {
    try {
        await deleteUser(req.params.id);

        res.status(200).json({
            success: true,
            message: "User deleted successfully.",
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};