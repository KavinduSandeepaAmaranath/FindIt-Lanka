import { useState, useMemo, useEffect } from "react";

import DashboardSidebar from "../components/dashboard/DashBoardSidebar";
import MyReturnsHeader from "../components/dashboard/myReturns/MyReturnsHeader";
import MyReturnsUserBar from "../components/dashboard/myReturns/MyReturnsUserBar";
import MyReturnsFilters from "../components/dashboard/myReturns/MyReturnsFilters";
import MyReturnsStats from "../components/dashboard/myReturns/MyReturnsStats";
import MyReturnsTabs from "../components/dashboard/myReturns/MyReturnsTabs";
import MyReturnsSearch from "../components/dashboard/myReturns/MyReturnsSearch";
import ReturnsList from "../components/dashboard/myReturns/ReturnsList";
import ReturnDetailsModal from "../components/dashboard/myReturns/ReturnDetailsModal";
import ContactClaimantModal from "../components/dashboard/myReturns/ContactClaimantModal";
import MarkReturnedModal from "../components/dashboard/myReturns/MarkReturnedModal";
import MyReportsPagination from "../components/dashboard/myReports/MyReportsPagination";

import ReportModal from "../components/LostFoundForm/ReportModal";
import { currentUser } from "../data/dashboardData";
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

const tabStatusMap = {
  all: null,
  pending: ["Pending Claim"],
  approved: ["Approved"],
  in_progress: ["Return In Progress"],
  completed: ["Returned"],
};

const statToType = {
  approved: "Approved",
  in_progress: "Return In Progress",
  pending: "Pending Claim",
  completed: "Returned",
};

function MyReturns() {
  const [openLostReport, setOpenLostReport] = useState(false);
  const [openFoundReport, setOpenFoundReport] = useState(false);

  const [returnsList, setReturnsList] = useState(initialReturns);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [activeStat, setActiveStat] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Modal states
  const [selectedItem, setSelectedItem] = useState(null);
  const [contactItem, setContactItem] = useState(null);
  const [markReturnedItem, setMarkReturnedItem] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Auto-dismiss toast
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Tab definitions matching UI sketch counts & labels
  const tabs = useMemo(
    () => [
      {
        value: "all",
        label: "All",
        count: returnsList.length,
      },
      {
        value: "pending",
        label: "Pending",
        count: returnsList.filter((r) => r.status === "Pending Claim").length,
      },
      {
        value: "approved",
        label: "Approved",
        count: returnsList.filter((r) => r.status === "Approved").length,
      },
      {
        value: "in_progress",
        label: "In progress",
        count: returnsList.filter((r) => r.status === "Return In Progress").length,
      },
      {
        value: "completed",
        label: "Completed",
        count: returnsList.filter((r) => r.status === "Returned").length,
      },
    ],
    [returnsList]
  );

  // Dynamic stats calculation
  const computedStats = useMemo(() => {
    return initialStats.map((st) => {
      if (st.id === "approved") {
        return {
          ...st,
          value: String(returnsList.filter((r) => r.status === "Approved").length).padStart(2, "0"),
        };
      }
      if (st.id === "in_progress") {
        return {
          ...st,
          value: String(returnsList.filter((r) => r.status === "Return In Progress").length).padStart(2, "0"),
        };
      }
      if (st.id === "pending") {
        return {
          ...st,
          value: String(returnsList.filter((r) => r.status === "Pending Claim").length).padStart(2, "0"),
        };
      }
      if (st.id === "completed") {
        return {
          ...st,
          value: String(returnsList.filter((r) => r.status === "Returned").length).padStart(2, "0"),
        };
      }
      return st;
    });
  }, [returnsList]);

  // Filter returns based on tab, type, date, search
  const filteredReturns = useMemo(() => {
    const words = searchTerm.trim().toLowerCase();

    return returnsList
      .filter((item) => {
        const allowedStatuses = tabStatusMap[activeTab];
        if (allowedStatuses && !allowedStatuses.includes(item.status)) return false;

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

  const handleConfirmReturned = (itemId, details) => {
    setReturnsList((prev) =>
      prev.map((r) =>
        r.id === itemId
          ? {
              ...r,
              status: "Returned",
              returnedOn: details.returnedOn,
              handoverMethod: details.handoverMethod,
              returnNote: details.note,
            }
          : r
      )
    );
    setToastMessage("Item successfully marked as returned to claimant!");
  };

  const handleApproveClaim = (item) => {
    setReturnsList((prev) =>
      prev.map((r) =>
        r.id === item.id ? { ...r, status: "Approved" } : r
      )
    );
    setToastMessage(`Claim for "${item.title}" has been approved!`);
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
          <MyReturnsUserBar user={currentUser} />

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

          {/* Returns Cards List */}
          <ReturnsList
            returns={visibleReturns}
            onViewDetails={setSelectedItem}
            onContactClaimant={setContactItem}
            onMarkReturned={setMarkReturnedItem}
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

      {/* Return Details Modal */}
      {selectedItem && (
        <ReturnDetailsModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onContactClaimant={setContactItem}
          onMarkReturned={setMarkReturnedItem}
          onApproveClaim={handleApproveClaim}
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

      {/* Mark Returned Modal */}
      {markReturnedItem && (
        <MarkReturnedModal
          item={markReturnedItem}
          onClose={() => setMarkReturnedItem(null)}
          onConfirm={handleConfirmReturned}
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
