import { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  fetchNotifications,
  markNotificationAsReadApi,
  markAllNotificationsAsReadApi,
  deleteNotificationApi,
  deleteAllNotificationsApi,
} from "../services/notificationService";

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch real notifications from backend
  const loadNotifications = useCallback(async () => {
    const token = localStorage.getItem("accessToken") || localStorage.getItem("token");
    if (!token) {
      setNotifications([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await fetchNotifications();
      if (data && data.success && Array.isArray(data.notifications)) {
        setNotifications(data.notifications);
      } else {
        setNotifications([]);
      }
    } catch (err) {
      console.warn("Error loading notifications from backend API:", err.message);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNotifications();

    // Listen for storage events (e.g. login/logout token changes)
    const handleStorageChange = () => {
      loadNotifications();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [loadNotifications]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const hasUnread = unreadCount > 0;

  const markAsRead = async (id) => {
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
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    try {
      await markAllNotificationsAsReadApi();
    } catch (err) {
      console.error("Error marking all notifications read:", err);
    }
  };

  const deleteNotification = async (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id && n._id !== id));
    try {
      await deleteNotificationApi(id);
    } catch (err) {
      console.error("Error deleting notification:", err);
    }
  };

  const deleteAllNotifications = async () => {
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
    return {
      notifications: [],
      setNotifications: () => {},
      unreadCount: 0,
      hasUnread: false,
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
