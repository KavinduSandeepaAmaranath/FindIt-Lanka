import { useState, useMemo, useEffect } from "react";

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
  myReports,
  reportStats,
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

/*stat card -> status filter mapping*/
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
  const [dateFilter, setDateFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeStat, setActiveStat] = useState("total");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReport, setSelectedReport] = useState(null);

  /*tab counts always come from the full list*/
  const tabs = useMemo(
    () => [
      { value: "all", label: "All Reports", count: myReports.length },
      {
        value: "Lost Item",
        label: "Lost Reports",
        count: myReports.filter((r) => r.reportType === "Lost Item").length,
      },
      {
        value: "Found Item",
        label: "Found Reports",
        count: myReports.filter((r) => r.reportType === "Found Item").length,
      },
    ],
    []
  );

  /*apply tab + search + date + status filters*/
  const filteredReports = useMemo(() => {
    const words = searchTerm.trim().toLowerCase();

    return myReports
      .filter((report) => {
        if (activeTab !== "all" && report.reportType !== activeTab) return false;

        if (statusFilter !== "all" && report.status !== statusFilter)
          return false;

        if (dateFilter !== "all") {
          const days = Number(dateFilter);
          const limit = new Date();
          limit.setDate(limit.getDate() - days);
          if (new Date(report.reportedOn) < limit) return false;
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

          if (!haystack.includes(words)) return false;
        }

        return true;
      })
      .sort((a, b) => new Date(b.reportedOn) - new Date(a.reportedOn));
  }, [activeTab, searchTerm, dateFilter, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredReports.length / REPORTS_PER_PAGE)
  );

  /*go back to page 1 whenever the filters change*/
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchTerm, dateFilter, statusFilter]);

  const visibleReports = filteredReports.slice(
    (currentPage - 1) * REPORTS_PER_PAGE,
    currentPage * REPORTS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
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

      <div className="flex-1 min-w-0 pt-[60px] lg:pt-0">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-8 space-y-8">
          <DashboardTopbar user={currentUser} />

          <MyReportsHeader />

          <MyReportsStats
            stats={reportStats}
            activeStat={activeStat}
            onSelectStat={handleSelectStat}
          />

          <MyReportsFilters
            searchTerm={searchTerm}
            onSearch={setSearchTerm}
            dateFilter={dateFilter}
            onDateFilterChange={setDateFilter}
            statusFilter={statusFilter}
            onStatusFilterChange={handleStatusFilterChange}
            dateOptions={dateFilterOptions}
            statusOptions={statusFilterOptions}
          />

          <MyReportsTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <ReportsList
            reports={visibleReports}
            onViewDetails={setSelectedReport}
          />

          <MyReportsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {/*report details popup*/}
      {selectedReport && (
        <ReportDetailsModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
        />
      )}

      {/*sidebar quick report modals*/}
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

export default MyReports;
