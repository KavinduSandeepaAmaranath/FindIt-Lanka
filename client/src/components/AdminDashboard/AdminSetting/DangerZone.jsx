import { useState } from "react";
import {
  dangerZoneData,
} from "../../../data/AdminModuleData/AdminSetting";
import { clearAllAdminNotificationsApi } from "../../../services/notificationService";
import { useNotifications } from "../../../context/NotificationContext";

const DangerZone = () => {
  const [showConfirm, setShowConfirm] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const { setNotifications, refreshNotifications } = useNotifications();

  const MainIcon = dangerZoneData.mainIcon;

  const handleConfirmAction = async () => {
    if (showConfirm === "clear") {
      try {
        setIsProcessing(true);
        const res = await clearAllAdminNotificationsApi();
        setNotifications([]);
        if (refreshNotifications) refreshNotifications();
        setStatusMessage({
          type: "success",
          text: `Successfully cleared ${res.deletedCount ?? "all"} admin notification(s) from the database.`,
        });
      } catch (err) {
        console.error("Failed to clear admin notifications:", err);
        setStatusMessage({
          type: "error",
          text: err?.response?.data?.message || "Failed to clear admin notifications. Please try again.",
        });
      } finally {
        setIsProcessing(false);
        setShowConfirm(null);
      }
    } else {
      setShowConfirm(null);
    }
  };

  return (
    <>
      <section
        id="danger"
        className="
          scroll-mt-6
          rounded-2xl
          border
          border-red-200
          bg-red-50/50
          p-4
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
              bg-red-100
              text-red-500
            "
          >
            <MainIcon size={21} />
          </div>

          <div>
            <h2
              className="
                text-lg
                font-bold
                text-red-500
                sm:text-xl
              "
            >
              {dangerZoneData.title}
            </h2>

            <p
              className="
                mt-1
                text-xs
                text-[#64748B]
                sm:text-sm
              "
            >
              {dangerZoneData.description}
            </p>
          </div>

        </div>

        {/* Status Feedback Message */}
        {statusMessage && (
          <div
            className={`mt-4 flex items-center justify-between rounded-xl p-3.5 text-xs sm:text-sm font-medium ${
              statusMessage.type === "success"
                ? "border border-emerald-300 bg-emerald-50 text-emerald-800"
                : "border border-rose-300 bg-rose-50 text-rose-800"
            }`}
          >
            <span>{statusMessage.text}</span>
            <button
              type="button"
              onClick={() => setStatusMessage(null)}
              className="ml-3 font-bold text-xs underline cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Actions */}
        <div
          className="
            mt-5
            grid
            grid-cols-1
            gap-4
            md:grid-cols-2
          "
        >

          {dangerZoneData.items.map(
            (item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  className="
                    rounded-xl
                    border
                    border-red-200
                    bg-white
                    p-4
                  "
                >

                  <div className="flex items-start gap-3">

                    <div
                      className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-red-100
                        text-red-500
                      "
                    >
                      <Icon size={19} />
                    </div>

                    <div className="min-w-0">
                      <h3
                        className="
                          text-xs
                          font-bold
                          text-red-500
                        "
                      >
                        {item.title}
                      </h3>

                      <p
                        className="
                          mt-1
                          text-[11px]
                          leading-4
                          text-[#64748B]
                        "
                      >
                        {item.description}
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirm(
                            item.id
                          )
                        }
                        className="
                          mt-4
                          rounded-lg
                          border
                          border-red-400
                          bg-white
                          px-4
                          py-2
                          text-xs
                          font-semibold
                          text-red-500
                          transition
                          hover:bg-red-500
                          hover:text-white
                        "
                      >
                        {item.buttonText}
                      </button>
                    </div>

                  </div>

                </div>
              );
            }
          )}

        </div>

      </section>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/40
            px-4
            backdrop-blur-sm
          "
          onClick={() =>
            setShowConfirm(null)
          }
        >
          <div
            className="
              w-full
              max-w-md
              rounded-2xl
              bg-white
              p-6
              shadow-2xl
            "
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div
              className="
                mx-auto
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                bg-red-100
                text-red-500
              "
            >
              <MainIcon size={27} />
            </div>

            <h3
              className="
                mt-4
                text-center
                text-xl
                font-bold
                text-[#2A3B63]
              "
            >
              {showConfirm === "clear"
                ? "Clear All Admin Notifications?"
                : "Are you sure?"}
            </h3>

            <p
              className="
                mt-2
                text-center
                text-sm
                leading-6
                text-[#64748B]
              "
            >
              {showConfirm === "clear"
                ? "This will permanently remove all admin notifications from the database. This action cannot be undone."
                : "This action can affect the FindIt Lanka platform. Please confirm before continuing."}
            </p>

            <div
              className="
                mt-6
                flex
                flex-col
                gap-3
                sm:flex-row
                sm:justify-center
              "
            >

              <button
                type="button"
                disabled={isProcessing}
                onClick={() =>
                  setShowConfirm(null)
                }
                className="
                  rounded-lg
                  border
                  border-gray-300
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-[#2A3B63]
                  transition
                  hover:bg-gray-50
                  disabled:opacity-50
                "
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isProcessing}
                onClick={handleConfirmAction}
                className="
                  rounded-lg
                  bg-red-500
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-red-600
                  disabled:opacity-50
                "
              >
                {isProcessing ? "Clearing..." : "Confirm"}
              </button>

            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default DangerZone;