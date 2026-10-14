import { FiX } from "react-icons/fi";

import ReportHeader from "./ReportHeader";
import ReportForm from "./ReportForm";

const ReportModal = ({
  header,
  formData,
  editItem,
  onClose,
  onSuccess,
}) => {
  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/50
        backdrop-blur-sm
        p-3
        sm:p-5
      "
    >
      {/* Modal */}
      <div
        className="
          relative
          w-full
          max-w-6xl
          max-h-[95vh]
          overflow-y-auto
          rounded-2xl
          sm:rounded-3xl
          bg-gray-50
          shadow-2xl
        "
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="
            absolute
            top-4
            right-4
            z-50
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-white
            shadow-md
            transition-all
            duration-300
            hover:bg-red-500
            hover:text-white
            hover:scale-110
          "
        >
          <FiX size={22} />
        </button>

        {/* Content */}
        <div
          className="
            p-5
            sm:p-6
            md:p-8
            lg:p-10
          "
        >
          {/* Header */}
          <ReportHeader
            header={
              editItem
                ? {
                    ...header,
                    title:
                      (editItem.status?.toLowerCase().includes("reject") ||
                      editItem.approvalStatus === "rejected")
                        ? "Edit & Resubmit Report"
                        : "Edit Report Details",
                    subtitle:
                      "Update any information and resubmit this report for admin verification.",
                  }
                : header
            }
          />

          {/* Form */}
          <ReportForm
            formData={formData}
            editItem={editItem}
            onClose={onClose}
            onSuccess={onSuccess}
          />
        </div>
      </div>
    </div>
  );
};

export default ReportModal;