import { useState } from "react";

import AdminNavBar from "../components/AdminDashboard/AdminNavBar";

import UsersHeader from "../components/AdminDashboard/users/UsersHeader";
import AllUsersCard from "../components/AdminDashboard/users/AllUsersCard";
import UsersTable from "../components/AdminDashboard/users/UsersTable";

import Footer from "../components/Footer";

import {
  usersHeader,
  userscard,
  users
} from "../data/AllUsersData";

const AllUsers = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar */}
      <AdminNavBar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Right Side */}
      <div className="flex-1 flex flex-col min-h-screen">

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">

          {/* Header */}
          <UsersHeader
            header={usersHeader}
            setIsOpen={setIsSidebarOpen}
          />

          {/* Statistics Cards */}
          <section className="mt-6">
            <AllUsersCard
              stats={userscard}
            />
          </section>


         <section className="mt-8">
    <UsersTable
        users={users}
    />
</section>

          {/* <UsersTable users={usersData} /> */}

        </main>

        {/* Footer */}
        <Footer />

      </div>

    </div>
  );
};

export default AllUsers;