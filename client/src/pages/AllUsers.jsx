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

    <div className="min-h-screen flex flex-col bg-gray-50">


      {/* Main Area */}
      
      <div className="flex flex-1">


        {/* Sidebar */}

        <AdminNavBar
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />



        {/* Content */}

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

          <UsersHeader
            header={usersHeader}
            setIsOpen={setIsSidebarOpen}
          />



          {/* Cards */}

          <section className="mt-6">

            <AllUsersCard
              stats={userscard}
            />

          </section>




          {/* Table */}

          <section className="mt-8">

            <UsersTable
              users={users}
            />

          </section>



        </main>


      </div>




      {/* Full Width Footer */}

      <Footer />


    </div>

  );
};


export default AllUsers;