import { useState } from "react";

import {
  notificationPreferencesData,
} from "../../../data/AdminModuleData/AdminSetting";

const NotificationPreferences = () => {
  const [notificationState, setNotificationState] =
    useState(
      Object.fromEntries(
        notificationPreferencesData.items.map(
          (item) => [
            item.id,
            item.enabled,
          ]
        )
      )
    );

  const toggleNotification = (id) => {
    setNotificationState((previous) => ({
      ...previous,
      [id]: !previous[id],
    }));
  };

  const MainIcon =
    notificationPreferencesData.mainIcon;

  return (
    <section
      id="notifications"
      className="
        scroll-mt-6
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-4
        shadow-sm
        sm:p-5
        lg:p-6
      "
    >

      {/* Header */}
      <div className="flex items-start gap-3">

        <div
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-blue-50
            text-[#2563EB]
          "
        >
          <MainIcon size={21} />
        </div>

        <div>
          <h2
            className="
              text-lg
              font-bold
              text-[#0F3292]
              sm:text-xl
            "
          >
            {notificationPreferencesData.title}
          </h2>

          <p
            className="
              mt-1
              text-xs
              text-[#64748B]
              sm:text-sm
            "
          >
            {notificationPreferencesData.description}
          </p>
        </div>

      </div>

      {/* Notification Grid */}
      <div
        className="
          mt-6
          grid
          grid-cols-1
          gap-x-6
          gap-y-5
          md:grid-cols-2
        "
      >

        {notificationPreferencesData.items.map(
          (item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                "
              >

                <div className="flex min-w-0 items-center gap-3">

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-blue-50
                      text-[#2563EB]
                    "
                  >
                    <Icon size={18} />
                  </div>

                  <div className="min-w-0">
                    <h3
                      className="
                        text-xs
                        font-bold
                        text-[#2A3B63]
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        mt-1
                        max-w-[280px]
                        text-[11px]
                        leading-4
                        text-[#64748B]
                      "
                    >
                      {item.description}
                    </p>
                  </div>

                </div>

                {/* Switch */}
                <button
                  type="button"
                  onClick={() =>
                    toggleNotification(
                      item.id
                    )
                  }
                  aria-label={`Toggle ${item.title}`}
                  className={`
                    relative
                    h-5
                    w-10
                    shrink-0
                    rounded-full
                    transition
                    ${
                      notificationState[item.id]
                        ? "bg-[#2563EB]"
                        : "bg-slate-300"
                    }
                  `}
                >
                  <span
                    className={`
                      absolute
                      top-0.5
                      h-4
                      w-4
                      rounded-full
                      bg-white
                      shadow
                      transition
                      ${
                        notificationState[item.id]
                          ? "left-5"
                          : "left-0.5"
                      }
                    `}
                  />
                </button>

              </div>
            );
          }
        )}

      </div>

    </section>
  );
};

export default NotificationPreferences;