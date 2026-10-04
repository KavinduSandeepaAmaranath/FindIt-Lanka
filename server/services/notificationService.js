import Notification from "../models/Notification.js";

// Helper function to calculate date group ("Today", "Yesterday", "Earlier")
const getDateGroup = (date) => {
  const now = new Date();
  const target = new Date(date);

  const isSameDay =
    now.getFullYear() === target.getFullYear() &&
    now.getMonth() === target.getMonth() &&
    now.getDate() === target.getDate();

  if (isSameDay) return "Today";

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday =
    yesterday.getFullYear() === target.getFullYear() &&
    yesterday.getMonth() === target.getMonth() &&
    yesterday.getDate() === target.getDate();

  if (isYesterday) return "Yesterday";

  return "Earlier";
};

// Helper function to format date string ("Sep 20, 2026")
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

// Helper function to format time string ("10:15 AM")
const formatTime = (date) => {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export const getUserNotifications = async (userId) => {
  const rawNotifications = await Notification.find({ userId })
    .sort({ createdAt: -1 })
    .populate("lostItemId", "title category district images status")
    .populate("foundItemId", "title category district images status")
    .populate("claimId", "status createdAt");

  return rawNotifications.map((doc) => {
    const n = doc.toObject();
    const createdAt = n.createdAt || new Date();

    let category = n.category || "matches";
    let tone = n.tone || "blue";
    let icon = n.icon || "search";
    let actionLabel = n.actionLabel || "View Details";

    if (n.type === "match") {
      category = "matches";
      tone = "blue";
      icon = "search";
      actionLabel = "View Item";
    } else if (n.type === "claim") {
      category = "claims";
      tone = "green";
      icon = "shield";
      actionLabel = "View Claim";
    } else if (n.type === "approval") {
      category = "reports";
      tone = "blue";
      icon = "report";
      actionLabel = "View Report";
    } else if (n.type === "rejection") {
      category = "reports";
      tone = "red";
      icon = "reject";
      actionLabel = "View Report";
    } else if (n.type === "found") {
      category = "found";
      tone = "green";
      icon = "box";
      actionLabel = "Review Claim";
    } else if (n.type === "system") {
      category = "system";
      tone = "gray";
      icon = "message";
      actionLabel = "Open Chat";
    }

    return {
      ...n,
      id: n._id.toString(),
      description: n.message || n.description,
      category,
      tone,
      icon,
      actionLabel,
      group: getDateGroup(createdAt),
      date: formatDate(createdAt),
      time: formatTime(createdAt),
    };
  });
};

export const markAsRead = async (notificationId, userId) => {
  const notification = await Notification.findOne({
    _id: notificationId,
    userId,
  });

  if (!notification) {
    throw new Error("Notification not found");
  }

  notification.isRead = true;
  await notification.save();
  return notification;
};

export const markAllAsRead = async (userId) => {
  await Notification.updateMany({ userId, isRead: false }, { isRead: true });
  return { success: true };
};

export const deleteNotification = async (notificationId, userId) => {
  const result = await Notification.deleteOne({ _id: notificationId, userId });
  if (result.deletedCount === 0) {
    throw new Error("Notification not found");
  }
  return { success: true };
};

export const createNotification = async (data) => {
  return await Notification.create(data);
};

export const createAutoMatchNotifications = async (lostItem, foundItem) => {
  const notifications = [];

  if (lostItem.userId) {
    notifications.push(
      Notification.create({
        userId: lostItem.userId,
        title: `Potential Match Found for '${lostItem.title}'!`,
        message: `A found item matching '${foundItem.title}' in ${foundItem.district || "your area"} was submitted. View item details to verify and claim.`,
        type: "match",
        lostItemId: lostItem._id,
        foundItemId: foundItem._id,
      })
    );
  }

  if (foundItem.userId) {
    notifications.push(
      Notification.create({
        userId: foundItem.userId,
        title: `Matching Lost Item Found for '${foundItem.title}'!`,
        message: `A user reported a lost item matching '${lostItem.title}' in ${foundItem.district || "your area"}. They may claim it soon.`,
        type: "match",
        lostItemId: lostItem._id,
        foundItemId: foundItem._id,
      })
    );
  }

  return await Promise.all(notifications);
};

export const deleteAllNotifications = async (userId) => {
  await Notification.deleteMany({ userId });
  return { success: true };
};

export const sendAdminSystemMessage = async ({
  targetUserId,
  title = "Message from Admin",
  message,
  claimId,
  lostItemId,
  foundItemId,
}) => {
  return await createNotification({
    userId: targetUserId,
    title,
    message,
    type: "system",
    category: "system",
    tone: "gray",
    icon: "message",
    actionLabel: "Open Chat",
    claimId,
    lostItemId,
    foundItemId,
  });
};
