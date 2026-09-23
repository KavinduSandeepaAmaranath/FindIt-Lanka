import { useState, useEffect } from "react";
import fallbackImage from "../../assets/images/UdbFallbackImage.avif";
import { useNavigate } from "react-router-dom";
import { FiCheckCircle, FiXCircle, FiEye, FiX } from "react-icons/fi";

export default function ApprovalTable({ 
  approvals, 
  onApprove,
  onReject, 
}) {
  const navigate = useNavigate();

  const rowsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const [notification, setNotification] = useState(null);

  const totalPages = Math.ceil(approvals.length / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRows = approvals.slice(startIndex, endIndex);

  const showNotification = (type, message, itemId) => {
    setNotification({ type, message, itemId });
  };


  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  
  const closeNotification = () => {
    setNotification(null);
  };


  const handleViewAll = () => {
    navigate("/admin-approvals");
  };


  const handleViewReport = (item) => {
    showNotification("info", `Viewing Report: ${item.id}`, item.id);
    
  };

  const handleApprove = async (item) => {
    try {
      await onApprove(item);

      showNotification(
        "success",
        `Report ${item.id} approved successfully.`,
        item.id
      );
    } catch (error) {
      showNotification(
        "error",
        error.response?.data?.message ||
        "Failed to approve report.",
        item.id
      );
    }
  };

  const handleReject = async (item) => {
    try {
      await onReject(item);

      showNotification(
        "success",
        `Report ${item.id} rejected successfully.`,
        item.id
      );
    } catch (error) {
      showNotification(
        "error",
        error.response?.data?.message ||
        "Failed to reject report.",
        item.id
      );
    }
  };

  const getNotificationStyles = (type) => {
    switch (type) {
      case "success":
        return {
          bg: "bg-green-50",
          border: "border-green-400",
          text: "text-green-800",
          iconBg: "bg-green-100",
          icon: <FiCheckCircle className="text-green-600 text-3xl" />,
        };
      case "error":
        return {
          bg: "bg-red-50",
          border: "border-red-400",
          text: "text-red-800",
          iconBg: "bg-red-100",
          icon: <FiXCircle className="text-red-600 text-3xl" />,
        };
      case "info":
      default:
        return {
          bg: "bg-blue-50",
          border: "border-blue-400",
          text: "text-blue-800",
          iconBg: "bg-blue-100",
          icon: <FiEye className="text-blue-600 text-3xl" />,
        };
    }
  };

  return (
    <>
      {/* Center Notification Popup with Backdrop */}

      {notification && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in"
          onClick={closeNotification}
        >
          <div
            className={`relative flex flex-col items-center gap-4 px-8 py-6 rounded-2xl shadow-2xl border-t-4 ${
              getNotificationStyles(notification.type).bg
            } ${getNotificationStyles(notification.type).border} min-w-[320px] max-w-md mx-4 animate-pop-in`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}

            <button
              onClick={closeNotification}
              className={`absolute top-3 right-3 ${
                getNotificationStyles(notification.type).text
              } hover:opacity-70 transition`}
            >
              <FiX className="text-xl" />
            </button>

            {/* Icon */}

            <div
              className={`p-3 rounded-full ${
                getNotificationStyles(notification.type).iconBg
              }`}
            >
              {getNotificationStyles(notification.type).icon}
            </div>

            {/* Message */}

            <p
              className={`text-center font-semibold text-base ${
                getNotificationStyles(notification.type).text
              }`}
            >
              {notification.message}
            </p>

            {/* OK Button */}

            <button
              onClick={closeNotification}
              className={`mt-2 px-6 py-2 rounded-lg text-white text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${
                notification.type === "success"
                  ? "bg-green-600 hover:bg-green-700"
                  : notification.type === "error"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Header */}

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 px-2 sm:px-6 py-4 sm:py-5">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-700">
          Pending Approvals
        </h2>
        <button
          onClick={handleViewAll}
          className="self-start sm:self-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm transition-all duration-200 hover:scale-105 active:scale-95"
        >
          View All
        </button>
      </div>

      {/* Table */}

      <div className="bg-white border border-gray-300 rounded-xl overflow-x-auto">
        <table className="w-full text-xs sm:text-sm min-w-[900px]">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr className="text-gray-700">
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-center border-r border-gray-300">Id</th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-left border-r border-gray-300">Item Title</th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-center border-r border-gray-300">Type</th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-center border-r border-gray-300">Category</th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-center border-r border-gray-300">Submitted By</th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-center border-r border-gray-300">Date</th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-center border-r border-gray-300">Status</th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {currentRows.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-300 last:border-0 hover:bg-gray-50 transition-colors"
              >
                <td className="px-3 sm:px-6 py-3 sm:py-4 text-center border-r border-gray-300">
                  {item.id}
                </td>

                <td className="px-3 sm:px-6 py-3 sm:py-4 border-r border-gray-300">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <img
                      src={item.image || fallbackImage}
                      alt={item.title}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-cover"
                      onError={(e) => {
                        e.currentTarget.onerror = null; // Prevent infinite loop
                        e.currentTarget.src = fallbackImage;
                      }}
                    />
                    <span className="font-medium whitespace-nowrap">
                      {item.title}
                    </span>
                  </div>
                </td>

                <td className="px-3 sm:px-6 py-3 sm:py-4 text-center border-r border-gray-300">
                  <span
                    className={
                      item.type === "Lost"
                        ? "text-red-600 font-medium"
                        : "text-green-600 font-medium"
                    }
                  >
                    {item.type}
                  </span>
                </td>

                <td className="px-3 sm:px-6 py-3 sm:py-4 text-center whitespace-nowrap border-r border-gray-300">
                  {item.category}
                </td>

                <td className="px-3 sm:px-6 py-3 sm:py-4 text-center whitespace-nowrap border-r border-gray-300">
                  {item.user}
                </td>

                <td className="px-3 sm:px-6 py-3 sm:py-4 text-center whitespace-nowrap border-r border-gray-300">
                  {item.date}
                </td>

                <td className="px-3 sm:px-6 py-3 sm:py-4 text-center border-r border-gray-300">
                  <span className="text-orange-500 font-medium border border-orange-200 bg-orange-50 px-2 py-1 rounded">
                    {item.status}
                  </span>
                </td>

                {/* Action Column */}

                <td className="px-3 sm:px-6 py-3 sm:py-4">
                  <div className="flex flex-col items-center gap-2">
                    <button
                      onClick={() => handleViewReport(item)}
                      className="w-full bg-blue-50 text-blue-600 border border-blue-200 px-3 sm:px-4 py-1 rounded text-[10px] sm:text-xs font-medium whitespace-nowrap transition-all duration-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:scale-105 hover:shadow-md active:scale-95"
                    >
                      View Report
                    </button>

                    <div className="flex justify-center gap-2 flex-nowrap whitespace-nowrap">
                      <button
                        onClick={() => handleApprove(item)}
                        className="bg-green-500 text-white px-3 sm:px-4 py-1 rounded text-[10px] sm:text-xs transition-all duration-200 hover:bg-green-600 hover:scale-105 hover:shadow-md active:scale-95"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(item)}
                        className="bg-red-600 text-white px-3 sm:px-4 py-1 rounded text-[10px] sm:text-xs transition-all duration-200 hover:bg-red-700 hover:scale-105 hover:shadow-md active:scale-95"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}

      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4 px-2 sm:px-6">
        <p className="text-sm text-gray-600 order-2 sm:order-1">
          Showing{" "}
          <span className="font-semibold text-gray-800">{startIndex + 1}</span>
          {" - "}
          <span className="font-semibold text-gray-800">
            {Math.min(endIndex, approvals.length)}
          </span>
          {" of "}
          <span className="font-semibold text-gray-800">{approvals.length}</span>
        </p>

        <div className="flex items-center gap-2 order-1 sm:order-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 sm:px-4 py-2 rounded-lg border text-sm transition-all duration-200 ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                : "bg-white text-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 border-gray-300"
            }`}
          >
            Previous
          </button>

          <div className="flex gap-1 sm:gap-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg border text-sm font-medium transition-all duration-200 ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white border-blue-600 shadow-md"
                    : "bg-white text-gray-700 hover:bg-blue-50 hover:border-blue-300 border-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-3 sm:px-4 py-2 rounded-lg border text-sm transition-all duration-200 ${
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                : "bg-white text-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 border-gray-300"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}