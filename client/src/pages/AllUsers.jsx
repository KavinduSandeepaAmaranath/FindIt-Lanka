import { useState, useEffect } from "react";
import { FiUsers, FiUserCheck, FiUserX, FiUserPlus } from "react-icons/fi";

import AdminNavBar from "../components/AdminDashboard/AdminNavBar";

import UsersHeader from "../components/AdminDashboard/users/UsersHeader";
import AllUsersCard from "../components/AdminDashboard/users/AllUsersCard";
import UsersTable from "../components/AdminDashboard/users/UsersTable";

import Footer from "../components/Footer";

import { getAllUsers } from "../services/adminService";
import { usersHeader } from "../data/AllUsersData";


const AllUsers = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers(); // Call API function

        if (response.success && response.users) {
          // Map backend Mongo database fields to match UsersTable column names
          const formattedUsers = response.users.map((user) => ({
            id: user._id,
            name: user.name || "N/A",
            email: user.email || "N/A",
            phone: user.phoneNumber || user.phone || "N/A",
            district: user.district || "N/A",
            registered: user.createdAt
              ? new Date(user.createdAt).toLocaleDateString()
              : "N/A",
            lost: user.lostItemsCount || 0,
            found: user.foundItemsCount || 0,
            claims: user.claimsCount || 0,
            status: user.status || "Active",
            image: user.profilePicture
              ? `http://localhost:5000/${user.profilePicture}`
              : "https://via.placeholder.com/150",
          }));
          setUsersList(formattedUsers); // Save in state
        }
      } catch (error) {
        console.error("Error loading users:", error);
      } finally {
        setLoading(false); // Hide loading text
      }
    };
    fetchUsers();
  }, []);

  const now = new Date();
  const newUsersThisMonth = usersList.filter((u) => {
    if (!u.registered || u.registered === "N/A") return false;
    const regDate = new Date(u.registered);
    return (
      regDate.getMonth() === now.getMonth() &&
      regDate.getFullYear() === now.getFullYear()
    );
  }).length;
  const dynamicUsersCard = [
    {
      title: "Total Users",
      value: usersList.length.toLocaleString(),
      description: "All registered users",
      change: "Live data",
      icon: FiUsers,
    },
    {
      title: "Active Users",
      value: usersList
        .filter((u) => u.status === "Active" || u.status === "active")
        .length.toLocaleString(),
      description: "Currently active users",
      change: "Live data",
      icon: FiUserCheck,
    },
    {
      title: "Suspended Users",
      value: usersList
        .filter((u) => u.status === "Suspended" || u.status === "suspended")
        .length.toLocaleString(),
      description: "Suspended accounts",
      change: "Live data",
      icon: FiUserX,
    },
    {
      title: "New Users This Month",
      value: newUsersThisMonth.toLocaleString(),
      description: "New registrations this month",
      change: "Live data",
      icon: FiUserPlus,
    },
  ];

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
              stats={dynamicUsersCard}
            />

          </section>

          {/* Table */}

          <section className="mt-8">

            {loading ? (
              <div className="p-8 text-center text-gray-500 font-medium">
                Loading users...
              </div>
            ) : (
              <UsersTable
                users={usersList}
              />
            )}

          </section>

        </main>

      </div>

      {/* Full Width Footer */}

      <Footer />

    </div>

  );
};

export default AllUsers;