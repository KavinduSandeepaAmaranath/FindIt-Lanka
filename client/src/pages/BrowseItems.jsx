import { useState, useMemo, useEffect } from "react";
import DashboardSidebar from "../components/dashboard/DashBoardSidebar";
import BrowseTopbar from "../components/browseItems/BrowseTopbar";
import BrowseHeader from "../components/browseItems/BrowseHeader";
import BrowseFilters from "../components/browseItems/BrowseFilters";
import BrowseTabs from "../components/browseItems/BrowseTabs";
import BrowseItemsGrid from "../components/browseItems/BrowseItemsGrid";
import BrowsePagination from "../components/browseItems/BrowsePagination";
import ReportModal from "../components/LostFoundForm/ReportModal";

import { currentUser } from "../data/dashboardData";
import {
  initialBrowseItems,
  categoryFilterOptions,
  districtFilterOptions,
  locationFilterOptions,
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
  const [locationFilter, setLocationFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);

  const [openLostReport, setOpenLostReport] = useState(false);
  const [openFoundReport, setOpenFoundReport] = useState(false);

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

      // 5. Location filter
      if (
        locationFilter !== "all" &&
        !item.location.toLowerCase().includes(locationFilter.toLowerCase())
      ) {
        return false;
      }

      // 6. Date filter
      if (dateFilter !== "all" && item.rawDate) {
        const days = Number(dateFilter);
        const itemDate = new Date(item.rawDate);
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - days);
        if (itemDate < cutoff) {
          return false;
        }
      }

      // 7. Search keyword
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
    locationFilter,
    dateFilter,
    searchTerm,
  ]);

  // Dynamic counts for tabs based on current search & filter state (excluding tab filter itself)
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
      if (
        locationFilter !== "all" &&
        !item.location.toLowerCase().includes(locationFilter.toLowerCase())
      ) {
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
    locationFilter,
    dateFilter,
    searchTerm,
  ]);

  // Check if any filters are active
  const hasActiveFilters =
    categoryFilter !== "all" ||
    districtFilter !== "all" ||
    locationFilter !== "all" ||
    dateFilter !== "all" ||
    statusFilter !== "all" ||
    Boolean(searchTerm);

  const handleResetFilters = () => {
    setSearchTerm("");
    setCategoryFilter("all");
    setDistrictFilter("all");
    setLocationFilter("all");
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
    locationFilter,
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
          {/* Topbar: Search Bar + Kasun Perera User Profile */}
          <BrowseTopbar
            user={currentUser}
            onSearch={setSearchTerm}
            initialSearchTerm={searchTerm}
          />

          {/* Page Header: Green 3D cube + "Browse Items" + Action Buttons */}
          <BrowseHeader
            onOpenFoundReport={() => setOpenFoundReport(true)}
            onOpenLostReport={() => setOpenLostReport(true)}
          />

          {/* 5 Filter Dropdowns Bar */}
          <BrowseFilters
            category={categoryFilter}
            onCategoryChange={setCategoryFilter}
            categoryOptions={categoryFilterOptions}
            district={districtFilter}
            onDistrictChange={setDistrictFilter}
            districtOptions={districtFilterOptions}
            location={locationFilter}
            onLocationChange={setLocationFilter}
            locationOptions={locationFilterOptions}
            date={dateFilter}
            onDateChange={setDateFilter}
            dateOptions={dateFilterOptions}
            status={statusFilter}
            onStatusChange={setStatusFilter}
            statusOptions={statusFilterOptions}
            onResetFilters={handleResetFilters}
            hasActiveFilters={hasActiveFilters}
          />

          {/* Tab Pills Bar: All Items, Lost Items, Found Items */}
          <BrowseTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            counts={tabCounts}
          />

          {/* 4-Column Responsive Items Grid */}
          <BrowseItemsGrid
            items={visibleItems}
            onResetFilters={handleResetFilters}
          />

          {/* Pagination Controls */}
          <BrowsePagination
            currentPage={safePage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {/* Modals for Reporting Lost and Found Items */}
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
