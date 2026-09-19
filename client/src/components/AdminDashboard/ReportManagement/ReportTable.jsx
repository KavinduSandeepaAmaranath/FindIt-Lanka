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

  // NEW: Store reports locally so actions can update the table
  const [reportList, setReportList] = useState(reportsData);

  // NEW: Store selected action for action modal
  const [selectedAction, setSelectedAction] = useState(null);


  /* **pagination  ** */


  const rowsPerPage = 5;


  const [currentPage, setCurrentPage] = useState(1);


  const totalPages = Math.ceil(
    reportList.length / rowsPerPage
  );


  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;


  const currentReports = reportList.slice(
    startIndex,
    endIndex
  );


  /* **action headers** */


  const handleView = (report) => {
    setSelectedReport(report);
  };





  // NEW: Open Approve confirmation modal
  const handleApprove = (report) => {
    setSelectedAction({
      type: "approve",
      report,
    });
  };


  // NEW: Open Reject confirmation modal
  const handleReject = (report) => {
    setSelectedAction({
      type: "reject",
      report,
    });
  };


  // NEW: Confirm selected action and update table data
  const handleConfirmAction = (updatedReport) => {
    if (!selectedAction) {
      return;
    }

    setReportList((prevReports) =>
      prevReports.map((report) => {
        if (report.id !== updatedReport.id) {
          return report;
        }

        if (selectedAction.type === "approve") {
          return {
            ...report,
            status: "Approved",
          };
        }

        if (selectedAction.type === "reject") {
          return {
            ...report,
            status: "Rejected",
          };
        }

        if (selectedAction.type === "edit") {
          return updatedReport;
        }

        return report;
      })
    );

    setSelectedAction(null);
  };


  return (
    <div className="mt-8 w-full overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-sm">


      {/* **Responsive Table** */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[1050px]">


          {/***table Header** */}
          <thead>
            <tr className="border-b border-gray-300">
              <th className="px-3 py-4 text-left text-sm font-semibold text-[#2A3B63] underline">
                {reportTableText.columns.item}
              </th>


              <th className="px-3 py-4 text-left text-sm font-semibold text-[#2A3B63] underline">
                {reportTableText.columns.reporter}
              </th>


              <th className="px-3 py-4 text-left text-sm font-semibold text-[#2A3B63] underline">
                {reportTableText.columns.location}
              </th>


              <th className="px-3 py-4 text-left text-sm font-semibold text-[#2A3B63] underline">
                {reportTableText.columns.type}
              </th>


              <th className="px-3 py-4 text-left text-sm font-semibold text-[#2A3B63] underline">
                {reportTableText.columns.date}
              </th>


              <th className="px-3 py-4 text-left text-sm font-semibold text-[#2A3B63] underline">
                {reportTableText.columns.status}
              </th>


              <th className="px-3 py-4 text-center text-sm font-semibold text-[#2A3B63] underline">
                {reportTableText.columns.actions}
              </th>
            </tr>
          </thead>


          {/* **table Body** */}
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
                {/* **Item column** */}
                <td className="px-3 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={report.itemImage}
                      alt={report.itemName}
                      className="
                        h-12
                        w-12
                        shrink-0
                        rounded-lg
                        object-cover
                        ring-1
                        ring-gray-200
                      "
                    />


                    <span className="whitespace-nowrap text-sm text-[#29292D]">
                      {report.itemName}
                    </span>
                  </div>
                </td>


                {/* **Reporter column** */}
                <td className="px-3 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={report.reporterImage}
                      alt={report.reporterName}
                      className="
                        h-10
                        w-10
                        shrink-0
                        rounded-full
                        object-cover
                      "
                    />


                    <span className="whitespace-nowrap text-sm text-[#29292D]">
                      {report.reporterName}
                    </span>
                  </div>
                </td>


                {/* **Location colomn** */}
                <td className="px-3 py-3 text-sm text-[#29292D]">
                  {report.location}
                </td>


                {/* **Type column** */}
                <td className="px-3 py-3">
                  <ReportTypeBadge type={report.type} />
                </td>


                {/* **Date column** */}
                <td className="px-3 py-3 text-sm text-[#29292D]">
                  {report.date}
                </td>


                {/* **Status column** */}
                <td className="px-3 py-3">
                  <ReportStatusBadge status={report.status} />
                </td>


                {/* **Actions column** */}
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


      {/* **Common Pagination import** */}
      <div className="px-6 pb-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={reportList.length}
          rowsPerPage={rowsPerPage}
          onPageChange={setCurrentPage}
          itemName="reports"
        />
      </div>


      {/* **View Popup of row** */}
      {selectedReport && (
        <ReportDetailsModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
        />
      )}


      {/* NEW: Approve / Reject / Edit action modal */}
      {selectedAction && (
        <ReportActionModal
          report={selectedAction.report}
          action={selectedAction.type}
          onClose={() => setSelectedAction(null)}
          onConfirm={handleConfirmAction}
        />
      )}
    </div>
  );
};


/* **badge of type(lost or found)** */


const ReportTypeBadge = ({ type }) => {
  const isLost = type === "Lost";


  return (
    <span
      className={`
        inline-flex
        min-w-[58px]
        justify-center
        rounded-full
        px-3
        py-1
        text-xs
        font-medium
        ${
          isLost
            ? "bg-[#CE5151] text-white"
            : "bg-[#37AC6C] text-white"
        }
      `}
    >
      {type}
    </span>
  );
};


/* **status badges  ** */


const ReportStatusBadge = ({ status }) => {
  const styles = {
    Approved: "bg-[#009B50] text-white",
    Pending: "bg-[#FF8A2B] text-white",
    Rejected: "bg-[#B63838] text-white",
  };


  return (
    <span
      className={`
        inline-flex
        min-w-[92px]
        justify-center
        rounded-full
        px-3
        py-1.5
        text-xs
        font-medium
        ${styles[status] || "bg-gray-200 text-gray-700"}
      `}
    >
      {status}
    </span>
  );
};


/* **action btns** */


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


      {/* **btn View** */}
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


      {/* **Approved: View + Edit + Reject** */}
      {report.status === "Approved" && (
        <>
          


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


      {/* **Pending: View + Approve + Reject** */}
      {report.status === "Pending" && (
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


      {/* **Rejected: View + Edit + Approve** */}
      {report.status === "Rejected" && (
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
        </>
      )}
    </div>
  );
};


/* **view details (when click view btn)** */


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


/* **details (view)** */


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


/* **closing icon(reject)** */


const XIcon = () => {
  const Icon = reportTableIcons.reject;


  return <Icon size={20} />;
};


export default ReportTable;