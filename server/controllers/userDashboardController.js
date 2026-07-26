import {
    getDashboardProfile,
    getDashboardStatistics,
    getMyDashboardLostItems,
    getMyDashboardFoundItems,
    getRecentDashboardActivities,
} from "../services/userDashboardService.js";

export const getDashboardProfileController = async (req, res) => {
    try {
        const profile = await getDashboardProfile(
            req.user.userId
        );

        res.status(200).json({
            success: true,
            profile,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

export const getDashboardStatisticsController = async (req, res) => {
    try {
        const statistics = await getDashboardStatistics(
            req.user.userId
        );

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

export const getMyDashboardLostItemsController = async (req, res) => {
    try {
        const lostItems = await getMyDashboardLostItems(
            req.user.userId
        );

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

export const getMyDashboardFoundItemsController = async (req, res) => {
    try {
        const foundItems = await getMyDashboardFoundItems(
            req.user.userId
        );

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

export const getRecentDashboardActivitiesController = async (req, res) => {
    try {
        const activities = await getRecentDashboardActivities(
            req.user.userId
        );

        res.status(200).json({
            success: true,
            activities,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};