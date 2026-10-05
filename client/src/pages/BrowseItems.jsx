import { useState, useMemo, useEffect } from "react";
import DashboardSidebar from "../components/dashboard/DashBoardSidebar";
import BrowseTopbar from "../components/browseItems/BrowseTopbar";
import BrowseHeader from "../components/browseItems/BrowseHeader";
import BrowseFilters from "../components/browseItems/BrowseFilters";
import BrowseTabs from "../components/browseItems/BrowseTabs";
import BrowseItemsGrid from "../components/browseItems/BrowseItemsGrid";
import BrowsePagination from "../components/browseItems/BrowsePagination";
import ReportModal from "../components/LostFoundForm/ReportModal";

// Modals for Lost Items Flow
import LostItemDetailsModal from "../components/browseItems/LostItemDetailsModal";
import ReportMethodModal from "../components/browseItems/ReportMethodModal";
import EligibleFoundReportsModal from "../components/browseItems/EligibleFoundReportsModal";

// Modals for Found Items Flow
import FoundItemDetailsModal from "../components/browseItems/FoundItemDetailsModal";
import ReportLostMethodModal from "../components/browseItems/ReportLostMethodModal";
import EligibleLostReportsModal from "../components/browseItems/EligibleLostReportsModal";

import { currentUser } from "../data/dashboardData";
import { getAllApprovedLostItems } from "../services/lostItemService.js";
import { getAllApprovedFoundItems } from "../services/foundItemService.js";
import { createClaim } from "../services/claimService.js";
import {
  initialBrowseItems,
  categoryFilterOptions,
  districtFilterOptions,
  dateFilterOptions,
  statusFilterOptions,
  ITEMS_PER_PAGE,
} from "../data/browseItemsData";

import {
  reportHeader as lostHeader,
  reportForm as lostForm,
} from "../data/ReportLost";

import {
  reportHeader as foundHeader,
  reportForm as foundForm,
} from "../data/ReportFound";

function BrowseItems() {
    const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchLiveItems = async () => {
      try {
        const [lostRes, foundRes] = await Promise.all([
          getAllApprovedLostItems().catch(() => null),
          getAllApprovedFoundItems().catch(() => null),
        ]);

        const lostItems = (lostRes?.lostItems || []).map((item) => ({
          ...item,
          id: item._id,
          status: "Lost",
          reportType: "Lost Item",
          date: new Date(item.lostDate || item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
          rawDate: (item.lostDate || item.createdAt || "").split("T")[0],
          image: item.images && item.images.length > 0 ? `http://localhost:5000/${item.images[0]}` : null,
          images: item.images ? item.images.map(img => `http://localhost:5000/${img}`) : [],
        }));

        const foundItems = (foundRes?.foundItems || []).map((item) => ({
          ...item,
          id: item._id,
          status: "Found",
          reportType: "Found Item",
          date: new Date(item.foundDate || item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
          rawDate: (item.foundDate || item.createdAt || "").split("T")[0],
          image: item.images && item.images.length > 0 ? `http://localhost:5000/${item.images[0]}` : null,
          images: item.images ? item.images.map(img => `http://localhost:5000/${img}`) : [],
        }));

        const liveCombined = [...lostItems, ...foundItems];
        if (liveCombined.length > 0) {
          setItems(liveCombined);
        }
      } catch (err) {
        console.error("Error fetching live approved items:", err);
      }
    };

    fetchLiveItems();
  }, []);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const [categoryFilter, setCategoryFilter] = useState("all");
  const [districtFilter, setDistrictFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);

  const [openLostReport, setOpenLostReport] = useState(false);
  const [openFoundReport, setOpenFoundReport] = useState(false);

  // Modals for Lost Items Flow (Return Item)
  const [selectedLostItem, setSelectedLostItem] = useState(null);
  const [isReportMethodOpen, setIsReportMethodOpen] = useState(false);
  const [isEligibleReportsOpen, setIsEligibleReportsOpen] = useState(false);

  // Modals for Found Items Flow (Claim Item)
  const [selectedFoundItem, setSelectedFoundItem] = useState(null);
  const [isLostMethodOpen, setIsLostMethodOpen] = useState(false);
  const [isEligibleLostReportsOpen, setIsEligibleLostReportsOpen] = useState(false);

  // Toast Notification
  const [submissionToast, setSubmissionToast] = useState("");

  // Filter items according to search, dropdowns, and active tab
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // 1. Tab filter (All, Lost, Found)
      if (activeTab !== "all" && item.status.toLowerCase() !== activeTab.toLowerCase()) {
        return false;
      }

      // 2. Dropdown Status filter
      if (statusFilter !== "all" && item.status.toLowerCase() !== statusFilter.toLowerCase()) {
        return false;
      }

      // 3. Category filter
      if (categoryFilter !== "all" && item.category !== categoryFilter) {
        return false;
      }

      // 4. District filter
      if (districtFilter !== "all" && item.district !== districtFilter) {
        return false;
      }

      // 5. Date filter
      if (dateFilter !== "all" && item.rawDate) {
        const days = Number(dateFilter);
        const itemDate = new Date(item.rawDate);
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - days);
        if (itemDate < cutoff) {
          return false;
        }
      }

      // 6. Search keyword
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const haystack = `${item.title} ${item.category} ${item.location} ${item.district} ${item.status}`.toLowerCase();
        if (!haystack.includes(query)) {
          return false;
        }
      }

      return true;
    });
  }, [
    items,
    activeTab,
    statusFilter,
    categoryFilter,
    districtFilter,
    dateFilter,
    searchTerm,
  ]);

  // Dynamic counts for tabs based on current search & filter state
  const tabCounts = useMemo(() => {
    const baseItems = items.filter((item) => {
      if (statusFilter !== "all" && item.status.toLowerCase() !== statusFilter.toLowerCase()) {
        return false;
      }
      if (categoryFilter !== "all" && item.category !== categoryFilter) {
        return false;
      }
      if (districtFilter !== "all" && item.district !== districtFilter) {
        return false;
      }
      if (dateFilter !== "all" && item.rawDate) {
        const days = Number(dateFilter);
        const itemDate = new Date(item.rawDate);
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - days);
        if (itemDate < cutoff) {
          return false;
        }
      }
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const haystack = `${item.title} ${item.category} ${item.location} ${item.district} ${item.status}`.toLowerCase();
        if (!haystack.includes(query)) {
          return false;
        }
      }
      return true;
    });

    const lost = baseItems.filter((i) => i.status.toLowerCase() === "lost").length;
    const found = baseItems.filter((i) => i.status.toLowerCase() === "found").length;

    return {
      all: baseItems.length,
      lost,
      found,
    };
  }, [
    items,
    statusFilter,
    categoryFilter,
    districtFilter,
    dateFilter,
    searchTerm,
  ]);

  // Check if any filters are active
  const hasActiveFilters =
    categoryFilter !== "all" ||
    districtFilter !== "all" ||
    dateFilter !== "all" ||
    statusFilter !== "all" ||
    Boolean(searchTerm);

  const handleResetFilters = () => {
    setSearchTerm("");
    setCategoryFilter("all");
    setDistrictFilter("all");
    setDateFilter("all");
    setStatusFilter("all");
    setActiveTab("all");
    setCurrentPage(1);
  };

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [
    activeTab,
    statusFilter,
    categoryFilter,
    districtFilter,
    dateFilter,
    searchTerm,
  ]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / ITEMS_PER_PAGE));
  const safePage = Math.min(Math.max(1, currentPage), totalPages);
  const visibleItems = filteredItems.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // View Details Click: route to Lost or Found modal based on item.status
  const handleViewDetails = (item) => {
    if (item.status === "Lost") {
      setSelectedLostItem(item);
    } else if (item.status === "Found") {
      setSelectedFoundItem(item);
    }
  };

  /* ============================================================
     LOST ITEM FLOW (Return Item)
  ============================================================ */
  const handleReturnItem = () => {
    setIsReportMethodOpen(true);
  };

  const handleSelectMyReport = () => {
    setIsReportMethodOpen(false);
    setIsEligibleReportsOpen(true);
  };

  const handleCreateNewFoundReport = () => {
    setIsReportMethodOpen(false);
    setOpenFoundReport(true);
  };

  const handleSubmitEligibleReport = async (report) => {
    try {
      const lostItemId = selectedLostItem?._id || selectedLostItem?.id;
      const foundItemId = report?._id || report?.id;

      if (!lostItemId || !foundItemId) {
        throw new Error("Missing lost item or found report details.");
      }

      await createClaim({
        lostItemId,
        foundItemId,
        message: `I have found an item matching your lost report "${selectedLostItem?.title || "Lost Item"}" and would like to return it.`,
      });

      setIsEligibleReportsOpen(false);
      setSelectedLostItem(null);
      setSubmissionToast(
        `Successfully submitted return request for "${selectedLostItem?.title || "Lost Item"}"!`
      );
    } catch (err) {
      console.error("Error creating return claim:", err);
      const errMsg = err.response?.data?.message || err.message || "Failed to submit return request.";
      setIsEligibleReportsOpen(false);
      setSelectedLostItem(null);
      setSubmissionToast(`Note: ${errMsg}`);
    }
    setTimeout(() => {
      setSubmissionToast("");
    }, 4500);
  };

  /* ============================================================
     FOUND ITEM FLOW (Claim Item)
  ============================================================ */
  const handleClaimItem = () => {
    setIsLostMethodOpen(true);
  };

  const handleSelectMyLostReport = () => {
    setIsLostMethodOpen(false);
    setIsEligibleLostReportsOpen(true);
  };

  const handleCreateNewLostReport = () => {
    setIsLostMethodOpen(false);
    setOpenLostReport(true); // Links directly to "Add Lost Reports" page/modal!
  };

  const handleSubmitEligibleLostReport = async (report) => {
    try {
      const foundItemId = selectedFoundItem?._id || selectedFoundItem?.id;
      const lostItemId = report?._id || report?.id;

      if (!foundItemId || !lostItemId) {
        throw new Error("Missing found item or lost report details.");
      }

      await createClaim({
        foundItemId,
        lostItemId,
        message: `I am claiming ownership for "${selectedFoundItem?.title || "Found Item"}" via my lost item report.`,
      });

      setIsEligibleLostReportsOpen(false);
      setSelectedFoundItem(null);
      setSubmissionToast(
        `Successfully submitted claim for "${selectedFoundItem?.title || "Found Item"}"!`
      );
    } catch (err) {
      console.error("Error creating claim:", err);
      const errMsg = err.response?.data?.message || err.message || "Failed to submit claim.";
      setIsEligibleLostReportsOpen(false);
      setSelectedFoundItem(null);
      setSubmissionToast(`Note: ${errMsg}`);
    }
    setTimeout(() => {
      setSubmissionToast("");
    }, 4500);
  };

  return (
    <div className="flex bg-slate-50 min-h-screen">
      {/* Sidebar with active link highlighting */}
      <DashboardSidebar
        onOpenLostReport={() => setOpenLostReport(true)}
        onOpenFoundReport={() => setOpenFoundReport(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 pt-[60px] lg:pt-0">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-10 py-7 space-y-6">
          {/* Success Toast Notification */}
          {submissionToast && (
            <div className="fixed top-5 right-5 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
              <span className="w-2 h-2 rounded-full bg-white shrink-0" />
              <p className="text-xs sm:text-sm font-semibold">{submissionToast}</p>
              <button
                type="button"
                onClick={() => setSubmissionToast("")}
                className="ml-2 text-white/80 hover:text-white text-xs cursor-pointer font-bold"
              >
                ✕
              </button>
            </div>
          )}

          {/* Topbar: Search Bar + Kasun Perera User Profile */}
          <BrowseTopbar
            user={undefined}
            onSearch={setSearchTerm}
            initialSearchTerm={searchTerm}
          />

          {/* Page Header: Green 3D cube + "Browse Items" + Action Buttons */}
          <BrowseHeader
            onOpenFoundReport={() => setOpenFoundReport(true)}
            onOpenLostReport={() => setOpenLostReport(true)}
          />

          {/* 4 Filter Dropdowns Bar */}
          <div className="relative z-30">
            <BrowseFilters
              category={categoryFilter}
              onCategoryChange={setCategoryFilter}
              categoryOptions={categoryFilterOptions}
              district={districtFilter}
              onDistrictChange={setDistrictFilter}
              districtOptions={districtFilterOptions}
              date={dateFilter}
              onDateChange={setDateFilter}
              dateOptions={dateFilterOptions}
              status={statusFilter}
              onStatusChange={setStatusFilter}
              statusOptions={statusFilterOptions}
              onResetFilters={handleResetFilters}
              hasActiveFilters={hasActiveFilters}
            />
          </div>

          {/* Tab Pills Bar: All Items, Lost Items, Found Items */}
          <div className="relative z-10">
            <BrowseTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              counts={tabCounts}
            />
          </div>

          {/* 4-Column Responsive Items Grid */}
          <div className="relative z-0">
            <BrowseItemsGrid
              items={visibleItems}
              onResetFilters={handleResetFilters}
              onViewDetails={handleViewDetails}
            />
          </div>

          {/* Pagination Controls */}
          <BrowsePagination
            currentPage={safePage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {/* ============================================================
          LOST ITEM MODALS (Return Flow)
      ============================================================ */}
      {selectedLostItem && (
        <LostItemDetailsModal
          item={selectedLostItem}
          onClose={() => setSelectedLostItem(null)}
          onReturnItem={handleReturnItem}
        />
      )}

      {isReportMethodOpen && (
        <ReportMethodModal
          onClose={() => setIsReportMethodOpen(false)}
          onSelectMyReport={handleSelectMyReport}
          onCreateNewReport={handleCreateNewFoundReport}
        />
      )}

      {isEligibleReportsOpen && (
        <EligibleFoundReportsModal
          onClose={() => setIsEligibleReportsOpen(false)}
          onSubmit={handleSubmitEligibleReport}
        />
      )}

      {/* ============================================================
          FOUND ITEM MODALS (Claim Flow)
      ============================================================ */}
      {selectedFoundItem && (
        <FoundItemDetailsModal
          item={selectedFoundItem}
          onClose={() => setSelectedFoundItem(null)}
          onClaimItem={handleClaimItem}
        />
      )}

      {isLostMethodOpen && (
        <ReportLostMethodModal
          onClose={() => setIsLostMethodOpen(false)}
          onSelectMyReport={handleSelectMyLostReport}
          onCreateNewReport={handleCreateNewLostReport}
        />
      )}

      {isEligibleLostReportsOpen && (
        <EligibleLostReportsModal
          onClose={() => setIsEligibleLostReportsOpen(false)}
          onSubmit={handleSubmitEligibleLostReport}
        />
      )}

      {/* Sidebar & Action Header Report Modals */}
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

export default BrowseItems;
