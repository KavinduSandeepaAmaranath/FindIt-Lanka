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
  const [items] = useState(initialBrowseItems);
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

  const [submissionToast, setSubmissionToast] = useState("");

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Tab filter
      if (activeTab !== "all" && item.status.toLowerCase() !== activeTab.toLowerCase()) {
        return false;
      }

      // Dropdown Status filter
      if (statusFilter !== "all" && item.status.toLowerCase() !== statusFilter.toLowerCase()) {
        return false;
      }

      // category filter
      if (categoryFilter !== "all" && item.category !== categoryFilter) {
        return false;
      }

      // District filter
      if (districtFilter !== "all" && item.district !== districtFilter) {
        return false;
      }

      // Date filter
      if (dateFilter !== "all" && item.rawDate) {
        const days = Number(dateFilter);
        const itemDate = new Date(item.rawDate);
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - days);
        if (itemDate < cutoff) {
          return false;
        }
      }

      // Search keyword
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

  // Dynamic counts
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

  const handleViewDetails = (item) => {
    if (item.status === "Lost") {
      setSelectedLostItem(item);
    } else if (item.status === "Found") {
      setSelectedFoundItem(item);
    }
  };

  const handleReturnItem = () => {
    setSelectedLostItem(null);
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

  const handleSubmitEligibleReport = (report) => {
    setIsEligibleReportsOpen(false);
    setSubmissionToast(
      `Successfully linked found report "${report?.title || "Found Item"}" for return!`
    );
    setTimeout(() => {
      setSubmissionToast("");
    }, 4500);
  };

  const handleClaimItem = () => {
    setSelectedFoundItem(null);
    setIsLostMethodOpen(true);
  };

  const handleSelectMyLostReport = () => {
    setIsLostMethodOpen(false);
    setIsEligibleLostReportsOpen(true);
  };

  const handleCreateNewLostReport = () => {
    setIsLostMethodOpen(false);
    setOpenLostReport(true);
  };

  const handleSubmitEligibleLostReport = (report) => {
    setIsEligibleLostReportsOpen(false);
    setSubmissionToast(
      `Successfully linked your lost report "${report?.title || "Lost Item"}" for claiming!`
    );
    setTimeout(() => {
      setSubmissionToast("");
    }, 4500);
  };

  return (
    <div className="flex bg-slate-50 min-h-screen">
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

          {/* Search Bar + Kasun Perera User Profile */}
          <BrowseTopbar
            user={currentUser}
            onSearch={setSearchTerm}
            initialSearchTerm={searchTerm}
          />

          <BrowseHeader
            onOpenFoundReport={() => setOpenFoundReport(true)}
            onOpenLostReport={() => setOpenLostReport(true)}
          />

          {/*Filter Dropdowns Bar */}
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

          {/*All Items, Lost Items, Found Items */}
          <div className="relative z-10">
            <BrowseTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              counts={tabCounts}
            />
          </div>

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
