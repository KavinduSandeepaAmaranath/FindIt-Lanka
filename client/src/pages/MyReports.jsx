import { useState, useMemo, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { getDashboardStatistics, getMyLostItems, getMyFoundItems } from "../services/dashboardService.js";
import { deleteLostItem } from "../services/lostItemService.js";
import { deleteFoundItem } from "../services/foundItemService.js";

import DashboardSidebar from "../components/dashboard/DashBoardSidebar";
import DashboardTopbar from "../components/dashboard/DashboardTopbar";

import MyReportsHeader from "../components/dashboard/myReports/MyReportsHeader";
import MyReportsStats from "../components/dashboard/myReports/MyReportsStats";
import MyReportsFilters from "../components/dashboard/myReports/MyReportsFilters";
import MyReportsTabs from "../components/dashboard/myReports/MyReportsTabs";
import ReportsList from "../components/dashboard/myReports/ReportsList";
import MyReportsPagination from "../components/dashboard/myReports/MyReportsPagination";
import ReportDetailsModal from "../components/dashboard/myReports/ReportDetailsModal";

import ReportModal from "../components/LostFoundForm/ReportModal";

import { currentUser } from "../data/dashboardData";

import {
  myReports as mockReports,
  dateFilterOptions,
  statusFilterOptions,
  REPORTS_PER_PAGE,
} from "../data/myReportsData";

import {
  reportHeader as lostHeader,
  reportForm as lostForm,
} from "../data/ReportLost";

import {
  reportHeader as foundHeader,
  reportForm as foundForm,
} from "../data/ReportFound";

/*status card for status filter mapping*/
const statToStatus = {
  total: "all",
  active: "Under Review",
  recovered: "Resolved",
  pending: "Pending",
  rejected: "Rejected",
};

function MyReports() {
  const [openLostReport, setOpenLostReport] = useState(false);
  const [openFoundReport, setOpenFoundReport] = useState(false);

  const [activeTab, setActiveTab] = useState("all");

  const [searchTerm, setSearchTerm] = useState("");
  const [searchDraft, setSearchDraft] = useState("");

  const [dateFilter, setDateFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [activeStat, setActiveStat] = useState("total");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReport, setSelectedReport] = useState(null);
  const [editingReport, setEditingReport] = useState(null);

  const [reportsList, setReportsList] = useState([]);
  const [liveStats, setLiveStats] = useState(null);

  const fetchBackendData = useCallback(async () => {
    try {
      const [statsRes, lostRes, foundRes] = await Promise.all([
        getDashboardStatistics().catch(() => null),
        getMyLostItems().catch(() => null),
        getMyFoundItems().catch(() => null),
      ]);

      if (statsRes?.statistics) {
        setLiveStats(statsRes.statistics);
      }

      const lostItems = lostRes?.lostItems || [];
      const foundItems = foundRes?.foundItems || [];

      const formatBackendItem = (item, type) => {
        let statusLabel = "Under Review";
        if (item.status === "recovered" || item.status === "returned" || item.status === "closed") {
          statusLabel = "Resolved";
        } else if (item.status === "claimed") {
          statusLabel = "Claimed";
        } else if (item.approvalStatus === "rejected") {
          statusLabel = "Rejected";
        } else if (item.approvalStatus === "pending") {
          statusLabel = "Pending";
        } else if (item.approvalStatus === "approved") {
          statusLabel = "Under Review";
        }

        const rawImg = item.images && item.images.length > 0 ? item.images[0] : null;
        let imageUrl = "https://via.placeholder.com/150?text=No+Image";
        if (rawImg) {
          imageUrl = rawImg.startsWith("http")
            ? rawImg
            : `http://localhost:5000${rawImg.startsWith("/") ? "" : "/"}${rawImg}`;
        }

        const refNum = item._id ? `FL-2026-${item._id.slice(-4).toUpperCase()}` : "FL-2026-0000";

        return {
          id: item._id,
          title: item.title,
          location: item.location || item.district || "Location not specified",
          district: item.district || "",
          reportType: type,
          reportedOn: item.lostDate || item.foundDate || item.createdAt,
          approvedOn: item.approvalStatus === "approved" ? item.updatedAt : null,
          resolvedOn: item.status === "recovered" || item.status === "returned" || item.status === "closed" ? item.updatedAt : null,
          claimedOn: item.status === "claimed" ? item.updatedAt : null,
          rejectedOn: item.approvalStatus === "rejected" ? item.updatedAt : null,
          rejectionReason: item.rejectionReason || item.rejectReason || item.rejection_reason || "",
          time: item.lostTime || item.foundTime || item.time,
          description: item.description,
          status: statusLabel,
          approvalStatus: item.approvalStatus,
          image: imageUrl,
          images: item.images || (rawImg ? [rawImg] : []),
          custodyStatus: item.custodyStatus || "with_me",
          category: item.category || "General",
          referenceNo: refNum,
          rawItem: item,
        };
      };

      const formattedLost = lostItems.map((item) => formatBackendItem(item, "Lost Item"));
      const formattedFound = foundItems.map((item) => formatBackendItem(item, "Found Item"));
      const allFetched = [...formattedLost, ...formattedFound];

      if (allFetched.length > 0) {
        setReportsList(allFetched);
      }
    } catch (err) {
      console.warn("Could not fetch user backend items:", err);
    }
  }, []);

  useEffect(() => {
    fetchBackendData();
  }, [fetchBackendData]);

  const dynamicReportStats = useMemo(() => {
    const total = liveStats?.totalReports ?? reportsList.length;
    const active = liveStats?.activeCases ?? reportsList.filter((r) => r.status === "Under Review" || r.status === "Active" || r.status === "Approved").length;
    const recovered = liveStats?.recoveredItems ?? reportsList.filter((r) => r.status === "Resolved" || r.status === "Recovered").length;
    const pending = liveStats?.pendingReports ?? reportsList.filter((r) => r.status === "Pending" || r.status === "Under Review").length;
    const rejected = liveStats?.rejectedReports ?? reportsList.filter((r) => r.status === "Rejected").length;
    const thisMonth = liveStats?.thisMonthCount ?? 2;

    const formatVal = (val) => (val < 10 ? `0${val}` : `${val}`);

    return [
      {
        id: "total",
        label: "Total Reports",
        value: formatVal(total),
        note: `+${thisMonth} this month`,
        icon: "total",
        accent: "blue",
      },
      {
        id: "active",
        label: "Active Reports",
        value: formatVal(active),
        note: "still being processed",
        icon: "active",
        accent: "blue",
      },
      {
        id: "recovered",
        label: "Recovered",
        value: formatVal(recovered),
        note: "successfully recovered",
        icon: "recovered",
        accent: "emerald",
      },
      {
        id: "pending",
        label: "Pending",
        value: formatVal(pending),
        note: "Review Required",
        icon: "pending",
        accent: "orange",
      },
      {
        id: "rejected",
        label: "Rejected",
        value: formatVal(rejected),
        note: "rejected by admin",
        icon: "rejected",
        accent: "rose",
      },
    ];
  }, [liveStats, reportsList]);

  const tabs = useMemo(
    () => [
      {
        value: "all",
        label: "All Reports",
        count: reportsList.length,
      },
      {
        value: "Lost Item",
        label: "Lost Reports",
        count: reportsList.filter(
          (r) => r.reportType === "Lost Item"
        ).length,
      },
      {
        value: "Found Item",
        label: "Found Reports",
        count: reportsList.filter(
          (r) => r.reportType === "Found Item"
        ).length,
      },
    ],
    [reportsList]
  );

  const filteredReports = useMemo(() => {
    const words = searchTerm.trim().toLowerCase();

    return reportsList
      .filter((report) => {
        if (
          activeTab !== "all" &&
          report.reportType !== activeTab
        ) {
          return false;
        }

        if (
          statusFilter !== "all" &&
          report.status?.toLowerCase() !== statusFilter?.toLowerCase()
        ) {
          return false;
        }

        if (dateFilter !== "all") {
          const days = Number(dateFilter);
          const limit = new Date();

          limit.setDate(limit.getDate() - days);

          if (new Date(report.reportedOn) < limit) {
            return false;
          }
        }

        if (words) {
          const haystack = [
            report.title,
            report.location,
            report.description,
            report.category,
            report.referenceNo,
            report.reportType,
            report.status,
          ]
            .join(" ")
            .toLowerCase();

          if (!haystack.includes(words)) {
            return false;
          }
        }

        return true;
      })
      .sort(
        (a, b) =>
          new Date(b.reportedOn) - new Date(a.reportedOn)
      );
  }, [
    reportsList,
    activeTab,
    searchTerm,
    dateFilter,
    statusFilter,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredReports.length / REPORTS_PER_PAGE
    )
  );

  /*go back to page 1 when filters change*/
  useEffect(() => {
    setCurrentPage(1);
  }, [
    activeTab,
    searchTerm,
    dateFilter,
    statusFilter,
  ]);

  const safePage = Math.min(Math.max(1, currentPage), totalPages);
  const visibleReports = filteredReports.slice(
    (safePage - 1) * REPORTS_PER_PAGE,
    safePage * REPORTS_PER_PAGE
  );

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(searchDraft.trim());
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchDraft(value);
    setSearchTerm(value.trim());
  };

  const handleClearSearch = () => {
    setSearchDraft("");
    setSearchTerm("");
  };

  const handleResetFilters = () => {
    setSearchDraft("");
    setSearchTerm("");
    setDateFilter("all");
    setStatusFilter("all");
    setActiveTab("all");
    setActiveStat("total");
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSelectStat = (statId) => {
    setActiveStat(statId);
    setStatusFilter(statToStatus[statId] ?? "all");
  };

  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);

    const matchedStat = Object.keys(statToStatus).find(
      (key) => statToStatus[key] === value
    );

    setActiveStat(matchedStat || null);
  };

  return (
    <div className="flex bg-slate-50">
      <DashboardSidebar
        onOpenLostReport={() => setOpenLostReport(true)}
        onOpenFoundReport={() => setOpenFoundReport(true)}
      />

      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex-1 min-w-0 pt-[60px] lg:pt-0"
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-8 space-y-8">

          {/* Header & User Profile Topbar in one aligned row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <MyReportsHeader />
            <DashboardTopbar
              user={undefined}
              hideSearch
            />
          </div>

          {/* Statistics overview cards */}
          <MyReportsStats
            stats={dynamicReportStats}
            activeStat={activeStat}
            onSelectStat={handleSelectStat}
          />

          {/* Search Bar & Custom Filters Toolbar */}
          <MyReportsFilters
            searchDraft={searchDraft}
            onSearchChange={handleSearchChange}
            onSearchSubmit={handleSearchSubmit}
            onClearSearch={handleClearSearch}
            dateFilter={dateFilter}
            onDateFilterChange={setDateFilter}
            statusFilter={statusFilter}
            onStatusFilterChange={handleStatusFilterChange}
            dateOptions={dateFilterOptions}
            statusOptions={statusFilterOptions}
          />

          {/*report type tabs*/}
          <MyReportsTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {/*reports*/}
          <ReportsList
            reports={visibleReports}
            onViewDetails={setSelectedReport}
            onResetFilters={handleResetFilters}
          />

          {/*pagination*/}
          <MyReportsPagination
            currentPage={safePage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </motion.main>

      {/*report details popup*/}
      {selectedReport && (
        <ReportDetailsModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
          onEdit={(report) => {
            setSelectedReport(null);
            setEditingReport(report);
          }}
          onDelete={async (reportToDelete) => {
            const isLost =
              (reportToDelete.reportType || "").toLowerCase().includes("lost") ||
              (reportToDelete.type || "").toLowerCase().includes("lost");

            if (isLost) {
              await deleteLostItem(reportToDelete.id);
            } else {
              await deleteFoundItem(reportToDelete.id);
            }

            setSelectedReport(null);
            await fetchBackendData();
          }}
        />
      )}

      {/*edit report modal*/}
      {editingReport && (
        <ReportModal
          header={
            (editingReport.reportType || "").toLowerCase().includes("lost")
              ? lostHeader
              : foundHeader
          }
          formData={
            (editingReport.reportType || "").toLowerCase().includes("lost")
              ? lostForm
              : foundForm
          }
          editItem={editingReport}
          onClose={() => setEditingReport(null)}
          onSuccess={() => {
            fetchBackendData();
          }}
        />
      )}

      {/*sidebar quick report modals*/}
      {openLostReport && (
        <ReportModal
          header={lostHeader}
          formData={lostForm}
          onClose={() => setOpenLostReport(false)}
          onSuccess={() => {
            fetchBackendData();
          }}
        />
      )}

      {openFoundReport && (
        <ReportModal
          header={foundHeader}
          formData={foundForm}
          onClose={() => setOpenFoundReport(false)}
          onSuccess={() => {
            fetchBackendData();
          }}
        />
      )}
    </div>
  );
}

export default MyReports;
