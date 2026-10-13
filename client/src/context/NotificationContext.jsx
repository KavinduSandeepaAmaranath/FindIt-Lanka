import { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  fetchNotifications,
  fetchAdminNotifications,
  markNotificationAsReadApi,
  markAllNotificationsAsReadApi,
  markAllAdminNotificationsAsReadApi,
  deleteNotificationApi,
  deleteAllNotificationsApi,
} from "../services/notificationService";

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const getIsAdmin = () => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.role === "admin";
      }
    } catch {}
    return false;
  };

  // Fetch real notifications from backend based on user role
  const loadNotifications = useCallback(async () => {
    const token = localStorage.getItem("accessToken") || localStorage.getItem("token");
    if (!token) {
      setNotifications([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const isAdmin = getIsAdmin();
      const data = isAdmin ? await fetchAdminNotifications() : await fetchNotifications();
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

    // Listen for storage and window focus events
    const handleStorageChange = () => {
      loadNotifications();
    };

    const handleFocus = () => {
      loadNotifications();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("focus", handleFocus);

    // Auto-refresh notifications every 5 seconds if logged in
    const interval = setInterval(() => {
      const token = localStorage.getItem("accessToken") || localStorage.getItem("token");
      if (token) {
        const isAdmin = getIsAdmin();
        const fetcher = isAdmin ? fetchAdminNotifications : fetchNotifications;
        fetcher()
          .then((data) => {
            if (data && data.success && Array.isArray(data.notifications)) {
              setNotifications(data.notifications);
            }
          })
          .catch(() => {});
      }
    }, 5000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("focus", handleFocus);
      clearInterval(interval);
    };
  }, [loadNotifications]);

  const unreadCount = notifications.filter((n) => !n.isRead && !n.read).length;
  const hasUnread = unreadCount > 0;

  const markAsRead = async (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id || n._id === id ? { ...n, isRead: true, read: true } : n))
    );
    try {
      await markNotificationAsReadApi(id);
    } catch (err) {
      console.error("Error marking notification read:", err);
    }
  };

  const markAllAsRead = async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true, read: true })));
    try {
      const isAdmin = getIsAdmin();
      if (isAdmin) {
        await markAllAdminNotificationsAsReadApi();
      } else {
        await markAllNotificationsAsReadApi();
      }
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
