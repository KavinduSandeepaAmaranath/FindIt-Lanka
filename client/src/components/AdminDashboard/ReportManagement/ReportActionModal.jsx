import { useState } from "react";
import {
  reportTableIcons,
  reportActionModalText,
} from "../../../data/AdminModuleData/ReportManagement";

const ReportActionModal = ({
  report,
  action,
  onClose,
  onConfirm,
}) => {
  const [editedReport, setEditedReport] = useState({
    itemName: report?.itemName || "",
    location: report?.location || "",
    date: report?.date || "",
    type: report?.type || "Lost",
  });

  if (!report || !action) {
    return null;
  }

  const ApproveIcon = reportTableIcons.approve;
  const RejectIcon = reportTableIcons.reject;
  const EditIcon = reportTableIcons.edit;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditedReport((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirm = () => {
    if (action === "edit") {
      onConfirm({
        ...report,
        ...editedReport,
      });
      return;
    }

    onConfirm(report);
  };

  const getTitle = () => {
    if (action === "approve") {
      return reportActionModalText.approve.title;
    }

    if (action === "reject") {
      return reportActionModalText.reject.title;
    }

    return reportActionModalText.edit.title;
  };

  const getDescription = () => {
    if (action === "approve") {
      return reportActionModalText.approve.description;
    }

    if (action === "reject") {
      return reportActionModalText.reject.description;
    }

    return reportActionModalText.edit.description;
  };

  const getConfirmText = () => {
    if (action === "approve") {
      return reportActionModalText.approve.confirm;
    }

    if (action === "reject") {
      return reportActionModalText.reject.confirm;
    }

    return reportActionModalText.edit.confirm;
  };

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
        {/* **Modal Header** */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">

            {action === "approve" && (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <ApproveIcon
                  size={20}
                  className="text-[#009B50]"
                />
              </div>
            )}

            {action === "reject" && (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                <RejectIcon
                  size={20}
                  className="text-[#B63838]"
                />
              </div>
            )}

            {action === "edit" && (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
                <EditIcon
                  size={20}
                  className="text-[#EABF32]"
                />
              </div>
            )}

            <h2 className="text-xl font-bold text-[#2A3B63]">
              {getTitle()}
            </h2>
          </div>

          {/* **Close Button** */}
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
            <RejectIcon size={20} />
          </button>
        </div>

        {/* **Description** */}
        <p className="mt-4 text-sm leading-6 text-[#64748B]">
          {getDescription()}
        </p>

        {/* **Approve / Reject Content** */}
        {(action === "approve" || action === "reject") && (
          <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <div className="flex items-center gap-3">
              <img
                src={report.itemImage}
                alt={report.itemName}
                className="h-14 w-14 rounded-lg object-cover"
              />

              <div>
                <p className="text-sm font-semibold text-[#2A3B63]">
                  {report.itemName}
                </p>

                <p className="mt-1 text-xs text-[#64748B]">
                  {reportActionModalText.reportInfo.reportedBy}{" "}
                  {report.reporterName}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* **Edit Content** */}
        {action === "edit" && (
          <div className="mt-5 space-y-4">

            {/* **Item Name** */}
            <div>
              <label
                htmlFor="itemName"
                className="mb-1.5 block text-sm font-medium text-[#2A3B63]"
              >
                {reportActionModalText.edit.fields.itemName}
              </label>

              <input
                id="itemName"
                name="itemName"
                type="text"
                value={editedReport.itemName}
                onChange={handleChange}
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  px-4
                  py-2.5
                  text-sm
                  text-[#29292D]
                  outline-none
                  transition
                  focus:border-[#2563EB]
                  focus:ring-2
                  focus:ring-[#2563EB]/20
                "
              />
            </div>

            {/* **Location** */}
            <div>
              <label
                htmlFor="location"
                className="mb-1.5 block text-sm font-medium text-[#2A3B63]"
              >
                {reportActionModalText.edit.fields.location}
              </label>

              <input
                id="location"
                name="location"
                type="text"
                value={editedReport.location}
                onChange={handleChange}
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  px-4
                  py-2.5
                  text-sm
                  text-[#29292D]
                  outline-none
                  transition
                  focus:border-[#2563EB]
                  focus:ring-2
                  focus:ring-[#2563EB]/20
                "
              />
            </div>

            {/* **Date** */}
            <div>
              <label
                htmlFor="date"
                className="mb-1.5 block text-sm font-medium text-[#2A3B63]"
              >
                {reportActionModalText.edit.fields.date}
              </label>

              <input
                id="date"
                name="date"
                type="text"
                value={editedReport.date}
                onChange={handleChange}
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  px-4
                  py-2.5
                  text-sm
                  text-[#29292D]
                  outline-none
                  transition
                  focus:border-[#2563EB]
                  focus:ring-2
                  focus:ring-[#2563EB]/20
                "
              />
            </div>

            {/* **Type** */}
            <div>
              <label
                htmlFor="type"
                className="mb-1.5 block text-sm font-medium text-[#2A3B63]"
              >
                {reportActionModalText.edit.fields.type}
              </label>

              <select
                id="type"
                name="type"
                value={editedReport.type}
                onChange={handleChange}
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  px-4
                  py-2.5
                  text-sm
                  text-[#29292D]
                  outline-none
                  transition
                  focus:border-[#2563EB]
                  focus:ring-2
                  focus:ring-[#2563EB]/20
                "
              >
                <option value="Lost">
                  {reportActionModalText.edit.typeOptions.lost}
                </option>

                <option value="Found">
                  {reportActionModalText.edit.typeOptions.found}
                </option>
              </select>
            </div>
          </div>
        )}

        {/* **Action Buttons** */}
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="
              flex-1
              rounded-xl
              border
              border-gray-300
              px-4
              py-3
              text-sm
              font-semibold
              text-[#64748B]
              transition
              hover:bg-gray-50
              hover:text-[#2A3B63]
            "
          >
            {reportActionModalText.buttons.cancel}
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            className={`
              flex-1
              rounded-xl
              px-4
              py-3
              text-sm
              font-semibold
              text-white
              transition
              ${
                action === "approve"
                  ? "bg-[#009B50] hover:bg-[#007A3F]"
                  : action === "reject"
                    ? "bg-[#B63838] hover:bg-[#8F2C2C]"
                    : "bg-[#2563EB] hover:bg-[#0F3292]"
              }
            `}
          >
            {getConfirmText()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportActionModal;