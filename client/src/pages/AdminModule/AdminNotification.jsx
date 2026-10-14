import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

import AdminNavBar from "../../components/AdminDashboard/AdminNavBar";

import HeaderSec from "../../components/AdminDashboard/AdminNotification/HeaderSec";
import NotificationCards from "../../components/AdminDashboard/AdminNotification/NotificationCards";
import NotificationFilters from "../../components/AdminDashboard/AdminNotification/NotificationFilters";
import NotificationList from "../../components/AdminDashboard/AdminNotification/NotificationList";

import Footer from "../../components/Footer";

import {
  fetchAdminNotifications,
  markAllAdminNotificationsAsReadApi,
} from "../../services/notificationService";

const AdminNotification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadNotifications = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchAdminNotifications();
      if (data && data.success && Array.isArray(data.notifications)) {
        setNotifications(data.notifications);
      } else {
        setNotifications([]);
      }
    } catch (err) {
      console.error("Error loading admin notifications:", err);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  /* Mark all as read */
  const handleMarkAllRead = async () => {
    setNotifications((previous) =>
      previous.map((notification) => ({
        ...notification,
        read: true,
        isRead: true,
      }))
    );

    try {
      await markAllAdminNotificationsAsReadApi();
    } catch (err) {
      console.error("Failed to mark all admin notifications as read:", err);
    }
  };

  return (
    <div
      className="
        min-h-screen
        flex
        flex-col
        bg-gray-50
      "
    >
      {/* Main area */}
      <div className="flex flex-1">
        {/* Nav */}
        <AdminNavBar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />

        {/* Content */}
        <motion.main
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="
            flex-1
            overflow-x-hidden
            p-4
            sm:p-6
            lg:p-8
          "
        >
          {/* Header */}
          <HeaderSec
            setIsOpen={setIsOpen}
            onMarkAllRead={handleMarkAllRead}
          />

          {/* Cards */}
          <section className="mt-6">
            <NotificationCards
              notifications={notifications}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
            />
          </section>

          {/* Filters */}
          <section className="mt-8">
            <NotificationFilters
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
            />
          </section>

          {/* Notification List */}
          <section className="mt-8">
            <NotificationList
              searchValue={searchValue}
              activeFilter={activeFilter}
              notifications={notifications}
              setNotifications={setNotifications}
              loading={loading}
            />
          </section>
        </motion.main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AdminNotification;