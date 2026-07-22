import User from "../models/User.js";
import LostItem from "../models/LostItem.js";
import FoundItem from "../models/FoundItem.js";

export const getDashboardProfile = async (userId) => {
    const user = await User.findById(userId)
        .select("name email district profileImage createdAt");

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};

export const getDashboardStatistics = async (userId) => {
    const [
        totalLostReports,
        totalFoundReports,
        activeLostReports,
        activeFoundReports,
        recoveredItems,
        returnedItems,
        user,
    ] = await Promise.all([
        LostItem.countDocuments({
            userId,
        }),

        FoundItem.countDocuments({
            userId,
        }),

        LostItem.countDocuments({
            userId,
            status: "lost",
            approvalStatus: "approved",
        }),

        FoundItem.countDocuments({
            userId,
            status: "found",
            approvalStatus: "approved",
        }),

        LostItem.countDocuments({
            userId,
            status: "recovered",
        }),

        FoundItem.countDocuments({
            userId,
            status: "returned",
        }),

        User.findById(userId)
            .select("createdAt"),
    ]);

    if (!user) {
        throw new Error("User not found");
    }

    return {
        totalReports:
            totalLostReports + totalFoundReports,

        totalLostReports,

        totalFoundReports,

        activeCases:
            activeLostReports + activeFoundReports,

        recoveredItems:
            recoveredItems + returnedItems,

        memberSince: user.createdAt,
    };
};

export const getMyDashboardLostItems = async (userId) => {
    return await LostItem.find({
        userId,
    })
        .sort({
            createdAt: -1,
        })
        .limit(6);
};

export const getMyDashboardFoundItems = async (userId) => {
    return await FoundItem.find({
        userId,
    })
        .sort({
            createdAt: -1,
        })
        .limit(6);
};

export const getRecentDashboardActivities = async (userId) => {
    const [lostItems, foundItems] = await Promise.all([
        LostItem.find({
            userId,
        })
            .sort({
                createdAt: -1,
            })
            .limit(5)
            .select("title createdAt"),

        FoundItem.find({
            userId,
        })
            .sort({
                createdAt: -1,
            })
            .limit(5)
            .select("title createdAt"),
    ]);

    const activities = [];

    lostItems.forEach((item) => {
        activities.push({
            type: "lost",
            title: `You reported a lost item: ${item.title}`,
            createdAt: item.createdAt,
        });
    });

    foundItems.forEach((item) => {
        activities.push({
            type: "found",
            title: `You reported a found item: ${item.title}`,
            createdAt: item.createdAt,
        });
    });

    activities.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    return activities.slice(0, 10);
};