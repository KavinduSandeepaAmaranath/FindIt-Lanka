import { useState } from "react";

import DashboardSidebar from "../components/dashboard/DashBoardSidebar";
import ReportHeader from "../components/LostFoundForm/ReportHeader";
import ReportForm from "../components/LostFoundForm/ReportForm";

import {
  reportHeader,
  reportForm,
} from "../data/ReportLost";

const ReportLostItem = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar */}
      <DashboardSidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Right Side */}
      <div className="flex-1 flex flex-col min-h-screen">

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">

          {/* Header */}
          <ReportHeader
            header={reportHeader}
            setIsOpen={setIsSidebarOpen}
          />

          {/* Form */}
          <ReportForm
            formData={reportForm}
          />

        </main>

      </div>

    </div>
  );
};

export default ReportLostItem;