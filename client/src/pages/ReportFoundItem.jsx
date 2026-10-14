import { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import DashboardSidebar from "../components/dashboard/DashBoardSidebar";
import ReportHeader from "../components/LostFoundForm/ReportHeader";
import ReportForm from "../components/LostFoundForm/ReportForm";

import {
  reportHeader,
  reportForm,
} from "../data/ReportFound";

const ReportFoundItem = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const editItem = location.state?.editReport || null;

  const dynamicHeader = editItem
    ? {
        ...reportHeader,
        title:
          (editItem.status?.toLowerCase().includes("reject") ||
          editItem.approvalStatus === "rejected")
            ? "Edit & Resubmit Found Report"
            : "Edit Found Item Report",
        subtitle: "Update any information and resubmit this report for admin verification.",
      }
    : reportHeader;

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar */}
      <DashboardSidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Content */}
      <div className="flex-1 flex flex-col min-h-screen pt-[60px] lg:pt-0">

        <motion.main
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden"
        >

          {/* Header */}
          <ReportHeader
            header={dynamicHeader}
            setIsOpen={setIsSidebarOpen}
          />

          {/* Form */}
          <ReportForm
            formData={reportForm}
            editItem={editItem}
          />

        </motion.main>

      </div>

    </div>
  );
};

export default ReportFoundItem;