import { useState } from "react";

import AdminNavBar from "../../components/AdminDashboard/AdminNavBar";

import HeaderSec from "../../components/AdminDashboard/ClaimManagement/HeaderSec";
import ClaimCards from "../../components/AdminDashboard/ClaimManagement/ClaimCards";
import ClaimFilters from "../../components/AdminDashboard/ClaimManagement/ClaimFilters";
import ClaimsTable from "../../components/AdminDashboard/ClaimManagement/ClaimsTable";

import Footer from "../../components/Footer";

const ClaimManagement = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      
      {/* Main Area */}
      <div className="flex flex-1">

        {/* Admin Navbar */}
        <AdminNavBar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />

        {/* Page Content */}
        <main
          className="
            flex-1
            p-4
            sm:p-6
            lg:p-8
            overflow-x-hidden
          "
        >
          {/* Header */}
          <HeaderSec setIsOpen={setIsOpen} />

          {/*Cards */}
          <section className="mt-6">
            <ClaimCards />
          </section>

          {/* Search + Filters */}
          <section className="mt-8">
            <ClaimFilters
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </section>

          {/* Claims Table */}
          <section className="mt-8">
            <ClaimsTable
              searchValue={searchValue}
              activeTab={activeTab}
            />
          </section>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ClaimManagement;