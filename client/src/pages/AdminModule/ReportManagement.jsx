
import { useState } from "react";

import AdminNavBar from "../../components/AdminDashboard/AdminNavBar";

import HeaderSec from "../../components/AdminDashboard/ReportManagement/HeaderSec";
import ReportCards from "../../components/AdminDashboard/ReportManagement/ReportCards";
import ReportFilters from "../../components/AdminDashboard/ReportManagement/ReportFilters";
import ReportTable from "../../components/AdminDashboard/ReportManagement/ReportTable";

import Footer from "../../components/Footer";

const ReportManagement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* Main Area */}
      <div className="flex flex-1">

        {/* admin navbar */}
        <AdminNavBar
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />

        {/* Content of page */}
        <main
          className="
            flex-1
            p-4
            sm:p-6
            lg:p-8
            overflow-x-hidden
          "
        >

          {/* Headersec */}
          <HeaderSec
            setIsOpen={setIsSidebarOpen}
          />

          {/* Report Cards */}
          <section className="mt-6">
            <ReportCards />
          </section>

          {/* Filters */}
          <section className="mt-8">
            <ReportFilters />
          </section>

          {/* Report Table */}
          <section className="mt-8">
            <ReportTable />
          </section>

        </main>

      </div>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default ReportManagement;