import { useState } from "react";

import DashboardSidebar from "../components/dashboard/DashBoardSidebar";
import NotificationHeader from "../components/notifications/NotificationHeader";
import NotificationCategories from "../components/notifications/NotificationCategories";
import NotificationCard from "../components/notifications/NotificationCard";
import NotificationPagination from "../components/notifications/NotificationPagination";

import ReportModal from "../components/LostFoundForm/ReportModal";

import { currentUser } from "../data/dashboardData";
import { notificationCategories, notificationsData } from "../data/notificationData";

import {
  reportHeader as lostHeader,
  reportForm as lostForm,
} from "../data/ReportLost";

import {
  reportHeader as foundHeader,
  reportForm as foundForm,
} from "../data/ReportFound";

const ITEMS_PER_PAGE = 7; 
const GROUPS = ["Today", "Yesterday", "Earlier"]; 

function Notification() {
   // The list lives in state so we can change isRead when the user clicks.
  const [notifications, setNotifications] = useState(notificationsData);
  const [activeCategory, setActiveCategory] = useState("all");
  const [page, setPage] = useState(1);

  // Sidebar "Add Lost/Found Reports" buttons open these modals
  const [openLostReport, setOpenLostReport] = useState(false);
  const [openFoundReport, setOpenFoundReport] = useState(false);

  // Counts for the left panel
  const counts = {};
  notificationCategories.forEach(({ key }) => {
    if (key === "all") {
      counts[key] = notifications.length;
    } else if (key === "unread") {
      counts[key] = notifications.filter((n) => !n.isRead).length;
    } else {
      counts[key] = notifications.filter((n) => n.category === key).length;
    }
  });

  // Filter by category 
  let filtered = notifications;
  if (activeCategory === "unread") {
    filtered = notifications.filter((n) => !n.isRead);
  } else if (activeCategory !== "all") {
    filtered = notifications.filter((n) => n.category === activeCategory);
  }

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages); 
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageItems = filtered.slice(start, start + ITEMS_PER_PAGE);

  // Event handlers 
  const handleCategoryChange = (key) => {
    setActiveCategory(key);
    setPage(1); // go back to page 1 when the category changes
  };

  const handleMarkAsRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  return (
    <div className="flex bg-slate-50">
      <DashboardSidebar
        onOpenLostReport={() => setOpenLostReport(true)}
        onOpenFoundReport={() => setOpenFoundReport(true)}
      />

      <div className="flex-1 min-w-0 pt-[60px] lg:pt-0">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-8 space-y-6">
          <NotificationHeader user={currentUser} onMarkAllRead={handleMarkAllAsRead} />

          <div className="flex flex-col lg:flex-row gap-5 items-start">
            {/* left: categories */}
            <div className="w-full lg:w-auto">
              <NotificationCategories
                categories={notificationCategories}
                counts={counts}
                activeCategory={activeCategory}
                onSelect={handleCategoryChange}
              />
            </div>

            {/* right: notification list */}
            <section className="w-full flex-1 min-w-0 bg-white rounded-2xl shadow-md border border-slate-100 p-4 sm:p-6">
              {pageItems.length === 0 && (
                <p className="text-center text-sm text-slate-500 py-10">
                  No notifications in this category.
                </p>
              )}

              {GROUPS.map((groupName) => {
                const groupItems = pageItems.filter((n) => n.group === groupName);
                if (groupItems.length === 0) return null;

                return (
                  <div key={groupName} className="mb-6 last:mb-0">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-extrabold text-slate-900">{groupName}</h3>
                      {groupName !== "Earlier" && (
                        <span className="text-sm font-bold text-slate-900">
                          {groupItems[0].date}
                        </span>
                      )}
                    </div>

                    <div className="space-y-3">
                      {groupItems.map((n) => (
                        <NotificationCard
                          key={n.id}
                          notification={n}
                          onMarkAsRead={handleMarkAsRead}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}

              {filtered.length > 0 && (
                <NotificationPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </section>
          </div>
        </div>
      </div>

      {/* Report modals */}
      {openLostReport && (
        <ReportModal
          header={lostHeader}
          formData={lostForm}
          onClose={() => setOpenLostReport(false)}
        />
      )}

      {openFoundReport && (
        <ReportModal
          header={foundHeader}
          formData={foundForm}
          onClose={() => setOpenFoundReport(false)}
        />
      )}
    </div>
  );
}

export default Notification;