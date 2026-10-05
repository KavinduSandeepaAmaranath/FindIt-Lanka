import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardSidebar from "../components/dashboard/DashBoardSidebar";
import NotificationHeader from "../components/notifications/NotificationHeader";
import NotificationCategories from "../components/notifications/NotificationCategories";
import NotificationCard from "../components/notifications/NotificationCard";
import NotificationPagination from "../components/notifications/NotificationPagination";

// Modals matching attached UI designs:
import NotificationSettingsModal from "../components/notifications/modals/NotificationSettingsModal";
import MarkAllAsReadModal from "../components/notifications/modals/MarkAllAsReadModal";
import ClaimApprovedModal from "../components/notifications/modals/ClaimApprovedModal";
import PossibleMatchModal from "../components/notifications/modals/PossibleMatchModal";
import EligibleFoundReportsModal from "../components/browseItems/EligibleFoundReportsModal";
import EligibleLostReportsModal from "../components/browseItems/EligibleLostReportsModal";
import MessageAdminModal from "../components/notifications/modals/MessageAdminModal";
import ReportApprovedModal from "../components/notifications/modals/ReportApprovedModal";
import FoundItemClaimModal from "../components/notifications/modals/FoundItemClaimModal";
import DeleteNotificationModal from "../components/notifications/modals/DeleteNotificationModal";
import ReportRejectedModal from "../components/notifications/modals/ReportRejectedModal";

import ReportModal from "../components/LostFoundForm/ReportModal";

import { currentUser } from "../data/dashboardData";
import { notificationCategories } from "../data/notificationData";
import { useNotifications } from "../context/NotificationContext";
import { createClaim } from "../services/claimService.js";

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
  const navigate = useNavigate();
  // Shared notification context state
  const {
    notifications,
    setNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    deleteAllNotifications,
  } = useNotifications();
  const [activeCategory, setActiveCategory] = useState("all");
  const [page, setPage] = useState(1);

  // Modals state
    const [toastMessage, setToastMessage] = useState("");

    const handleOfferReturnFromMatch = (notification) => {
    setMatchNotificationToProcess(notification);
    setOpenPossibleMatchModal(false);
    setOpenEligibleFoundModal(true);
  };

  const handleConfirmFoundReportSubmit = async (selectedFoundReportId) => {
    try {
      const lostItemId = matchNotificationToProcess?.lostItemId?._id || matchNotificationToProcess?.lostItemId;
      const foundItemId = selectedFoundReportId || matchNotificationToProcess?.foundItemId?._id || matchNotificationToProcess?.foundItemId;

      if (!lostItemId || !foundItemId) {
        alert("Missing report details for this return offer.");
        return;
      }

      await createClaim({
        lostItemId,
        foundItemId,
        message: `I have found an item matching your lost report "${matchNotificationToProcess?.title || "Item"}" and would like to return it.`,
      });

      setOpenEligibleFoundModal(false);
      setMatchNotificationToProcess(null);
      setSelectedNotification(null);
      setToastMessage(`Successfully submitted return offer for "${matchNotificationToProcess?.title || "Item"}"!`);
    } catch (err) {
      console.error("Error submitting return offer:", err);
      const msg = err.response?.data?.message || err.message || "Failed to submit return offer.";
      alert(`Note: ${msg}`);
    }
  };

  const handleClaimItemFromMatch = (notification) => {
    setMatchNotificationToProcess(notification);
    setOpenPossibleMatchModal(false);
    setOpenEligibleLostModal(true);
  };

  const handleConfirmLostReportSubmit = async (selectedLostReportId) => {
    try {
      const foundItemId = matchNotificationToProcess?.foundItemId?._id || matchNotificationToProcess?.foundItemId;
      const lostItemId = selectedLostReportId || matchNotificationToProcess?.lostItemId?._id || matchNotificationToProcess?.lostItemId;

      if (!lostItemId || !foundItemId) {
        alert("Missing report details for this claim.");
        return;
      }

      await createClaim({
        foundItemId,
        lostItemId,
        message: `I am claiming ownership for "${matchNotificationToProcess?.title || "Item"}" via my lost item report.`,
      });

      setOpenEligibleLostModal(false);
      setMatchNotificationToProcess(null);
      setSelectedNotification(null);
      setToastMessage(`Successfully submitted claim request for "${matchNotificationToProcess?.title || "Item"}"!`);
    } catch (err) {
      console.error("Error submitting claim request:", err);
      const msg = err.response?.data?.message || err.message || "Failed to submit claim request.";
      alert(`Note: ${msg}`);
    }
  };

  const [openSettingsModal, setOpenSettingsModal] = useState(false);
  const [openMarkAllReadModal, setOpenMarkAllReadModal] = useState(false);
  const [openClaimApprovedModal, setOpenClaimApprovedModal] = useState(false);
  const [openPossibleMatchModal, setOpenPossibleMatchModal] = useState(false);
  const [openMessageAdminModal, setOpenMessageAdminModal] = useState(false);
  const [openReportApprovedModal, setOpenReportApprovedModal] = useState(false);
  const [openFoundItemClaimModal, setOpenFoundItemClaimModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openReportRejectedModal, setOpenReportRejectedModal] = useState(false);

  const [selectedNotification, setSelectedNotification] = useState(null);
  const [openEligibleFoundModal, setOpenEligibleFoundModal] = useState(false);
  const [openEligibleLostModal, setOpenEligibleLostModal] = useState(false);
  const [matchNotificationToProcess, setMatchNotificationToProcess] = useState(null);
  const [notificationToDelete, setNotificationToDelete] = useState(null);
  const [isBulkDelete, setIsBulkDelete] = useState(false);

  // Sidebar report modals
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
    setPage(1);
  };

  const handleMarkAsRead = (id) => {
    markAsRead(id);
  };

  const handleConfirmMarkAllAsRead = () => {
    markAllAsRead();
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  // Delete all notifications trigger
  const handleOpenDeleteAll = () => {
    setIsBulkDelete(true);
    setNotificationToDelete(null);
    setOpenDeleteModal(true);
  };

  // Delete single notification trigger
  const handleDeleteNotification = (notification) => {
    setIsBulkDelete(false);
    setNotificationToDelete(notification);
    setOpenDeleteModal(true);
  };

  // Confirm delete handler
  const handleConfirmDelete = () => {
    if (isBulkDelete) {
      deleteAllNotifications();
    } else if (notificationToDelete) {
      deleteNotification(notificationToDelete.id);
      setNotificationToDelete(null);
    }
  };

  // Handle click on notification action button or card
  const handleActionClick = (notification) => {
    if (!notification.isRead) {
      markAsRead(notification.id);
    }
    setSelectedNotification(notification);
    const title = notification.title?.toLowerCase() || "";
    const action = notification.actionLabel?.toLowerCase() || "";
    const category = notification.category?.toLowerCase() || "";
    const icon = notification.icon || "";

        // Claim / Return Offer Navigation
    if (title.includes("return offer received") || title.includes("item return offer")) {
      navigate("/dashboard/my-claims");
      return;
    }

    if (title.includes("ownership claim received") || title.includes("found item received a claim")) {
      navigate("/dashboard/my-returns");
      return;
    }

    // 1. Rejected Report Modal (reject notifi----view report btn)
    if (icon === "reject" || title.includes("rejected")) {
      setOpenReportRejectedModal(true);
      return;
    }

    // 2. Report Approved Modal (view Report)
    if (
      title.includes("report has been approved") ||
      title.includes("report was approved") ||
      (action === "view report" && !title.includes("rejected"))
    ) {
      setOpenReportApprovedModal(true);
      return;
    }

    // 3. Your Found Item Received a Claim (review Claim)
    if (
      title.includes("found item received a claim") ||
      action === "review claim" ||
      action === "view details" ||
      category === "found"
    ) {
      setOpenFoundItemClaimModal(true);
      return;
    }

    // 4. Message from Admin (openChatBtn)
    if (
      action === "open chat" ||
      category === "system" ||
      title.includes("message")
    ) {
      setOpenMessageAdminModal(true);
      return;
    }

    // 5. Claim Approved (claimApproved)
    if (
      action === "view claim" ||
      category === "claims" ||
      title.includes("approved")
    ) {
      setOpenClaimApprovedModal(true);
      return;
    }

    // 6. Possible Match Found (viewItemBtn)
    if (
      action === "view item" ||
      category === "matches" ||
      title.includes("match")
    ) {
      setOpenPossibleMatchModal(true);
      return;
    }

    // Fallback based on action label
    if (action.includes("chat")) {
      setOpenMessageAdminModal(true);
    } else if (action.includes("claim")) {
      setOpenClaimApprovedModal(true);
    } else if (action.includes("report")) {
      setOpenReportApprovedModal(true);
    } else {
      setOpenPossibleMatchModal(true);
    }
  };

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <DashboardSidebar
        onOpenLostReport={() => setOpenLostReport(true)}
        onOpenFoundReport={() => setOpenFoundReport(true)}
      />

      <div className="flex-1 min-w-0 pt-[60px] lg:pt-0">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-8 space-y-6">
          <NotificationHeader
            user={undefined}
            onOpenSettings={() => setOpenSettingsModal(true)}
            onOpenMarkAllRead={() => setOpenMarkAllReadModal(true)}
            onOpenDeleteAll={handleOpenDeleteAll}
          />

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
                      <h3 className="text-sm font-bold text-blue-800">{groupName}</h3>
                      {groupName !== "Earlier" && (
                        <span className="text-sm font-bold text-blue-800">
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
                          onActionClick={handleActionClick}
                          onDelete={handleDeleteNotification}
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

      {/* ========================================================
          Modals matching attached UI designs:
          1. Notification Settings Modal
          2. Mark All as Read Modal
          3. Claim Approved Modal
          4. Possible Match Found Modal (viewItemBtn)
          5. Message from Admin Modal (openChatBtn)
          6. Report Approved Modal (view Report)
          7. Found Item Received a Claim Modal (review Claim)
          8. Delete Notification Modal (with trash bin trigger)
          9. Report Rejected Modal (reject notifi----view report btn)
         ======================================================== */}

      {/* 1. Notification Settings */}
      <NotificationSettingsModal
        isOpen={openSettingsModal}
        onClose={() => setOpenSettingsModal(false)}
      />

      {/* 2. Mark All as Read */}
      <MarkAllAsReadModal
        isOpen={openMarkAllReadModal}
        onClose={() => setOpenMarkAllReadModal(false)}
        onConfirm={handleConfirmMarkAllAsRead}
      />

      {/* 3. Claim Approved */}
      <ClaimApprovedModal
        isOpen={openClaimApprovedModal}
        onClose={() => setOpenClaimApprovedModal(false)}
        notification={selectedNotification}
      />

      {/* 4. Possible Match Found */}
      <PossibleMatchModal
        isOpen={openPossibleMatchModal}
        onClose={() => setOpenPossibleMatchModal(false)}
        notification={selectedNotification}
        onOfferReturn={handleOfferReturnFromMatch}
        onClaimItem={handleClaimItemFromMatch}
      />

      {/* 5. Message from Admin */}
      <MessageAdminModal
        isOpen={openMessageAdminModal}
        onClose={() => setOpenMessageAdminModal(false)}
        notification={selectedNotification}
      />

      {/* 6. Report Approved Modal (view Report) */}
      <ReportApprovedModal
        isOpen={openReportApprovedModal}
        onClose={() => setOpenReportApprovedModal(false)}
        notification={selectedNotification}
      />

      {/* 7. Found Item Received a Claim Modal (review Claim) */}
      <FoundItemClaimModal
        isOpen={openFoundItemClaimModal}
        onClose={() => setOpenFoundItemClaimModal(false)}
        notification={selectedNotification}
      />

      {/* 8. Delete Notification Modal */}
      <DeleteNotificationModal
        isOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        isBulk={isBulkDelete}
      />

      {/* 9. Report Rejected Modal (reject notifi----view report btn) */}
      <ReportRejectedModal
        isOpen={openReportRejectedModal}
        onClose={() => setOpenReportRejectedModal(false)}
        notification={selectedNotification}
      />

      {/* Sidebar Report modals */}
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
    {/* Eligible Found Reports Modal for Return Offer */}
      {openEligibleFoundModal && (
        <EligibleFoundReportsModal
          initialSelectedId={matchNotificationToProcess?.foundItemId?._id || matchNotificationToProcess?.foundItemId}
          onClose={() => setOpenEligibleFoundModal(false)}
          onSubmit={(selectedId) => handleConfirmFoundReportSubmit(selectedId)}
        />
      )}

      {/* Eligible Lost Reports Modal for Claim Request */}
      {openEligibleLostModal && (
        <EligibleLostReportsModal
          initialSelectedId={matchNotificationToProcess?.lostItemId?._id || matchNotificationToProcess?.lostItemId}
          onClose={() => setOpenEligibleLostModal(false)}
          onSubmit={(selectedId) => handleConfirmLostReportSubmit(selectedId)}
        />
      )}

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl border border-slate-700 text-sm font-semibold flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          {toastMessage}
        </div>
      )}
    </div>
  );
}

export default Notification;