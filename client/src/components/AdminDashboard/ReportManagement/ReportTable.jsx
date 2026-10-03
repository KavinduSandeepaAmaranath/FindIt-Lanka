import { useState } from "react";

import {
  reportTableIcons,
  reportTableText,
} from "../../../data/AdminModuleData/ReportManagement";

import {
  approveLostItem,
  rejectLostItem,
  approveFoundItem,
  rejectFoundItem,
} from "../../../services/adminService";

import Pagination from "../Pagination";
import ReportActionModal from "./ReportActionModal";

const ReportTable = ({ reports = [], loading, error, onRefresh }) => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);

  const rowsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(reports.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentReports = reports.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const handleView = (report) => {
    setSelectedReport(report);
  };

  const handleApprove = (report) => {
    setSelectedAction({
      type: "approve",
      report,
    });
  };

  const handleReject = (report) => {
    setSelectedAction({
      type: "reject",
      report,
    });
  };

  // Confirm Approve / Reject action
  const handleConfirmAction = async () => {
    if (!selectedAction) {
      return;
    }

    const { type, report } = selectedAction;
    const isLost = report.type === "Lost";

    try {
      if (type === "approve") {
        if (isLost) {
          await approveLostItem(report.id);
        } else {
          await approveFoundItem(report.id);
        }
      } else if (type === "reject") {
        if (isLost) {
          await rejectLostItem(report.id);
        } else {
          await rejectFoundItem(report.id);
        }
      }

      setSelectedAction(null);
      if (onRefresh) {
        onRefresh();
      }
    } catch (err) {
      console.error("Failed to update report status:", err);
    }
  };

  if (loading) {
    return (
      <div className="mt-8 flex justify-center py-10">
        <p className="text-gray-500 font-medium">
          Loading reports from database...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 flex justify-center py-10">
        <p className="text-red-500 font-medium">
          {error}
        </p>
      </div>
    );
  }

  const columns = [
    { key: "item", label: reportTableText.columns.item, align: "left" },
    { key: "reporter", label: reportTableText.columns.reporter, align: "left" },
    { key: "location", label: reportTableText.columns.location, align: "left" },
    { key: "type", label: reportTableText.columns.type, align: "center" },
    { key: "date", label: reportTableText.columns.date, align: "left" },
    { key: "status", label: reportTableText.columns.status, align: "center" },
    { key: "actions", label: reportTableText.columns.actions, align: "center" },
  ];

  return (
    <>
      <section className="mt-8 w-full">
        {/* table */}
        <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] border-collapse">
              {/* table headers */}
              <thead>
                <tr className="border-b border-gray-300 bg-gray-50">
                  {columns.map((column, index) => (
                    <th
                      key={column.key}
                      className={`px-4 py-4 text-xs font-semibold text-[#2A3B63] underline underline-offset-2 ${
                        column.align === "center" ? "text-center" : "text-left"
                      } ${
                        index !== columns.length - 1 ? "border-r border-gray-300" : ""
                      }`}
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* table body */}
              <tbody>
                {currentReports.map((report) => (
                  <tr
                    key={report.id}
                    className="border-b border-gray-200 transition-all duration-200 hover:bg-blue-50/40"
                  >
                    {/* Item */}
                    <td className="border-r border-gray-200 px-4 py-2.5">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-100">
                          <img
                            src={report.itemImage}
                            alt={report.itemName}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        </div>
                        <span className="whitespace-nowrap text-sm font-medium text-[#29292D]">
                          {report.itemName}
                        </span>
                      </div>
                    </td>

                    {/* Reported by */}
                    <td className="border-r border-gray-200 px-4 py-2.5">
                      <span className="whitespace-nowrap text-sm font-medium text-[#29292D]">
                        {report.reporterName}
                      </span>
                    </td>

                    {/* Location */}
                    <td className="border-r border-gray-200 px-4 py-2.5">
                      <span className="text-sm text-[#29292D]">
                        {report.location}
                      </span>
                    </td>

                    {/* Type */}
                    <td className="border-r border-gray-200 px-4 py-2.5">
                      <div className="flex justify-center">
                        <ReportTypeBadge type={report.type} />
                      </div>
                    </td>

                    {/* Date */}
                    <td className="border-r border-gray-200 px-4 py-2.5">
                      <span className="whitespace-nowrap text-sm text-[#29292D]">
                        {report.date}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="border-r border-gray-200 px-4 py-2.5">
                      <div className="flex justify-center">
                        <ReportStatusBadge status={report.status} />
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-2.5">
                      <div className="flex justify-center">
                        <ReportActions
                          report={report}
                          onView={handleView}
                          onApprove={handleApprove}
                          onReject={handleReject}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty state */}
          {currentReports.length === 0 && (
            <div className="px-6 py-16 text-center">
              <p className="text-base font-semibold text-[#2A3B63]">
                No reports found
              </p>
              <p className="mt-1 text-sm text-[#64748B]">
                Try changing your search or filter options.
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={reports.length}
          rowsPerPage={rowsPerPage}
          onPageChange={setCurrentPage}
          itemName="reports"
        />
      </section>

      {/* Approve / Reject confirmation modal */}
      {selectedAction && (
        <ReportActionModal
          report={selectedAction.report}
          action={selectedAction.type}
          onClose={() => setSelectedAction(null)}
          onConfirm={handleConfirmAction}
        />
      )}

      {/* View Report Details Modal */}
      {selectedReport && (
        <ReportDetailsModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
        />
      )}
    </>
  );
};

/* Report Type Badge */
const ReportTypeBadge = ({ type }) => {
  const isLost = type === "Lost";

  return (
    <span
      className={`inline-flex min-w-[85px] items-center justify-center rounded-full px-3 py-1.5 text-xs font-medium ${
        isLost ? "bg-[#F04450] text-white" : "bg-[#08A568] text-white"
      }`}
    >
      {type}
    </span>
  );
};

/* Report Status Badge */
const ReportStatusBadge = ({ status }) => {
  const statusStyles = {
    Approved: "bg-[#08A568] text-white",
    Pending: "bg-[#2F66E8] text-white",
    Rejected: "bg-[#BE3B40] text-white",
  };

  return (
    <span
      className={`inline-flex min-w-[95px] items-center justify-center rounded-full px-3 py-1.5 text-xs font-medium ${
        statusStyles[status] || "bg-gray-500 text-white"
      }`}
    >
      {status}
    </span>
  );
};

/* Report Actions */
const ReportActions = ({
  report,
  onView,
  onApprove,
  onReject,
}) => {
  const ViewIcon = reportTableIcons.view;
  const ApproveIcon = reportTableIcons.approve;
  const RejectIcon = reportTableIcons.reject;

  const isPending = report.status === "Pending";

  return (
    <div className="flex items-center justify-center gap-2">
      {/* View button */}
      <button
        type="button"
        onClick={() => onView(report)}
        className="
          inline-flex
          items-center
          gap-1
          rounded-full
          bg-[#2563EB]
          px-3
          py-1.5
          text-xs
          font-semibold
          text-white
          transition-all
          duration-200
          hover:bg-[#0F3292]
          hover:shadow-md
          active:scale-95
          focus:outline-none
        "
      >
        <ViewIcon size={13} />
        {reportTableText.actions.view}
      </button>

      {/* Approve & Reject buttons - available ONLY if report status is Pending */}
      {isPending && (
        <>
          <button
            type="button"
            onClick={() => onApprove(report)}
            className="
              inline-flex
              items-center
              gap-1
              rounded-full
              bg-[#009B50]
              px-3
              py-1.5
              text-xs
              font-semibold
              text-white
              transition-all
              duration-200
              hover:bg-[#007A3F]
              hover:shadow-md
              active:scale-95
              focus:outline-none
            "
          >
            <ApproveIcon size={13} />
            {reportTableText.actions.approve}
          </button>

          <button
            type="button"
            onClick={() => onReject(report)}
            className="
              inline-flex
              items-center
              gap-1
              rounded-full
              bg-[#B63838]
              px-3
              py-1.5
              text-xs
              font-semibold
              text-white
              transition-all
              duration-200
              hover:bg-[#8F2C2C]
              hover:shadow-md
              active:scale-95
              focus:outline-none
            "
          >
            <RejectIcon size={13} />
            {reportTableText.actions.reject}
          </button>
        </>
      )}
    </div>
  );
};

/* Report Details Modal */
const ReportDetailsModal = ({ report, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#2A3B63]">
            Report Details
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-[#2A3B63]"
          >
            <XIcon />
          </button>
        </div>

        <img
          src={report.itemImage}
          alt={report.itemName}
          className="mt-5 h-48 w-full rounded-xl object-cover"
          onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/150?text=No+Image"; }}
        />

        <div className="mt-5 space-y-3">
          <Detail label="Item" value={report.itemName} />
          <Detail label="Reported by" value={report.reporterName} />
          <Detail label="Location" value={report.location} />
          <Detail label="Date" value={report.date} />

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[#64748B]">Type</span>
            <ReportTypeBadge type={report.type} />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[#64748B]">Status</span>
            <ReportStatusBadge status={report.status} />
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-[#2563EB] px-4 py-3 text-base font-semibold text-white transition hover:bg-[#0F3292]"
        >
          Close
        </button>
      </div>
    </div>
  );
};

/* Detail */
const Detail = ({ label, value }) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm font-medium text-[#64748B]">{label}</span>
      <span className="text-right text-sm font-medium text-[#29292D]">{value}</span>
    </div>
  );
};

/* Close Icon */
const XIcon = () => {
  const Icon = reportTableIcons.reject;

  return <Icon size={20} />;
};

export default ReportTable;
