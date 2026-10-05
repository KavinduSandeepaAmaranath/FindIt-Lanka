import { useMemo, useState } from "react";

import {
  notificationListIcons,
} from "../../../data/AdminModuleData/AdminNotification";

import Pagination from "../Pagination";

const NotificationList = ({
  searchValue,
  activeFilter,
  notifications,
  setNotifications,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // =====================================================
  // ITEMS PER PAGE
  // =====================================================

  const rowsPerPage = 10;

  // =====================================================
  // FILTER DATA
  // =====================================================

  const filteredNotifications = useMemo(() => {
    const query = searchValue.trim().toLowerCase();

    return notifications.filter((notification) => {
      const matchesSearch =
        !query ||
        notification.title.toLowerCase().includes(query) ||
        notification.description.toLowerCase().includes(query) ||
        notification.details.toLowerCase().includes(query) ||
        notification.category.toLowerCase().includes(query);

      const matchesFilter =
        activeFilter === "All" ||
        (activeFilter === "Unread" && !notification.read) ||
        notification.category === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [notifications, searchValue, activeFilter]);

  // =====================================================
  // PAGINATION
  // =====================================================

  const totalPages = Math.ceil(
    filteredNotifications.length / rowsPerPage
  );

  /*
   * If search/filter changes and the current page
   * is no longer available, automatically use page 1.
   */
  const safeCurrentPage =
    totalPages === 0
      ? 1
      : Math.min(currentPage, totalPages);

  const startIndex =
    (safeCurrentPage - 1) * rowsPerPage;

  const currentNotifications =
    filteredNotifications.slice(
      startIndex,
      startIndex + rowsPerPage
    );

  // =====================================================
  // MARK AS READ
  // =====================================================

  const handleNotificationClick = (notificationId) => {
    setNotifications((previous) =>
      previous.map((notification) =>
        notification.id === notificationId
          ? {
              ...notification,
              read: true,
            }
          : notification
      )
    );
  };

  // =====================================================
  // GROUP CURRENT PAGE NOTIFICATIONS
  // =====================================================

  const groupedNotifications =
    currentNotifications.reduce(
      (groups, notification) => {
        if (!groups[notification.section]) {
          groups[notification.section] = [];
        }

        groups[notification.section].push(notification);

        return groups;
      },
      {}
    );

  const sectionOrder = [
    "Today",
    "Yesterday",
    "Earlier",
  ];

  const ArrowIcon = notificationListIcons.arrow;

  return (
    <section className="w-full">

      {/* =================================================
          EMPTY STATE
      ================================================= */}

      {currentNotifications.length === 0 ? (
        <div
          className="
            rounded-2xl
            border
            border-gray-200
            bg-white
            px-5
            py-14
            text-center
            shadow-sm
          "
        >
          <p
            className="
              text-base
              font-semibold
              text-[#2A3B63]
            "
          >
            No notifications found
          </p>

          <p
            className="
              mt-2
              text-sm
              text-[#64748B]
            "
          >
            Try changing your search or notification filter.
          </p>
        </div>
      ) : (
        <>
          {/* =================================================
              NOTIFICATION GROUPS
          ================================================= */}

          {sectionOrder.map((sectionName) => {
            const sectionItems =
              groupedNotifications[sectionName];

            if (
              !sectionItems ||
              sectionItems.length === 0
            ) {
              return null;
            }

            return (
              <div
                key={sectionName}
                className="mb-7 last:mb-0"
              >

                {/* SECTION HEADER */}

                <div
                  className="
                    mb-3
                    flex
                    items-center
                    justify-between
                    gap-3
                  "
                >
                  <h2
                    className="
                      text-base
                      font-bold
                      text-[#2A3B63]
                      sm:text-lg
                    "
                  >
                    {sectionName}
                  </h2>

                  <span
                    className="
                      text-xs
                      font-medium
                      text-[#0F3292]
                      sm:text-sm
                    "
                  >
                    {sectionItems[0].sectionDate}
                  </span>
                </div>

                {/* NOTIFICATIONS */}

                <div className="space-y-2">
                  {sectionItems.map((notification) => {
                    const NotificationIcon =
                      notification.icon;

                    return (
                      <button
                        key={notification.id}
                        type="button"
                        onClick={() =>
                          handleNotificationClick(
                            notification.id
                          )
                        }
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
                            notification.read
                              ? `
                                border-gray-200
                                bg-white
                                hover:border-[#2563EB]/30
                                hover:bg-blue-50/20
                              `
                              : `
                                border-blue-200
                                bg-blue-50/40
                                hover:border-[#2563EB]
                                hover:bg-blue-50/70
                              `
                          }
                        `}
                      >

                        {/* ICON */}

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
                            ${notification.iconBg}
                            ${notification.iconColor}
                          `}
                        >
                          <NotificationIcon size={21} />
                        </div>

                        {/* CONTENT */}

                        <div className="min-w-0 flex-1">
                          <div
                            className="
                              flex
                              items-start
                              gap-2
                            "
                          >

                            {/* UNREAD DOT */}

                            {!notification.read && (
                              <span
                                className="
                                  mt-1.5
                                  h-2.5
                                  w-2.5
                                  shrink-0
                                  rounded-full
                                  bg-[#2563EB]
                                "
                              />
                            )}

                            <div className="min-w-0">

                              {/* TITLE */}

                              <h3
                                className={`
                                  truncate
                                  text-sm
                                  text-[#2A3B63]
                                  ${
                                    notification.read
                                      ? "font-medium"
                                      : "font-bold"
                                  }
                                `}
                              >
                                {notification.title}
                              </h3>

                              {/* DESCRIPTION */}

                              <p
                                className="
                                  mt-1
                                  line-clamp-1
                                  text-xs
                                  text-[#64748B]
                                  sm:text-sm
                                "
                              >
                                {notification.description}
                              </p>

                              {/* DETAILS */}

                              <p
                                className="
                                  mt-1
                                  line-clamp-1
                                  text-[11px]
                                  text-[#64748B]
                                  sm:text-xs
                                "
                              >
                                {notification.details}
                              </p>

                            </div>
                          </div>
                        </div>

                        {/* CATEGORY */}

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
                            ${notification.categoryBg}
                            ${notification.categoryColor}
                          `}
                        >
                          {notification.category}
                        </span>

                        {/* TIME */}

                        <span
                          className="
                            hidden
                            min-w-[75px]
                            text-right
                            text-xs
                            text-[#64748B]
                            md:block
                          "
                        >
                          {notification.time}
                        </span>

                        {/* ARROW */}

                        <ArrowIcon
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

      {/* =================================================
          PAGINATION
      ================================================= */}

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

    </section>
  );
};

export default NotificationList;