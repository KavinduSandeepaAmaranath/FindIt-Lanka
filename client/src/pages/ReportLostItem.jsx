import { useState } from "react";

import DashboardSidebar from "../components/dashboard/DashBoardSidebar";
import ReportLostHeader from "../components/LostForm/ReportLostHeader";
import ReportLostForm from "../components/LostForm/ReportLostForm";

export default function ReportLostItem() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* User Sidebar */}
      <DashboardSidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Right Side: Content */}
      <div className="flex-1 flex flex-col min-h-screen">

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">

          {/* Header (Title + Profile) */}
          <ReportLostHeader
            setIsOpen={setIsSidebarOpen}
          />

          {/* Form Card */}
          <ReportLostForm />

        </main>

      </div>
    </div>
  );
}