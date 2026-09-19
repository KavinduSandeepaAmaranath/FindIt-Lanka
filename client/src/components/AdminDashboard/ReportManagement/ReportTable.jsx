import { useState } from "react";

import {
  reportTableIcons,
  reportTableText,
  reportsData,
} from "../../../data/AdminModuleData/ReportManagement";

import Pagination from "../Pagination";
import ReportActionModal from "./ReportActionModal";

const ReportTable = () => {
  const [selectedReport, setSelectedReport] = useState(null);

  const [reportList, setReportList] = useState(reportsData);

  const [selectedAction, setSelectedAction] = useState(null);

  const rowsPerPage = 5;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(reportList.length / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;

  const currentReports = reportList.slice(
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
  const handleConfirmAction = (updatedReport) => {
    if (!selectedAction) {
      return;
    }

    setReportList((prevReports) =>
      prevReports.map((report) => {
        if (report.id !== updatedReport.id) {
          return report;
        }

        //  Approve report
        if (selectedAction.type === "approve") {
          return {
            ...report,
            status: "Approved",
          };
        }

        // Reject report
        if (selectedAction.type === "reject") {
          return {
            ...report,
            status: "Rejected",
          };
        }

        return report;
      })
    );

    setSelectedAction(null);
  };

  return (
    <>
      {/* Report Table */}
      <div className="mt-8 w-full overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-sm">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[1050px]">
            <thead>
              <tr className="border-b border-gray-300">

                {/* Added vertical border to divide columns */}
                <th className="border-r border-gray-200 px-3 py-4 text-left text-sm font-semibold text-[#2A3B63] underline">
                  {reportTableText.columns.item}
                </th>

                {/* Added vertical border to divide columns */}
                <th className="border-r border-gray-200 px-3 py-4 text-left text-sm font-semibold text-[#2A3B63] underline">
                  {reportTableText.columns.reporter}
                </th>

                {/* Added vertical border to divide columns */}
                <th className="border-r border-gray-200 px-3 py-4 text-left text-sm font-semibold text-[#2A3B63] underline">
                  {reportTableText.columns.location}
                </th>

                {/* Added vertical border to divide columns */}
                <th className="border-r border-gray-200 px-3 py-4 text-left text-sm font-semibold text-[#2A3B63] underline">
                  {reportTableText.columns.type}
                </th>

                {/* Added vertical border to divide columns */}
                <th className="border-r border-gray-200 px-3 py-4 text-left text-sm font-semibold text-[#2A3B63] underline">
                  {reportTableText.columns.date}
                </th>

                {/* Added vertical border to divide columns */}
                <th className="border-r border-gray-200 px-3 py-4 text-left text-sm font-semibold text-[#2A3B63] underline">
                  {reportTableText.columns.status}
                </th>

                <th className="px-3 py-4 text-center text-sm font-semibold text-[#2A3B63] underline">
                  {reportTableText.columns.actions}
                </th>
              </tr>
            </thead>

            <tbody>
              {currentReports.map((report) => (
                <tr
                  key={report.id}
                  className="
                    border-b border-gray-200
                    transition-colors
                    duration-200
                    hover:bg-gray-50
                  "
                >
                  {/* Item */}
                  {/* Added vertical border to divide columns */}
                  <td className="border-r border-gray-200 px-3 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={report.itemImage}
                        alt={report.itemName}
                        className="h-12 w-12 rounded-lg object-cover"
                      />

                      <span className="text-sm font-medium text-[#29292D]">
                        {report.itemName}
                      </span>
                    </div>
                  </td>

                  {/* Reporter */}
                  {/* Added vertical border to divide columns */}
                  <td className="border-r border-gray-200 px-3 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={report.reporterImage}
                        alt={report.reporterName}
                        className="h-10 w-10 rounded-full object-cover"
                      />

                      <span className="text-sm font-medium text-[#29292D]">
                        {report.reporterName}
                      </span>
                    </div>
                  </td>

                  {/* Location */}
                  {/* Added vertical border to divide columns */}
                  <td className="border-r border-gray-200 px-3 py-3 text-sm text-[#29292D]">
                    {report.location}
                  </td>

                  {/* Type */}
                  {/* Added vertical border to divide columns */}
                  <td className="border-r border-gray-200 px-3 py-3">
                    <ReportTypeBadge type={report.type} />
                  </td>

                  {/* Date */}
                  {/* Added vertical border to divide columns */}
                  <td className="border-r border-gray-200 px-3 py-3 text-sm text-[#29292D]">
                    {report.date}
                  </td>

                  {/* Status */}
                  {/* Added vertical border to divide columns */}
                  <td className="border-r border-gray-200 px-3 py-3">
                    <ReportStatusBadge status={report.status} />
                  </td>

                  {/* **Actions** */}
                  <td className="px-3 py-3">
                    <ReportActions
                      report={report}
                      onView={handleView}
                      onApprove={handleApprove}
                      onReject={handleReject}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={reportList.length}
          rowsPerPage={rowsPerPage}
          onPageChange={setCurrentPage}
          itemName="reports"
        />
      </div>

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
      className={`
        inline-flex
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold
        ${
          isLost
            ? "bg-red-100 text-[#B63838]"
            : "bg-green-100 text-[#009B50]"
        }
      `}
    >
      {type}
    </span>
  );
};

/* Report Status Badge */
const ReportStatusBadge = ({ status }) => {
  const statusStyles = {
    Approved: "bg-green-100 text-[#009B50]",
    Pending: "bg-yellow-100 text-yellow-700",
    Rejected: "bg-red-100 text-[#B63838]",
  };

  return (
    <span
      className={`
        inline-flex
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold
        ${statusStyles[status]}
      `}
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

  return (
    <div className="flex items-center justify-center gap-2">
      {/* View button - available for every report */}
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
          focus:ring-2
          focus:ring-[#2563EB]/30
        "
      >
        <ViewIcon size={13} />
        {reportTableText.actions.view}
      </button>

      {/* Approve button - available for every report */}
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

      {/* Reject button - available for every report */}
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
        p-4
        backdrop-blur-sm
      "
      onClick={onClose}
    >
      <div
        className="
          w-full
          max-w-lg
          rounded-2xl
          bg-white
          p-6
          shadow-2xl
        "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#2A3B63]">
            Report Details
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="
              rounded-full
              p-2
              text-gray-500
              transition
              hover:bg-gray-100
              hover:text-[#2A3B63]
            "
          >
            <XIcon />
          </button>
        </div>

        <img
          src={report.itemImage}
          alt={report.itemName}
          className="mt-5 h-48 w-full rounded-xl object-cover"
        />

        <div className="mt-5 space-y-3">
          <Detail
            label="Item"
            value={report.itemName}
          />

          <Detail
            label="Reported by"
            value={report.reporterName}
          />

          <Detail
            label="Location"
            value={report.location}
          />

          <Detail
            label="Date"
            value={report.date}
          />

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[#64748B]">
              Type
            </span>

            <ReportTypeBadge type={report.type} />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[#64748B]">
              Status
            </span>

            <ReportStatusBadge status={report.status} />
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="
            mt-6
            w-full
            rounded-xl
            bg-[#2563EB]
            px-4
            py-3
            text-base
            font-semibold
            text-white
            transition
            hover:bg-[#0F3292]
          "
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
      <span className="text-sm font-medium text-[#64748B]">
        {label}
      </span>

      <span className="text-right text-sm font-medium text-[#29292D]">
        {value}
      </span>
    </div>
  );
};

/* Close Icon */
const XIcon = () => {
  const Icon = reportTableIcons.reject;

  return <Icon size={20} />;
};

export default ReportTable;