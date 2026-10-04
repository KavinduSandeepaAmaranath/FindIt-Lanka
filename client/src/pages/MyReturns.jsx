import { useState, useMemo, useEffect } from "react";

import DashboardSidebar from "../components/dashboard/DashBoardSidebar";
import MyReturnsHeader from "../components/dashboard/myReturns/MyReturnsHeader";
import MyReturnsUserBar from "../components/dashboard/myReturns/MyReturnsUserBar";
import MyReturnsFilters from "../components/dashboard/myReturns/MyReturnsFilters";
import MyReturnsStats from "../components/dashboard/myReturns/MyReturnsStats";
import MyReturnsTabs from "../components/dashboard/myReturns/MyReturnsTabs";
import MyReturnsSearch from "../components/dashboard/myReturns/MyReturnsSearch";
import ReturnsList from "../components/dashboard/myReturns/ReturnsList";

// Modals matching UI Images 1 to 5
import ClaimDetailsModal from "../components/dashboard/myReturns/ClaimDetailsModal";
import ApproveClaimModal from "../components/dashboard/myReturns/ApproveClaimModal";
import RejectClaimModal from "../components/dashboard/myReturns/RejectClaimModal";
import ViewDetailsModal from "../components/dashboard/myReturns/ViewDetailsModal";
import MarkItemReturnedModal from "../components/dashboard/myReturns/MarkItemReturnedModal";
import ContactClaimantModal from "../components/dashboard/myReturns/ContactClaimantModal";

import MyReportsPagination from "../components/dashboard/myReports/MyReportsPagination";
import ReportModal from "../components/LostFoundForm/ReportModal";

import { getMyReturns, approveClaim, rejectClaim } from "../services/claimService.js";

import {
  myReturns as initialReturns,
  returnStats as initialStats,
  dateFilterOptions,
  typeFilterOptions,
  RETURNS_PER_PAGE,
} from "../data/myReturnsData";

import {
  reportHeader as lostHeader,
  reportForm as lostForm,
} from "../data/ReportLost";

import {
  reportHeader as foundHeader,
  reportForm as foundForm,
} from "../data/ReportFound";

import fallbackImg from "../assets/images/LpIphone1.avif";

const tabStatusMap = {
  all: null,
  pending: ["Pending Claim", "pending"],
  approved: ["Approved", "approved"],
  in_progress: ["Return In Progress"],
  completed: ["Returned", "returned"],
};

const statToType = {
  approved: "Approved",
  pending: "Pending Claim",
  in_progress: "Return In Progress",
  completed: "Returned",
};

function MyReturns() {
  const [returnsList, setReturnsList] = useState([]);
  const [openLostReport, setOpenLostReport] = useState(false);
  const [openFoundReport, setOpenFoundReport] = useState(false);

  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [activeStat, setActiveStat] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [toastMessage, setToastMessage] = useState("");

  // Modals state
  const [claimDetailsItem, setClaimDetailsItem] = useState(null);
  const [approveModalItem, setApproveModalItem] = useState(null);
  const [rejectModalItem, setRejectModalItem] = useState(null);
  const [viewDetailsItem, setViewDetailsItem] = useState(null);
  const [markDoneItem, setMarkDoneItem] = useState(null);
  const [contactItem, setContactItem] = useState(null);

  const loadReturns = () => {
    getMyReturns()
      .then((res) => {
        if (res?.returns) {
          const liveReturns = res.returns.map((r) => {
            const lost = r.lostItemId || {};
            const found = r.foundItemId || {};
            const imgPath = lost.images?.[0] || found.images?.[0];
            const fullImg = imgPath
              ? (imgPath.startsWith("http") ? imgPath : `http://localhost:5000/${imgPath}`)
              : fallbackImg;

            let uiStatus = "Pending Claim";
            if (r.status === "approved") uiStatus = "Approved";
            if (r.status === "rejected") uiStatus = "Rejected";
            if (r.status === "returned") uiStatus = "Returned";

            const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
            const currentUserId = savedUser.id || savedUser._id || localStorage.getItem("userId");
            const isReturnOffer = r.claimantId?._id ? (r.claimantId._id.toString() === currentUserId?.toString()) : true;
            
            const targetUserObj = isReturnOffer ? (lost.userId || {}) : (r.claimantId || {});
            const displayUser = targetUserObj.fullName || targetUserObj.name || (isReturnOffer ? "Lost Item Owner" : "Verified User");
            const isApproved = r.status === "approved" || r.status === "returned";
            
            const claimantEmail = isApproved 
              ? (targetUserObj.email || "Contact via system") 
              : "Contact via system (Protected until approval)";
            const claimantPhone = isApproved 
              ? (targetUserObj.phone || targetUserObj.phoneNumber || "Contact via system") 
              : "Contact via system (Protected until approval)";

            const userPic = targetUserObj.profilePicture || targetUserObj.avatar || targetUserObj.profileImage;
            const hasRealAvatar = Boolean(userPic);
            const claimantAvatar = hasRealAvatar
              ? (userPic.startsWith("http") ? userPic : `http://localhost:5000/${userPic}`)
              : null;

            const itemDesc = lost.description || found.description || r.message || "Report description";
            const proofImgs = (lost.images && lost.images.length > 0)
              ? lost.images.map(img => img.startsWith("http") ? img : `http://localhost:5000/${img}`)
              : (found.images && found.images.length > 0)
              ? found.images.map(img => img.startsWith("http") ? img : `http://localhost:5000/${img}`)
              : [fullImg];

            return {
              ...r,
              id: r._id,
              referenceNo: `RET-${r._id.slice(-6).toUpperCase()}`,
              title: lost.title || found.title || "Returned Item",
              category: lost.category || found.category || "General",
              location: lost.district || found.district || lost.location || found.location || "Sri Lanka",
              claimedBy: displayUser,
              claimantEmail: claimantEmail,
              claimantPhone: claimantPhone,
              claimantAvatar: claimantAvatar,
              hasRealAvatar: hasRealAvatar,
              itemDescription: itemDesc,
              proofImages: proofImgs,
              isReturnOffer: isReturnOffer,
              claimedOn: new Date(r.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              }),
              status: uiStatus,
              claimStatus: uiStatus,
              image: fullImg,
            };
          });
          setReturnsList(liveReturns);
        } else {
          setReturnsList([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching my returns:", err);
        setReturnsList([]);
      });
  };

  useEffect(() => {
    loadReturns();
  }, []);

  // Compute tabs count dynamically
  const tabs = useMemo(
    () => [
      { value: "all", label: "All Returns", count: returnsList.length },
      {
        value: "pending",
        label: "Pending",
        count: returnsList.filter((item) =>
          tabStatusMap.pending.includes(item.status)
        ).length,
      },
      {
        value: "approved",
        label: "Approved",
        count: returnsList.filter((item) =>
          tabStatusMap.approved.includes(item.status)
        ).length,
      },
      {
        value: "in_progress",
        label: "In Progress",
        count: returnsList.filter((item) =>
          tabStatusMap.in_progress.includes(item.status)
        ).length,
      },
      {
        value: "completed",
        label: "Completed",
        count: returnsList.filter((item) =>
          tabStatusMap.completed.includes(item.status)
        ).length,
      },
    ],
    [returnsList]
  );

  // Compute 4 Stat cards counts dynamically
  const computedStats = useMemo(() => {
    return [
      {
        id: "approved",
        label: "Approved Returns",
        value: returnsList.filter((item) =>
          tabStatusMap.approved.includes(item.status)
        ).length,
        growth: "Ready for Handover",
      },
      {
        id: "pending",
        label: "Pending Returns",
        value: returnsList.filter((item) =>
          tabStatusMap.pending.includes(item.status)
        ).length,
        growth: "Requires Action",
      },
      {
        id: "in_progress",
        label: "In Progress",
        value: returnsList.filter((item) =>
          tabStatusMap.in_progress.includes(item.status)
        ).length,
        growth: "Meeting Arranged",
      },
      {
        id: "completed",
        label: "Completed Returns",
        value: returnsList.filter((item) =>
          tabStatusMap.completed.includes(item.status)
        ).length,
        growth: "Successfully Handed Over",
      },
    ];
  }, [returnsList]);

  // Tab + Search + Date + Type Filter Logic
  const filteredReturns = useMemo(() => {
    const words = searchTerm.trim().toLowerCase();

    return returnsList
      .filter((item) => {
        const allowed = tabStatusMap[activeTab];
        if (allowed && !allowed.includes(item.status)) return false;

        if (typeFilter !== "all" && item.status !== typeFilter) return false;

        if (dateFilter !== "all") {
          const days = Number(dateFilter);
          const limit = new Date();
          limit.setDate(limit.getDate() - days);
          if (new Date(item.claimedOn) < limit) return false;
        }

        if (words) {
          const haystack = [
            item.title,
            item.claimedBy,
            item.location,
            item.category,
            item.referenceNo,
            item.status,
          ]
            .join(" ")
            .toLowerCase();

          if (!haystack.includes(words)) return false;
        }

        return true;
      })
      .sort((a, b) => new Date(b.claimedOn) - new Date(a.claimedOn));
  }, [returnsList, activeTab, typeFilter, dateFilter, searchTerm]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredReturns.length / RETURNS_PER_PAGE)
  );

  // Reset to page 1 on filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchTerm, dateFilter, typeFilter]);

  const visibleReturns = filteredReturns.slice(
    (currentPage - 1) * RETURNS_PER_PAGE,
    currentPage * RETURNS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectStat = (statId) => {
    if (activeStat === statId) {
      setActiveStat(null);
      setTypeFilter("all");
    } else {
      setActiveStat(statId);
      setTypeFilter(statToType[statId] ?? "all");
      setActiveTab("all");
    }
  };

  const handleTypeFilterChange = (value) => {
    setTypeFilter(value);
    const matchedStat = Object.keys(statToType).find(
      (key) => statToType[key] === value
    );
    setActiveStat(matchedStat || null);
  };

  // Button Action Handlers with API integration
  const handleApproveClaim = async (item) => {
    try {
      await approveClaim(item.id || item._id, "Claim approved by founder");
      setToastMessage(`Claim for "${item.title}" approved! You can now contact the claimant.`);
      loadReturns();
    } catch (err) {
      console.error("Error approving claim:", err);
      const msg = err.response?.data?.message || err.message || "Failed to approve claim.";
      setToastMessage(`Note: ${msg}`);
    }
  };

  const handleRejectClaim = async (item, reason) => {
    try {
      await rejectClaim(item.id || item._id, reason || "Rejected by founder");
      setToastMessage(`Claim for "${item.title}" has been rejected.`);
      loadReturns();
    } catch (err) {
      console.error("Error rejecting claim:", err);
      const msg = err.response?.data?.message || err.message || "Failed to reject claim.";
      setToastMessage(`Note: ${msg}`);
    }
  };

  const handleConfirmReturned = (itemId, details) => {
    setReturnsList((prev) =>
      prev.map((r) =>
        r.id === itemId
          ? {
              ...r,
              status: "Returned",
              returnedOn: details.returnedOn,
              returnMethod: details.handoverMethod,
              returnNote: details.note,
            }
          : r
      )
    );
    setToastMessage("Item successfully marked as returned!");
  };

  return (
    <div className="flex bg-[#f8faff] min-h-screen">
      <DashboardSidebar
        onOpenLostReport={() => setOpenLostReport(true)}
        onOpenFoundReport={() => setOpenFoundReport(true)}
      />

      <div className="flex-1 min-w-0 pt-[60px] lg:pt-0">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-10 py-8 space-y-7">
          {/* Top User Bar */}
          <MyReturnsUserBar user={undefined} />

          {/* Header + Date & Type Filter Dropdowns */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <MyReturnsHeader />

            <MyReturnsFilters
              dateFilter={dateFilter}
              onDateFilterChange={setDateFilter}
              typeFilter={typeFilter}
              onTypeFilterChange={handleTypeFilterChange}
              dateOptions={dateFilterOptions}
              typeOptions={typeFilterOptions}
            />
          </div>

          {/* 4 Stats Cards */}
          <MyReturnsStats
            stats={computedStats}
            activeStat={activeStat}
            onSelectStat={handleSelectStat}
          />

          {/* Tabs + Search Input Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 pt-2">
            <MyReturnsTabs
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />

            <MyReturnsSearch
              searchTerm={searchTerm}
              onSearch={setSearchTerm}
            />
          </div>

          {/* Returns Cards List with custom action buttons */}
          <ReturnsList
            returns={visibleReturns}
            onViewClaim={(item) => setClaimDetailsItem(item)}
            onViewDetails={(item) => setViewDetailsItem(item)}
            onContactClaimant={(item) => setContactItem(item)}
            onMarkDone={(item) => setMarkDoneItem(item)}
          />

          {/* Pagination */}
          <div className="pt-2 pb-6">
            <MyReportsPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl border border-slate-700 text-sm font-semibold flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          {toastMessage}
        </div>
      )}

      {/* Image 1: Claim Details Modal */}
      {claimDetailsItem && (
        <ClaimDetailsModal
          item={claimDetailsItem}
          onClose={() => setClaimDetailsItem(null)}
          onOpenApproveModal={(item) => {
            setClaimDetailsItem(null);
            setApproveModalItem(item);
          }}
          onOpenRejectModal={(item) => {
            setClaimDetailsItem(null);
            setRejectModalItem(item);
          }}
        />
      )}

      {/* Image 2: Approve Claim? Modal */}
      {approveModalItem && (
        <ApproveClaimModal
          item={approveModalItem}
          onClose={() => setApproveModalItem(null)}
          onConfirm={handleApproveClaim}
        />
      )}

      {/* Image 3: Reject Claim? Modal */}
      {rejectModalItem && (
        <RejectClaimModal
          item={rejectModalItem}
          onClose={() => setRejectModalItem(null)}
          onConfirm={handleRejectClaim}
        />
      )}

      {/* Image 4: View Details Modal */}
      {viewDetailsItem && (
        <ViewDetailsModal
          item={viewDetailsItem}
          onClose={() => setViewDetailsItem(null)}
        />
      )}

      {/* Image 5: Mark Item as Returned Modal */}
      {markDoneItem && (
        <MarkItemReturnedModal
          item={markDoneItem}
          onClose={() => setMarkDoneItem(null)}
          onConfirm={handleConfirmReturned}
        />
      )}

      {/* Contact Claimant Modal */}
      {contactItem && (
        <ContactClaimantModal
          item={contactItem}
          onClose={() => setContactItem(null)}
          onMessageSent={(msg) => setToastMessage(msg)}
        />
      )}

      {/* Sidebar Report Modals */}
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

export default MyReturns;
