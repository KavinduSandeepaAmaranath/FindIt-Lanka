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

export const getPendingLostItems = async () => {
    return await LostItem.find({
        approvalStatus: "pending",
    }).sort({
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
    }).sort({
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