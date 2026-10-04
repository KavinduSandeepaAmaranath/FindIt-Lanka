import { createContext, useContext, useState, useEffect } from "react";
import { notificationsData as defaultNotificationsData } from "../data/notificationData";
import {
  fetchNotifications,
  markNotificationAsReadApi,
  markAllNotificationsAsReadApi,
  deleteNotificationApi,
  deleteAllNotificationsApi,
} from "../services/notificationService";

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(defaultNotificationsData);
  const [loading, setLoading] = useState(true);

  // Fetch real notifications from backend on mount
  const loadNotifications = async () => {
    try {
      const token = localStorage.getItem("accessToken") || localStorage.getItem("token");
      if (token) {
        const data = await fetchNotifications();
        if (data && data.success && Array.isArray(data.notifications)) {
          setNotifications(data.notifications);
        }
      }
    } catch (err) {
      console.warn("Using fallback notification data:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const hasUnread = unreadCount > 0;

  const markAsRead = async (id) => {
    // Optimistic UI update
    setNotifications((prev) =>
      prev.map((n) => (n.id === id || n._id === id ? { ...n, isRead: true } : n))
    );
    try {
      await markNotificationAsReadApi(id);
    } catch (err) {
      console.error("Error marking notification read:", err);
    }
  };

  const markAllAsRead = async () => {
    // Optimistic UI update
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    try {
      await markAllNotificationsAsReadApi();
    } catch (err) {
      console.error("Error marking all notifications read:", err);
    }
  };

  const deleteNotification = async (id) => {
    // Optimistic UI update
    setNotifications((prev) => prev.filter((n) => n.id !== id && n._id !== id));
    try {
      await deleteNotificationApi(id);
    } catch (err) {
      console.error("Error deleting notification:", err);
    }
  };

  const deleteAllNotifications = async () => {
    // Optimistic UI update
    setNotifications([]);
    try {
      await deleteAllNotificationsApi();
    } catch (err) {
      console.error("Error deleting all notifications:", err);
    }
  };

  const refreshNotifications = () => {
    loadNotifications();
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        setNotifications,
        unreadCount,
        hasUnread,
        loading,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        deleteAllNotifications,
        refreshNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    const unread = defaultNotificationsData.filter((n) => !n.isRead).length;
    return {
      notifications: defaultNotificationsData,
      setNotifications: () => {},
      unreadCount: unread,
      hasUnread: unread > 0,
      loading: false,
      markAsRead: () => {},
      markAllAsRead: () => {},
      deleteNotification: () => {},
      deleteAllNotifications: () => {},
      refreshNotifications: () => {},
    };
  }
  return context;
}

export default NotificationContext;
