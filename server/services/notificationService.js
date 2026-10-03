import Notification from "../models/Notification.js";

export const getUserNotifications = async (userId) => {
  return await Notification.find({ userId })
    .sort({ createdAt: -1 })
    .populate("lostItemId", "title category district images")
    .populate("foundItemId", "title category district images");
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
        message: `A user reported a lost item matching '${lostItem.title}' in ${lostItem.district || "your area"}. They may claim it soon.`,
        type: "match",
        lostItemId: lostItem._id,
        foundItemId: foundItem._id,
      })
    );
  }

  return await Promise.all(notifications);
};
