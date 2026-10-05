import { useState } from "react";

import AdminNavBar from "../../components/AdminDashboard/AdminNavBar";

import HeaderSec from "../../components/AdminDashboard/AdminNotification/HeaderSec";
import NotificationCards from "../../components/AdminDashboard/AdminNotification/NotificationCards";
import NotificationFilters from "../../components/AdminDashboard/AdminNotification/NotificationFilters";
import NotificationList from "../../components/AdminDashboard/AdminNotification/NotificationList";

import Footer from "../../components/Footer";

import {
  notificationListData,
} from "../../data/AdminModuleData/AdminNotification";

const AdminNotification = () => {
  const [isOpen, setIsOpen] =
    useState(false);

  const [searchValue, setSearchValue] =
    useState("");

  const [activeFilter, setActiveFilter] =
    useState("All");

  const [notifications, setNotifications] =
    useState(notificationListData);

  /* =====================================================
     MARK ALL NOTIFICATIONS AS READ
  ===================================================== */

  const handleMarkAllRead = () => {
    setNotifications((previous) =>
      previous.map(
        (notification) => ({
          ...notification,
          read: true,
        })
      )
    );
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

      {/* =================================================
          MAIN AREA
      ================================================= */}

      <div className="flex flex-1">

        {/* =================================================
            ADMIN NAVBAR
        ================================================= */}

        <AdminNavBar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />

        {/* =================================================
            CONTENT
        ================================================= */}

        <main
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
            onMarkAllRead={
              handleMarkAllRead
            }
          />

          {/* Cards */}
          <section className="mt-6">
            <NotificationCards />
          </section>

          {/* Filters */}
          <section className="mt-8">
            <NotificationFilters
              searchValue={searchValue}
              setSearchValue={
                setSearchValue
              }
              activeFilter={
                activeFilter
              }
              setActiveFilter={
                setActiveFilter
              }
            />
          </section>

          {/* Notification List */}
          <section className="mt-8">
            <NotificationList
              searchValue={searchValue}
              activeFilter={
                activeFilter
              }
              notifications={
                notifications
              }
              setNotifications={
                setNotifications
              }
            />
          </section>

        </main>

      </div>

      {/* =================================================
          FOOTER
      ================================================= */}

      <Footer />

    </div>
  );
};

export default AdminNotification;