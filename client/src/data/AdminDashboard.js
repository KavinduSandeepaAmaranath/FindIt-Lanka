import {
  FiUsers,
  FiClipboard,
  FiCheckCircle,
  FiClock,
  FiFileText,
  FiUpload,
  FiUser,
  FiSearch,
  FiBell,
  FiCalendar,
  FiMenu,
  FiMapPin,
} from "react-icons/fi";

import {
  MdDashboard,
  MdPeople,
  MdNotifications,
  MdSettings,
  MdInventory,
  MdAssignment,
  MdVerifiedUser,
  MdAssessment,
} from "react-icons/md";

import iphone from "../assets/images/iphone.png";
import umbrella from "../assets/images/umbrella.png";
import dog from "../assets/images/dog.jpg";
import watch from "../assets/images/watch.png";

export const stats = [
  {
    title: "Total Users",
    value: "15,642",
    sub: "↑ 12.5% from last 30 days",
    icon: FiUsers,
  },
  {
    title: "Total Reports",
    value: "1,248",
    sub: "↑ 8.3% from last 30 days",
    icon: FiClipboard,
  },
  {
    title: "Recovered",
    value: "840",
    sub: "↑ 15.7% from last 30 days",
    icon: FiCheckCircle,
  },
  {
    title: "Pending",
    value: "18",
    sub: "Review Required",
    icon: FiClock,
  },
];

export const approvals = [
  {
    id: "#APP-1252",
    image: iphone,
    title: "iPhone 14 Pro",
    type: "Lost",
    category: "Electronics",
    user: "Kasun Perera",
    date: "Jun 20, 2025",
    status: "Pending",
  },
  {
    id: "#APP-1240",
    image: umbrella,
    title: "Umbrella",
    type: "Found",
    category: "Outdoor Equipment",
    user: "Nimal Silva",
    date: "Jun 18, 2025",
    status: "Pending",
  },
  {
    id: "#APP-1256",
    image: dog,
    title: "Golden Retriever",
    type: "Lost",
    category: "Pets",
    user: "Amal Perera",
    date: "Jun 17, 2025",
    status: "Pending",
  },
  {
    id: "#APP-1230",
    image: watch,
    title: "Luxury Watch",
    type: "Found",
    category: "Accessories",
    user: "Saman Kumara",
    date: "Jun 15, 2025",
    status: "Pending",
  },
];

export const dashboardHeader = {
  adminName: "Kasun Perera",
  adminRole: "Main Admin",
  title: "Dashboard Overview",
  subtitle: "Welcome back, Admin! Here's what's happening today.",
  searchPlaceholder: "Search reports, items, or locations...",
  icons: {
    search: FiSearch,
    bell: FiBell,
    calendar: FiCalendar,
    menu: FiMenu,
  },
};

export const locations = [
  { id: 1, name: "Galle",    reports: 305, percentage: 80, icon: FiMapPin },
  { id: 2, name: "Colombo",  reports: 280, percentage: 65, icon: FiMapPin },
  { id: 3, name: "Matara",   reports: 210, percentage: 50, icon: FiMapPin },
  { id: 4, name: "Kandy",    reports: 187, percentage: 35, icon: FiMapPin },
  { id: 5, name: "Badulla",  reports: 120, percentage: 25, icon: FiMapPin },
];

export const recentActivities = [
  {
    id: 1,
    title: "New report submitted: iPhone 14 Pro",
    user: "by Kasun Perera",
    time: "10 minutes ago",
    icon: FiFileText,
  },
  {
    id: 2,
    title: "Claim matched: Golden Retriever",
    user: "by Dilini Silva",
    time: "2 hours ago",
    icon: FiCheckCircle,
  },
  {
    id: 3,
    title: "Item approved: Leather Wallet",
    user: null,
    time: "1 day ago",
    icon: FiUpload,
  },
  {
    id: 4,
    title: "New user registered: Sampath Jayasuriya",
    user: "by Sampath Jayasuriya",
    time: "3 days ago",
    icon: FiUser,
  },
];

export const categoryData = [
  { name: "Electronics",    value: 400, color: "#ef4444" },
  { name: "Personal Items", value: 300, color: "#a855f7" },
  { name: "Pets & Animals", value: 300, color: "#dfea08" },
  { name: "Bags & Wallets", value: 200, color: "#3b82f6" },
  { name: "Others",         value: 100, color: "#22c55e" },
];

export const overviewData = [
  { date: "May 20",  total: 20, found: 10, lost: 5  },
  { date: "May 27",  total: 45, found: 30, lost: 15 },
  { date: "June 3",  total: 35, found: 25, lost: 10 },
  { date: "June 10", total: 60, found: 40, lost: 20 },
  { date: "June 17", total: 80, found: 60, lost: 25 },
];

export const navMenuItems = [
  { id: 1, title: "Admin Dashboard", icon: MdDashboard,     active: true  },
  { id: 2, title: "Users",           icon: MdPeople,        active: false },
  { id: 3, title: "Reports",         icon: MdAssessment,    active: false },
  { id: 4, title: "All Items",       icon: MdInventory,     active: false },
  { id: 5, title: "Approvals",       icon: MdVerifiedUser,  active: false },
  { id: 6, title: "Claims",          icon: MdAssignment,    active: false },
  { id: 7, title: "Notifications",   icon: MdNotifications, active: false },
  { id: 8, title: "Settings",        icon: MdSettings,      active: false },
];