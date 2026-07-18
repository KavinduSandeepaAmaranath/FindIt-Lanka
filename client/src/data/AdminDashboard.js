import {
  FiUsers,
  FiClipboard,
  FiCheckCircle,
  FiClock,
} from "react-icons/fi";

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
};