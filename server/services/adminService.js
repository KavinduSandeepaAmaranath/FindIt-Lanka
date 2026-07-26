import User from "../models/User.js";
import LostItem from "../models/LostItem.js";
import FoundItem from "../models/FoundItem.js";

/* Dashboard */
export const getDashboardStatistics = async () => {
    const [
        totalUsers,
        totalLostItems,
        totalFoundItems,
        pendingLostItems,
        pendingFoundItems,
        recoveredItems,
        returnedItems,
    ] = await Promise.all([
        User.countDocuments(),

        LostItem.countDocuments(),

        FoundItem.countDocuments(),

        LostItem.countDocuments({
            approvalStatus: "pending",
        }),

        FoundItem.countDocuments({
            approvalStatus: "pending",
        }),

        LostItem.countDocuments({
            approvalStatus: "rejected",
        }),

        FoundItem.countDocuments({
            approvalStatus: "rejected",
        }),
    ]);

    return {
        totalUsers,
        totalLostItems,
        totalFoundItems,
        pendingLostItems,
        pendingFoundItems,
        recoveredItems,
        returnedItems,
    };
};

export const getTopLocations = async () => {
    const [lostLocations, foundLocations] = await Promise.all([
        LostItem.aggregate([
            {
                $match: {
                    approvalStatus: "approved",
                },
            },
            {
                $group: {
                    _id: "$district",
                    totalReports: {
                        $sum: 1,
                    },
                },
            },
        ]),

        FoundItem.aggregate([
            {
                $match: {
                    approvalStatus: "approved",
                },
            },
            {
                $group: {
                    _id: "$district",
                    totalReports: {
                        $sum: 1,
                    },
                },
            },
        ]),
    ]);

    const locationMap = new Map();

    [...lostLocations, ...foundLocations].forEach((location) => {
        if (locationMap.has(location._id)) {
            locationMap.get(location._id).totalReports += location.totalReports;
        } else {
            locationMap.set(location._id, {
                _id: location._id,
                totalReports: location.totalReports,
            });
        }
    });

    return Array.from(locationMap.values())
        .sort((a, b) => b.totalReports - a.totalReports)
        .slice(0, 5);
};

export const getRecentActivities = async () => {
    const [users, lostItems, foundItems] = await Promise.all([
        User.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select("name createdAt"),

        LostItem.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select("title createdAt"),

        FoundItem.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select("title createdAt"),
    ]);

    const activities = [];

    users.forEach((user) => {
        activities.push({
            type: "user",
            title: `${user.name} registered`,
            createdAt: user.createdAt,
        });
    });

    lostItems.forEach((item) => {
        activities.push({
            type: "lost",
            title: `Lost report: ${item.title}`,
            createdAt: item.createdAt,
        });
    });

    foundItems.forEach((item) => {
        activities.push({
            type: "found",
            title: `Found report: ${item.title}`,
            createdAt: item.createdAt,
        });
    });

    activities.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    return activities.slice(0, 10);
};

export const getReportsByCategory = async () => {
    const [lostReports, foundReports] = await Promise.all([
        LostItem.aggregate([
            {
                $match: {
                    approvalStatus: "approved",
                },
            },
            {
                $group: {
                    _id: "$category",
                    total: {
                        $sum: 1,
                    },
                },
            },
        ]),

        FoundItem.aggregate([
            {
                $match: {
                    approvalStatus: "approved",
                },
            },
            {
                $group: {
                    _id: "$category",
                    total: {
                        $sum: 1,
                    },
                },
            },
        ]),
    ]);

    const categoryMap = new Map();

    [...lostReports, ...foundReports].forEach((item) => {
        if (categoryMap.has(item._id)) {
            categoryMap.get(item._id).total += item.total;
        } else {
            categoryMap.set(item._id, {
                category: item._id,
                total: item.total,
            });
        }
    });

    return Array.from(categoryMap.values()).sort(
        (a, b) => b.total - a.total
    );
};

export const getReportOverview = async () => {
    const [lostReports, foundReports] = await Promise.all([
        LostItem.aggregate([
            {
                $match: {
                    approvalStatus: "approved",
                },
            },
            {
                $group: {
                    _id: {
                        month: {
                            $month: "$createdAt",
                        },
                    },
                    lost: {
                        $sum: 1,
                    },
                },
            },
        ]),

        FoundItem.aggregate([
            {
                $match: {
                    approvalStatus: "approved",
                },
            },
            {
                $group: {
                    _id: {
                        month: {
                            $month: "$createdAt",
                        },
                    },
                    found: {
                        $sum: 1,
                    },
                },
            },
        ]),
    ]);

    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    const overviewMap = new Map();

    lostReports.forEach((item) => {
        overviewMap.set(item._id.month, {
            month: months[item._id.month - 1],
            lost: item.lost,
            found: 0,
        });
    });

    foundReports.forEach((item) => {
        if (overviewMap.has(item._id.month)) {
            overviewMap.get(item._id.month).found = item.found;
        } else {
            overviewMap.set(item._id.month, {
                month: months[item._id.month - 1],
                lost: 0,
                found: item.found,
            });
        }
    });

    return Array.from(overviewMap.values()).sort(
        (a, b) =>
            months.indexOf(a.month) -
            months.indexOf(b.month)
    );
};

/* Lost Item */
export const getPendingLostItems = async () => {
    return await LostItem.find({
        approvalStatus: "pending",
    })
    .populate(
        "userId",
        "name email phoneNumber"
    )
    .sort({
        createdAt: -1,
    });
};

export const approveLostItem = async (itemId) => {
    const lostItem = await LostItem.findById(itemId);

    if(!lostItem) {
        throw new Error("Lost item not Found");
    }
    if (lostItem.approvalStatus !== "pending") {
        throw new Error("Only pending lost items can be approved");
    }

    lostItem.approvalStatus = "approved";

    await lostItem.save();

    return lostItem;
};

export const rejectLostItem = async (itemId) => {
    const lostItem = await LostItem.findById(itemId);

    if(!lostItem) {
        throw new Error("Lost item not Found");
    }
    if (lostItem.approvalStatus !== "pending") {
        throw new Error("Only pending lost items can be rejected");
    }

    lostItem.approvalStatus = "rejected";

    await lostItem.save();

    return lostItem;
};

export const getAllLostItemsForAdmin = async () => {
    return await LostItem.find()
        .populate("userId", "name email phoneNumber")
        .sort({
            createdAt: -1,
        });
};

export const getLostItemDetails = async (itemId) => {
    const lostItem = await LostItem.findById(itemId)
        .populate("userId", "name email phoneNumber district");

    if (!lostItem) {
        throw new Error("Lost item not found");
    }

    return lostItem;
};

export const deleteLostItemByAdmin = async (itemId) => {
    const lostItem = await LostItem.findByIdAndDelete(itemId);

    if (!lostItem) {
        throw new Error("Lost item not found");
    }

    return lostItem;
};

/* Found Item */
export const getPendingFoundItems = async () => {
    return await FoundItem.find({
        approvalStatus: "pending",
    })
    .populate(
        "userId",
        "name email phoneNumber"
    )
    .sort({
        createdAt: -1,
    });
};

export const approveFoundItem = async (itemId) => {
    const foundItem = await FoundItem.findById(itemId);

    if(!foundItem) {
        throw new Error("Found item not Found");
    }
    if (foundItem.approvalStatus !== "pending") {
        throw new Error("Only pending found items can be approved");
    }

    foundItem.approvalStatus = "approved";

    await foundItem.save();

    return foundItem;
};

export const rejectFoundItem = async (itemId) => {
    const foundItem = await FoundItem.findById(itemId);

    if(!foundItem) {
        throw new Error("Found item not Found");
    }
    if (foundItem.approvalStatus !== "pending") {
        throw new Error("Only pending found items can be rejected");
    }

    foundItem.approvalStatus = "rejected";

    await foundItem.save();

    return foundItem;
};

export const getAllFoundItemsForAdmin = async () => {
    return await FoundItem.find()
        .populate("userId", "name email phoneNumber")
        .sort({
            createdAt: -1,
        });
};

export const getFoundItemDetails = async (itemId) => {
    const foundItem = await FoundItem.findById(itemId)
        .populate("userId", "name email phoneNumber district");

    if (!foundItem) {
        throw new Error("Found item not found");
    }

    return foundItem;
};

export const deleteFoundItemByAdmin = async (itemId) => {
    const foundItem = await FoundItem.findByIdAndDelete(itemId);

    if (!foundItem) {
        throw new Error("Found item not found");
    }

    return foundItem;
};

/* User */
export const getAllUsers = async () => {
    return await User.find({
        role: "user",
    })
        .select("-password -refreshToken")
        .sort({
            createdAt: -1,
        });
};

export const getUserById = async (userId) => {
    const user = await User.findById(userId)
        .select("-password -refreshToken");

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};

export const suspendUser = async (userId) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    if (user.status === "suspended") {
        throw new Error("User is already suspended");
    }

    user.status = "suspended";

    await user.save();

    return user;
};

export const activateUser = async (userId) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    if (user.status === "active") {
        throw new Error("User is already active");
    }

    user.status = "active";

    await user.save();

    return user;
};

export const updateUserRole = async (userId, role) => {
    if (!["user", "admin"].includes(role)) {
        throw new Error("Invalid role");
    }

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    user.role = role;

    await user.save();

    return user;
};

export const deleteUser = async (userId) => {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};