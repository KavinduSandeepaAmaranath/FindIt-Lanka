import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
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

  const [selectedFilter, setSelectedFilter] = useState("All Users");
  const [searchTerm, setSearchTerm] = useState("");

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
          createdAt: user.createdAt,
          registered: user.createdAt
            ? new Date(user.createdAt).toLocaleDateString()
            : "N/A",
          lost: user.lostItemsCount || 0,
          found: user.foundItemsCount || 0,
          claims: user.claimsCount || 0,
          status: user.status || "Active",
          image: user.profilePicture
            ? (user.profilePicture.startsWith("http")
                ? user.profilePicture
                : `http://localhost:5000/${user.profilePicture.replace(/^\//, "")}`)
            : null,
        }));
        setUsersList(formattedUsers); // Save in state
      }
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setLoading(false); // Hide loading text
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserStatusChange = (userId, newStatus) => {
    setUsersList((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status: newStatus } : u))
    );
  };

  const now = new Date();
  const newUsersThisMonth = usersList.filter((u) => {
    if (!u.createdAt) return false;
    const regDate = new Date(u.createdAt);
    return (
      regDate.getMonth() === now.getMonth() &&
      regDate.getFullYear() === now.getFullYear()
    );
  }).length;

  const totalUsersCount = usersList.length;
  const activeCount = usersList.filter(
    (u) => u.status === "Active" || u.status === "active"
  ).length;
  const suspendedCount = usersList.filter(
    (u) => u.status === "Suspended" || u.status === "suspended"
  ).length;

  const dynamicUsersCard = [
    {
      title: "Total Users",
      value: totalUsersCount.toLocaleString(),
      description: "All registered users",
      sub: `${totalUsersCount} total registered users`,
      icon: FiUsers,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Active Users",
      value: activeCount.toLocaleString(),
      description: "Currently active accounts",
      sub:
        totalUsersCount > 0
          ? `${((activeCount / totalUsersCount) * 100).toFixed(1)}% of total users`
          : "0.0% of total users",
      icon: FiUserCheck,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      title: "Suspended Users",
      value: suspendedCount.toLocaleString(),
      description: "Suspended accounts",
      sub:
        totalUsersCount > 0
          ? `${((suspendedCount / totalUsersCount) * 100).toFixed(1)}% of total users`
          : "0.0% of total users",
      icon: FiUserX,
      iconBg: "bg-red-50",
      iconColor: "text-red-600",
    },
    {
      title: "New Users",
      value: newUsersThisMonth.toLocaleString(),
      description: "Registered this month",
      sub: `${newUsersThisMonth} registered this month`,
      icon: FiUserPlus,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ];

  const handleCardClick = (cardTitle) => {
    if (cardTitle === "Active Users") {
      setSelectedFilter("Active Users");
    } else if (cardTitle === "Suspended Users") {
      setSelectedFilter("Suspend Users");
    } else if (cardTitle.includes("New")) {
      setSelectedFilter("New Users");
    } else {
      setSelectedFilter("All Users");
    }
  };

  // Filtered users list
  const filteredUsers = useMemo(() => {
    return usersList.filter((user) => {
      // 1. Dropdown Filter
      if (selectedFilter === "Active Users") {
        const isActive = user.status?.toLowerCase() === "active";
        if (!isActive) return false;
      } else if (
        selectedFilter === "Suspend Users" ||
        selectedFilter === "Suspended Users"
      ) {
        const isSuspended = user.status?.toLowerCase() === "suspended";
        if (!isSuspended) return false;
      } else if (selectedFilter === "New Users") {
        if (!user.createdAt) return false;
        const regDate = new Date(user.createdAt);
        const isThisMonth =
          regDate.getMonth() === now.getMonth() &&
          regDate.getFullYear() === now.getFullYear();
        if (!isThisMonth) return false;
      }

      // 2. Search Text
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase().trim();
        const nameMatch = user.name?.toLowerCase().includes(query);
        const emailMatch = user.email?.toLowerCase().includes(query);
        const phoneMatch = user.phone?.toLowerCase().includes(query);
        const districtMatch = user.district?.toLowerCase().includes(query);
        if (!nameMatch && !emailMatch && !phoneMatch && !districtMatch) {
          return false;
        }
      }

      return true;
    });
  }, [usersList, selectedFilter, searchTerm]);

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
        <motion.main
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden"
        >
          {/* Header */}
          <UsersHeader
            header={usersHeader}
            setIsOpen={setIsSidebarOpen}
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />

          {/* Cards */}
          <section className="mt-6">
            <AllUsersCard
              stats={dynamicUsersCard}
              selectedFilter={selectedFilter}
              onCardClick={handleCardClick}
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
                users={filteredUsers}
                onUserStatusChange={handleUserStatusChange}
              />
            )}
          </section>
        </motion.main>
      </div>

      {/* Full Width Footer */}
      <Footer />
    </div>
  );
};

export default AllUsers;
