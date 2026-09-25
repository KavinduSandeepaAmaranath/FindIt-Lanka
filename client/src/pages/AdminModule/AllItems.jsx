import { useState } from "react";

import AdminNavBar from "../../components/AdminDashboard/AdminNavBar";

import HeaderSec from "../../components/AdminDashboard/AllItems/HeaderSec";
import AllItemsCards from "../../components/AdminDashboard/AllItems/AllItemsCards";
import AllItemsFilters from "../../components/AdminDashboard/AllItems/AllItemsFilters";
import AllItemsTable from "../../components/AdminDashboard/AllItems/AllItemsTable";

import Footer from "../../components/Footer";

const AllItems = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* Main Area */}
      <div className="flex flex-1">

        {/* Admin Navbar */}
        <AdminNavBar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />

        {/* Content of Page */}
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

          {/* All Items Cards */}
          <section className="mt-6">
            <AllItemsCards />
          </section>

          {/* Filters */}
          <section className="mt-8">
            <AllItemsFilters />
          </section>

          {/* All Items Table */}
          <section className="mt-8">
            <AllItemsTable />
          </section>

        </main>

      </div>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default AllItems;