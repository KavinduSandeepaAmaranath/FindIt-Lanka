import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiBell,
  FiFileText,
  FiShield,
  FiUsers,
  FiSettings,
  FiSearch,
  FiAlertCircle,
  FiCheckCircle,
  FiInbox,
  FiMessageSquare,
  FiChevronRight,
} from "react-icons/fi";
import { markNotificationAsReadApi } from "../../../services/notificationService";
import Pagination from "../Pagination";

const resolveIconAndStyle = (notification) => {
  // If notification already has component icon
  if (typeof notification.icon === "function" || (typeof notification.icon === "object" && notification.icon !== null)) {
    return {
      Icon: notification.icon,
      iconBg: notification.iconBg || "bg-[#2563EB]",
      iconColor: notification.iconColor || "text-white",
      categoryBg: notification.categoryBg || "bg-[#E0F2FE]",
      categoryColor: notification.categoryColor || "text-[#2563EB]",
      categoryLabel: notification.category || "Reports",
    };
  }

  const type = (notification.type || "").toLowerCase();
  const cat = (notification.category || "").toLowerCase();
  const iconStr = (notification.icon || "").toLowerCase();

  if (type === "claim" || cat === "claims" || iconStr === "shield") {
    return {
      Icon: FiShield,
      iconBg: "bg-emerald-600",
      iconColor: "text-white",
      categoryBg: "bg-emerald-50",
      categoryColor: "text-emerald-700",
      categoryLabel: "Claims",
    };
  }

  if (type === "rejection" || iconStr === "reject") {
    return {
      Icon: FiAlertCircle,
      iconBg: "bg-rose-500",
      iconColor: "text-white",
      categoryBg: "bg-rose-50",
      categoryColor: "text-rose-600",
      categoryLabel: "Reports",
    };
  }

  if (type === "approval" || cat === "reports" || iconStr === "report") {
    return {
      Icon: FiFileText,
      iconBg: "bg-[#2563EB]",
      iconColor: "text-white",
      categoryBg: "bg-[#E0F2FE]",
      categoryColor: "text-[#2563EB]",
      categoryLabel: "Reports",
    };
  }

  if (type === "match" || cat === "matches" || iconStr === "search") {
    return {
      Icon: FiSearch,
      iconBg: "bg-indigo-600",
      iconColor: "text-white",
      categoryBg: "bg-indigo-50",
      categoryColor: "text-indigo-600",
      categoryLabel: "Matches",
    };
  }

  if (type === "found" || cat === "found" || iconStr === "box") {
    return {
      Icon: FiInbox,
      iconBg: "bg-teal-600",
      iconColor: "text-white",
      categoryBg: "bg-teal-50",
      categoryColor: "text-teal-700",
      categoryLabel: "Found Items",
    };
  }

  if (type === "system" || cat === "system" || iconStr === "message") {
    return {
      Icon: FiMessageSquare,
      iconBg: "bg-slate-600",
      iconColor: "text-white",
      categoryBg: "bg-slate-100",
      categoryColor: "text-slate-700",
      categoryLabel: "System",
    };
  }

  if (cat === "users" || iconStr === "users") {
    return {
      Icon: FiUsers,
      iconBg: "bg-purple-600",
      iconColor: "text-white",
      categoryBg: "bg-purple-50",
      categoryColor: "text-purple-600",
      categoryLabel: "Users",
    };
  }

  return {
    Icon: FiBell,
    iconBg: "bg-blue-600",
    iconColor: "text-white",
    categoryBg: "bg-blue-50",
    categoryColor: "text-blue-600",
    categoryLabel: notification.category || "General",
  };
};

const NotificationList = ({
  searchValue = "",
  activeFilter = "All",
  notifications = [],
  setNotifications,
  loading = false,
  onNotificationClick,
}) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Filter data
  const filteredNotifications = useMemo(() => {
    const query = searchValue.trim().toLowerCase();

    return notifications.filter((notification) => {
      const title = (notification.title || "").toLowerCase();
      const description = (notification.description || notification.message || "").toLowerCase();
      const details = (notification.details || "").toLowerCase();
      const category = (notification.category || "").toLowerCase();

      const matchesSearch =
        !query ||
        title.includes(query) ||
        description.includes(query) ||
        details.includes(query) ||
        category.includes(query);

      const isRead = Boolean(notification.read ?? notification.isRead);

      let matchesFilter = true;
      if (activeFilter === "All") {
        matchesFilter = true;
      } else if (activeFilter === "Unread") {
        matchesFilter = !isRead;
      } else if (activeFilter.toLowerCase() === "reports") {
        matchesFilter =
          category === "reports" ||
          notification.type === "approval" ||
          notification.type === "rejection" ||
          notification.type === "report" ||
          notification.type === "found";
      } else if (activeFilter.toLowerCase() === "claims") {
        matchesFilter =
          category === "claims" ||
          notification.type === "claim";
      } else if (activeFilter.toLowerCase() === "system") {
        matchesFilter =
          category === "system" ||
          notification.type === "system";
      } else if (activeFilter.toLowerCase() === "users") {
        matchesFilter =
          category === "users" ||
          notification.type === "user";
      } else {
        matchesFilter = category === activeFilter.toLowerCase();
      }

      return matchesSearch && matchesFilter;
    });
  }, [notifications, searchValue, activeFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredNotifications.length / rowsPerPage);
  const safeCurrentPage = totalPages === 0 ? 1 : Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * rowsPerPage;
  const currentNotifications = filteredNotifications.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  // Click & Mark Read & Deep-link
  const handleItemClick = async (notification) => {
    const notifId = notification.id || notification._id;

    // Optimistically mark as read
    if (setNotifications) {
      setNotifications((previous) =>
        previous.map((n) =>
          (n.id === notifId || n._id === notifId)
            ? { ...n, read: true, isRead: true }
            : n
        )
      );
    }

    try {
      if (notifId) {
        await markNotificationAsReadApi(notifId);
      }
    } catch (err) {
      console.warn("Failed to mark notification read:", err?.message);
    }

    if (onNotificationClick) {
      onNotificationClick(notification);
      return;
    }

    // Default deep-link navigation
    const cat = (notification.category || "").toLowerCase();
    const type = (notification.type || "").toLowerCase();

    if (notification.claimId || cat === "claims" || type === "claim") {
      navigate("/claim-management");
    } else if (
      notification.lostItemId ||
      notification.foundItemId ||
      cat === "reports" ||
      type === "approval" ||
      type === "rejection" ||
      type === "report" ||
      type === "found"
    ) {
      navigate("/admin-reports");
    } else if (cat === "users" || type === "user") {
      navigate("/all-users");
    }
  };

  const groupedNotifications = currentNotifications.reduce(
    (groups, notification) => {
      const section = notification.section || notification.group || "Earlier";
      const validSection =
        section === "Today" || section === "Yesterday" ? section : "Earlier";

      if (!groups[validSection]) {
        groups[validSection] = [];
      }
      groups[validSection].push(notification);
      return groups;
    },
    {}
  );

  const sectionOrder = ["Today", "Yesterday", "Earlier"];

  if (loading) {
    return (
      <section className="w-full space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex animate-pulse items-center gap-4 rounded-xl border border-gray-200 bg-white p-4"
          >
            <div className="h-11 w-11 rounded-xl bg-gray-200" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/3 rounded bg-gray-200" />
              <div className="h-3 w-2/3 rounded bg-gray-100" />
            </div>
            <div className="h-4 w-16 rounded bg-gray-100" />
          </div>
        ))}
      </section>
    );
  }

  return (
    <section className="w-full">
      {/* Empty state */}
      {currentNotifications.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white px-5 py-14 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-[#2563EB] mb-3">
            <FiCheckCircle size={28} />
          </div>
          <p className="text-base font-semibold text-[#2A3B63]">
            No notifications found
          </p>
          <p className="mt-1 text-sm text-[#64748B]">
            {searchValue
              ? `No matches for "${searchValue}". Try adjusting your search term.`
              : "No notifications match this filter."}
          </p>
        </div>
      ) : (
        <>
          {sectionOrder.map((sectionName) => {
            const sectionItems = groupedNotifications[sectionName];

            if (!sectionItems || sectionItems.length === 0) {
              return null;
            }

            return (
              <div key={sectionName} className="mb-7 last:mb-0">
                {/* Section Header */}
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h2 className="text-base font-bold text-[#2A3B63] sm:text-lg">
                    {sectionName}
                  </h2>
                  <span className="text-xs font-medium text-[#0F3292] sm:text-sm">
                    {sectionItems[0].sectionDate || sectionItems[0].date || ""}
                  </span>
                </div>

                {/* Notifications in Section */}
                <div className="space-y-2">
                  {sectionItems.map((notification) => {
                    const {
                      Icon,
                      iconBg,
                      iconColor,
                      categoryBg,
                      categoryColor,
                      categoryLabel,
                    } = resolveIconAndStyle(notification);

                    const isRead = Boolean(
                      notification.read ?? notification.isRead
                    );

                    return (
                      <button
                        key={notification.id || notification._id}
                        type="button"
                        onClick={() => handleItemClick(notification)}
                        className={`
                          group
                          flex
                          w-full
                          items-center
                          gap-3
                          rounded-xl
                          border
                          p-3
                          text-left
                          transition-all
                          duration-200
                          sm:gap-4
                          sm:p-4
                          ${
                            isRead
                              ? "border-gray-200 bg-white hover:border-[#2563EB]/40 hover:bg-blue-50/20"
                              : "border-blue-200 bg-blue-50/50 hover:border-[#2563EB] hover:bg-blue-50/80 shadow-xs"
                          }
                        `}
                      >
                        {/* Icon */}
                        <div
                          className={`
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            sm:h-11
                            sm:w-11
                            transition-transform
                            duration-200
                            group-hover:scale-105
                            ${iconBg}
                            ${iconColor}
                          `}
                        >
                          <Icon size={21} />
                        </div>

                        {/* Content */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start gap-2">
                            {/* Unread indicator */}
                            {!isRead && (
                              <span
                                className="
                                  mt-1.5
                                  h-2.5
                                  w-2.5
                                  shrink-0
                                  rounded-full
                                  bg-[#2563EB]
                                "
                                title="Unread"
                              />
                            )}

                            <div className="min-w-0 flex-1">
                              {/* Title */}
                              <h3
                                className={`
                                  truncate
                                  text-sm
                                  text-[#2A3B63]
                                  ${isRead ? "font-medium" : "font-bold"}
                                `}
                              >
                                {notification.title}
                              </h3>

                              {/* Description */}
                              <p className="mt-1 line-clamp-1 text-xs text-[#64748B] sm:text-sm">
                                {notification.description || notification.message}
                              </p>

                              {/* Details */}
                              {notification.details && (
                                <p className="mt-1 line-clamp-1 text-[11px] text-[#64748B] sm:text-xs">
                                  {notification.details}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Category badge */}
                        <span
                          className={`
                            hidden
                            shrink-0
                            rounded-full
                            px-3
                            py-1
                            text-[11px]
                            font-medium
                            sm:inline-flex
                            ${categoryBg}
                            ${categoryColor}
                          `}
                        >
                          {categoryLabel}
                        </span>

                        {/* Time */}
                        <span className="hidden min-w-[75px] text-right text-xs text-[#64748B] md:block">
                          {notification.time}
                        </span>

                        {/* Arrow */}
                        <FiChevronRight
                          size={17}
                          className="
                            shrink-0
                            text-[#64748B]
                            transition-all
                            duration-200
                            group-hover:translate-x-1
                            group-hover:text-[#2563EB]
                          "
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </>
      )}

      {/* Pagination */}
      {filteredNotifications.length > rowsPerPage && (
        <div className="mt-6">
          <Pagination
            currentPage={safeCurrentPage}
            totalPages={totalPages}
            totalItems={filteredNotifications.length}
            rowsPerPage={rowsPerPage}
            onPageChange={setCurrentPage}
            itemName="notifications"
          />
        </div>
      )}
    </section>
  );
};

export default NotificationList;