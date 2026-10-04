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
  const handleConfirmAction = async (payload) => {
    if (!selectedAction) {
      return;
    }

    const { type, report } = selectedAction;
    const typeStr = (report.type || "").toLowerCase();
    const isLost = typeStr.includes("lost");

    try {
      if (type === "approve") {
        if (isLost) {
          await approveLostItem(report.id);
        } else {
          await approveFoundItem(report.id);
        }
      } else if (type === "reject") {
        const rejectionReason = typeof payload === "string" ? payload : "";
        if (isLost) {
          await rejectLostItem(report.id, rejectionReason);
        } else {
          await rejectFoundItem(report.id, rejectionReason);
        }
      }
    } catch (err) {
      console.error("Primary report action failed, trying alternative item type...", err);
      try {
        const rejectionReason = typeof payload === "string" ? payload : "";
        if (type === "reject") {
          if (isLost) {
            await rejectFoundItem(report.id, rejectionReason);
          } else {
            await rejectLostItem(report.id, rejectionReason);
          }
        } else if (type === "approve") {
          if (isLost) {
            await approveFoundItem(report.id);
          } else {
            await approveLostItem(report.id);
          }
        }
      } catch (fallbackErr) {
        console.error("Fallback report action also failed:", fallbackErr);
      }
    } finally {
      setSelectedAction(null);
      if (onRefresh) {
        try {
          await onRefresh();
        } catch (e) {
          console.error("Failed refreshing reports table:", e);
        }
      }
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
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
        px-4
        py-6
        backdrop-blur-sm
      "
      onClick={onClose}
    >
      <div
        className="
          w-full
          max-w-[350px]
          rounded-2xl
          border-[10px]
          border-[#0F3292]
          bg-white
          px-4
          py-5
          shadow-2xl
          sm:max-w-[370px]
        "
        onClick={(event) => event.stopPropagation()}
      >
        {/* title */}
        <h2
          className="
            mb-2
            text-[24px]
            font-semibold
            text-[#2A3B63]
          "
        >
          Report Details
        </h2>

        {/* item summary */}
        <div
          className="
            flex
            items-center
            gap-3
            rounded-xl
            border
            border-gray-300
            bg-gray-50
            p-3
          "
        >
          {/* item image */}
          <div
            className="
              h-[90px]
              w-[90px]
              shrink-0
              overflow-hidden
              rounded-lg
              bg-gray-100
            "
          >
            <img
              src={report.itemImage}
              alt={report.itemName}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/150?text=No+Image";
              }}
            />
          </div>

          {/* summary details */}
          <div className="space-y-1 text-sm min-w-0 flex-1">
            <p className="font-medium text-[#173B80] truncate">
              {report.itemName}
            </p>

            <p className="text-[#173B80]">
              <span className="mr-2">Type:</span>
              <span
                className={
                  report.type === "Lost"
                    ? "font-semibold text-[#BE3B40]"
                    : "font-semibold text-[#08A568]"
                }
              >
                {report.type}
              </span>
            </p>

            <p className="text-[#173B80]">
              <span className="mr-2">Status:</span>
              <span
                className={
                  report.status === "Approved"
                    ? "font-semibold text-[#08A568]"
                    : report.status === "Pending"
                    ? "font-semibold text-[#2F66E8]"
                    : "font-semibold text-[#BE3B40]"
                }
              >
                {report.status}
              </span>
            </p>
          </div>
        </div>

        {/* item info */}
        <div
          className="
            mt-2
            rounded-xl
            border
            border-gray-300
            bg-gray-50
            px-3
            py-2
          "
        >
          <h3
            className="
              mb-2
              text-[14px]
              font-medium
              text-[#2A3B63]
              underline
              underline-offset-2
            "
          >
            Item Information
          </h3>

          <div className="space-y-1.5 text-[13px] text-[#173B80]">
            <p>
              <span className="font-medium">Type: </span>
              {report.type}
            </p>

            <p>
              <span className="font-medium">Location: </span>
              {report.location}
            </p>

            <p>
              <span className="font-medium">Date Reported: </span>
              {report.date}
            </p>
          </div>
        </div>

        {/* report info */}
        <div
          className="
            mt-2
            rounded-xl
            border
            border-gray-300
            bg-gray-50
            px-3
            py-2
          "
        >
          <h3
            className="
              mb-2
              text-[14px]
              font-medium
              text-[#2A3B63]
              underline
              underline-offset-2
            "
          >
            Report Information
          </h3>

          <div className="space-y-1.5 text-[13px] text-[#173B80]">
            <p>
              <span className="font-medium">Reported By: </span>
              {report.reporterName || "Not available"}
            </p>
          </div>
        </div>

        {/* done btn */}
        <button
          type="button"
          onClick={onClose}
          className="
            mx-auto
            mt-5
            block
            w-[180px]
            rounded-xl
            bg-[#2563EB]
            px-4
            py-2
            text-sm
            font-semibold
            text-white
            transition-all
            duration-200
            hover:bg-[#0F3292]
            hover:shadow-md
            active:scale-[0.98]
          "
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default ReportTable;
