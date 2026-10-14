import FoundItem from "../models/FoundItem.js";
import { createAutoMatchNotifications } from "./notificationService.js";
import LostItem from "../models/LostItem.js";
import Notification from "../models/Notification.js";

export const createLostItem = async ({
    title,
    category,
    description,
    district,
    location,
    lostDate,
    images,
    userId,
}) => {
    const lostItem = await LostItem.create({
        title,
        category,
        description,
        district,
        location,
        lostDate,
        images,
        userId,
    });

    // Matching is triggered upon Admin approval

    return lostItem;
};

export const getAllLostItems = async () => {
    return await LostItem.find({ approvalStatus: "approved" }).populate("userId", "name email phoneNumber district").sort({ createdAt: -1 });
};

export const getMyLostItems = async (userId) => {
    const items = await LostItem.find({ userId });
    try {
        const rejectedWithoutReason = items.filter(
            (it) => it.approvalStatus === "rejected" && !it.rejectionReason
        );
        if (rejectedWithoutReason.length > 0) {
            const itemIds = rejectedWithoutReason.map((it) => it._id);
            const notifs = await Notification.find({
                userId,
                type: "rejection",
                lostItemId: { $in: itemIds },
            }).sort({ createdAt: -1 });

            const reasonMap = {};
            for (const notif of notifs) {
                if (notif.lostItemId && !reasonMap[notif.lostItemId.toString()]) {
                    if (notif.message && !notif.message.startsWith("Your lost item report (")) {
                        reasonMap[notif.lostItemId.toString()] = notif.message;
                    }
                }
            }

            return items.map((it) => {
                const doc = it.toObject ? it.toObject() : { ...it };
                if (doc.approvalStatus === "rejected" && !doc.rejectionReason && reasonMap[doc._id.toString()]) {
                    doc.rejectionReason = reasonMap[doc._id.toString()];
                    LostItem.updateOne({ _id: doc._id }, { rejectionReason: doc.rejectionReason }).catch(() => {});
                }
                return doc;
            });
        }
    } catch (err) {
        console.error("Error looking up rejection reasons for lost items:", err);
    }
    return items;
};

export const getLostItemById = async (itemId) => {
    const lostItem = await LostItem.findById(itemId);

    if (!lostItem) {
        throw new Error("Lost item not found");
    }

    if (lostItem.approvalStatus === "rejected" && !lostItem.rejectionReason) {
        try {
            const notif = await Notification.findOne({
                type: "rejection",
                lostItemId: lostItem._id,
            }).sort({ createdAt: -1 });
            if (notif && notif.message && !notif.message.startsWith("Your lost item report (")) {
                const doc = lostItem.toObject ? lostItem.toObject() : { ...lostItem };
                doc.rejectionReason = notif.message;
                LostItem.updateOne({ _id: lostItem._id }, { rejectionReason: doc.rejectionReason }).catch(() => {});
                return doc;
            }
        } catch (e) {}
    }

    return lostItem;
};

export const getSingleLostItem = async (itemId, userId) => {
    const lostItem = await LostItem.findOne({
        _id: itemId,
        userId,
    });

    if (!lostItem) {
        throw new Error("Lost item not found");
    }

    if (lostItem.approvalStatus === "rejected" && !lostItem.rejectionReason) {
        try {
            const notif = await Notification.findOne({
                userId,
                type: "rejection",
                lostItemId: lostItem._id,
            }).sort({ createdAt: -1 });
            if (notif && notif.message && !notif.message.startsWith("Your lost item report (")) {
                const doc = lostItem.toObject ? lostItem.toObject() : { ...lostItem };
                doc.rejectionReason = notif.message;
                LostItem.updateOne({ _id: lostItem._id }, { rejectionReason: doc.rejectionReason }).catch(() => {});
                return doc;
            }
        } catch (e) {}
    }

    return lostItem;
};

export const updateLostItem = async (itemId, userId, updateData) => {
    const existing = await LostItem.findOne({
        _id: itemId,
        userId,
    });

    if (!existing) {
        throw new Error("Lost item not found or unauthorized");
    }

    // If item was rejected or pending, reset approvalStatus to "pending" and clear rejectionReason
    const wasRejected = existing.approvalStatus === "rejected";
    if (wasRejected || existing.approvalStatus === "pending") {
        updateData.approvalStatus = "pending";
        updateData.rejectionReason = "";
    }

    const lostItem = await LostItem.findOneAndUpdate({
        _id: itemId,
        userId,            
    },
    updateData,
    {
        new: true,
        runValidators: true,
    });

    if (lostItem) {
        lostItem._wasRejected = wasRejected;
    }

    return lostItem;
};

export const deleteLostItem = async (itemId, userId) => {
    const lostItem = await LostItem.findOneAndDelete({
        _id: itemId,
        userId,
    });

    if (!lostItem) {
        throw new Error("Lost item not found");
    }

    return lostItem;
};

export const markLostItemAsRecovered = async (itemId, userId) => {
    const lostItem = await LostItem.findOne({
        _id: itemId,
        userId,
    });

    if (!lostItem) {
        throw new Error("Lost item not found or unauthorized");
    }

    if (lostItem.status !== "lost") {
        throw new Error("Only lost items can be marked as recovered");
    }

    lostItem.status = "recovered";

    await lostItem.save();

    return lostItem;
};

export const getRecentLostItems = async () => {
    return await LostItem.find({
        status: "lost",
        approvalStatus: "approved",
    })
    .select(
        "title category district lostDate images createdAt"
    )
    .sort({
        createdAt: -1,
    })
    .limit(6);
};