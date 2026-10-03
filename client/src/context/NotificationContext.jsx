//used for all pages bell icons 
import { createContext, useContext, useState, useEffect } from "react";
import { notificationsData as defaultNotificationsData } from "../data/notificationData";

const NotificationContext = createContext(null);

const STORAGE_KEY = "findit_lanka_notifications_state";

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (err) {
      console.error("Error reading notifications from localStorage:", err);
    }
    return defaultNotificationsData;
  });

  // Sync state with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
    } catch (err) {
      console.error("Error saving notifications to localStorage:", err);
    }
  }, [notifications]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const hasUnread = unreadCount > 0;

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const deleteAllNotifications = () => {
    setNotifications([]);
  };

  const resetNotifications = () => {
    setNotifications(defaultNotificationsData);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        setNotifications,
        unreadCount,
        hasUnread,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        deleteAllNotifications,
        resetNotifications,
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
      markAsRead: () => {},
      markAllAsRead: () => {},
      deleteNotification: () => {},
      deleteAllNotifications: () => {},
      resetNotifications: () => {},
    };
  }
  return context;
}

export default NotificationContext;
