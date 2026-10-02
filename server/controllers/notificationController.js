import {
  getUserNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from "../services/notificationService.js";

export const getUserNotificationsController = async (req, res) => {
  try {
    const notifications = await getUserNotifications(req.user.userId);
    const unreadCount = notifications.filter((n) => !n.isRead).length;

    res.status(200).json({
      success: true,
      unreadCount,
      count: notifications.length,
      notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const markAsReadController = async (req, res) => {
  try {
    const notification = await markAsRead(req.params.id, req.user.userId);
    res.status(200).json({
      success: true,
      notification,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const markAllAsReadController = async (req, res) => {
  try {
    await markAllAsRead(req.user.userId);
    res.status(200).json({
      success: true,
      message: "All notifications marked as read",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteNotificationController = async (req, res) => {
  try {
    await deleteNotification(req.params.id, req.user.userId);
    res.status(200).json({
      success: true,
      message: "Notification deleted",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
