import {
  FiBell,
  FiFileText,
  FiShield,
  FiUsers,
  FiSettings,
  FiChevronRight,
  FiSearch,
  FiCheckCircle,
} from "react-icons/fi";

/* =========================================================
   HEADER DATA
========================================================= */

export const notificationHeaderData = {
  title: "Notifications",
  description:
    "Stay updated with important activity across the FindIt Lanka platform.",

  profile: {
    name: "Kasun Perera",
    role: "Admin",
  },
};

/* =========================================================
   HEADER ICONS
========================================================= */

export const notificationHeaderIcons = {
  notification: FiBell,
  profile: FiUsers,
  menu: FiUsers,
};

/* =========================================================
   NOTIFICATION CARDS
========================================================= */

export const notificationCardsData = [
  {
    id: 1,
    title: "Total Notifications",
    value: "128",
    change: "+12.5% this week",
    icon: FiBell,
    iconBg: "bg-[#E0F2FE]",
    iconColor: "text-[#2563EB]",
    changeColor: "text-[#08A568]",
  },

  {
    id: 2,
    title: "Unread",
    value: "18",
    change: "+4.2% this week",
    icon: FiCheckCircle,
    iconBg: "bg-[#E0F2FE]",
    iconColor: "text-[#2563EB]",
    changeColor: "text-[#08A568]",
  },

  {
    id: 3,
    title: "Report Notifications",
    value: "64",
    change: "+8.7% this week",
    icon: FiFileText,
    iconBg: "bg-[#DDF8EC]",
    iconColor: "text-[#08A568]",
    changeColor: "text-[#08A568]",
  },

  {
    id: 4,
    title: "Claim Notifications",
    value: "32",
    change: "+5.4% this week",
    icon: FiShield,
    iconBg: "bg-[#EEE8FF]",
    iconColor: "text-[#7C3AED]",
    changeColor: "text-[#08A568]",
  },
];

/* =========================================================
   FILTER DATA
========================================================= */

export const notificationFilterData = {
  searchPlaceholder: "Search notifications...",

  filters: [
    "All",
    "Unread",
    "Reports",
    "Claims",
    "Users",
    "System",
  ],
};

/* =========================================================
   FILTER ICONS
========================================================= */

export const notificationFilterIcons = {
  search: FiSearch,
};

/* =========================================================
   NOTIFICATION LIST ICONS
========================================================= */

export const notificationListIcons = {
  arrow: FiChevronRight,
};

/* =========================================================
   NOTIFICATION LIST DATA
========================================================= */

export const notificationListData = [
  {
    id: 1,
    section: "Today",
    sectionDate: "Sep 16, 2026",
    title: "New Report Submitted",
    description: "A new Lost Item report has been submitted by a user.",
    details: "Item: iPhone 15 Pro | Report ID: RP-1045",
    category: "Reports",
    time: "2 min ago",
    read: false,

    icon: FiFileText,
    iconBg: "bg-[#2563EB]",
    iconColor: "text-white",
    categoryBg: "bg-[#E0F2FE]",
    categoryColor: "text-[#2563EB]",
  },

  {
    id: 2,
    section: "Today",
    sectionDate: "Sep 16, 2026",
    title: "New Claim Activity",
    description: "A user has submitted a claim for a found item.",
    details: "Item: Gold Ring",
    category: "Claims",
    time: "25 min ago",
    read: false,

    icon: FiShield,
    iconBg: "bg-[#16A34A]",
    iconColor: "text-white",
    categoryBg: "bg-[#DCFCE7]",
    categoryColor: "text-[#16A34A]",
  },

  {
    id: 3,
    section: "Today",
    sectionDate: "Sep 16, 2026",
    title: "New User Registered",
    description: "A new user has registered on FindIt Lanka.",
    details: "New account registration completed.",
    category: "Users",
    time: "1 hour ago",
    read: false,

    icon: FiUsers,
    iconBg: "bg-[#7C3AED]",
    iconColor: "text-white",
    categoryBg: "bg-[#EDE9FE]",
    categoryColor: "text-[#7C3AED]",
  },

  {
    id: 4,
    section: "Yesterday",
    sectionDate: "Sep 15, 2026",
    title: "Report Approved",
    description: "A reported item has been approved by the administrator.",
    details: "Report ID: RP-1042 has been approved.",
    category: "Reports",
    time: "4:32 PM",
    read: true,

    icon: FiFileText,
    iconBg: "bg-[#E2E8F0]",
    iconColor: "text-[#475569]",
    categoryBg: "bg-[#E0F2FE]",
    categoryColor: "text-[#2563EB]",
  },

  {
    id: 5,
    section: "Yesterday",
    sectionDate: "Sep 15, 2026",
    title: "Claim Accepted",
    description: "A claim has been accepted by the finder.",
    details: "Item: Samsung Galaxy S21",
    category: "Claims",
    time: "11:20 AM",
    read: true,

    icon: FiShield,
    iconBg: "bg-[#16A34A]",
    iconColor: "text-white",
    categoryBg: "bg-[#DCFCE7]",
    categoryColor: "text-[#16A34A]",
  },

  {
    id: 6,
    section: "Earlier",
    sectionDate: "Sep 12, 2026",
    title: "System Update",
    description: "FindIt Lanka system maintenance has been completed.",
    details: "System maintenance completed successfully.",
    category: "System",
    time: "Yesterday",
    read: true,

    icon: FiSettings,
    iconBg: "bg-[#7C3AED]",
    iconColor: "text-white",
    categoryBg: "bg-[#F1F5F9]",
    categoryColor: "text-[#475569]",
  },

  {
    id: 7,
    section: "Earlier",
    sectionDate: "Sep 12, 2026",
    title: "Multiple Reports Pending",
    description: "10 reports are waiting for review.",
    details: "Please review the pending reports.",
    category: "Reports",
    time: "Sep 12, 2026",
    read: false,

    icon: FiFileText,
    iconBg: "bg-[#2563EB]",
    iconColor: "text-white",
    categoryBg: "bg-[#E0F2FE]",
    categoryColor: "text-[#2563EB]",
  },

  {
    id: 8,
    section: "Earlier",
    sectionDate: "Sep 11, 2026",
    title: "New Claim Submitted",
    description: "A new claim has been submitted for verification.",
    details: "Item: Black Wallet",
    category: "Claims",
    time: "Sep 11, 2026",
    read: false,

    icon: FiShield,
    iconBg: "bg-[#16A34A]",
    iconColor: "text-white",
    categoryBg: "bg-[#DCFCE7]",
    categoryColor: "text-[#16A34A]",
  },

  {
    id: 9,
    section: "Earlier",
    sectionDate: "Sep 10, 2026",
    title: "User Profile Updated",
    description: "A user has updated their account information.",
    details: "Profile information has been updated.",
    category: "Users",
    time: "Sep 10, 2026",
    read: true,

    icon: FiUsers,
    iconBg: "bg-[#7C3AED]",
    iconColor: "text-white",
    categoryBg: "bg-[#EDE9FE]",
    categoryColor: "text-[#7C3AED]",
  },

  {
    id: 10,
    section: "Earlier",
    sectionDate: "Sep 9, 2026",
    title: "Report Requires Review",
    description: "A report requires administrator attention.",
    details: "Report ID: RP-1038",
    category: "Reports",
    time: "Sep 9, 2026",
    read: true,

    icon: FiFileText,
    iconBg: "bg-[#2563EB]",
    iconColor: "text-white",
    categoryBg: "bg-[#E0F2FE]",
    categoryColor: "text-[#2563EB]",
  },

  {
    id: 11,
    section: "Earlier",
    sectionDate: "Sep 8, 2026",
    title: "Claim Verification Required",
    description: "A claim is waiting for verification.",
    details: "Item: iPhone 13",
    category: "Claims",
    time: "Sep 8, 2026",
    read: false,

    icon: FiShield,
    iconBg: "bg-[#16A34A]",
    iconColor: "text-white",
    categoryBg: "bg-[#DCFCE7]",
    categoryColor: "text-[#16A34A]",
  },

  {
    id: 12,
    section: "Earlier",
    sectionDate: "Sep 7, 2026",
    title: "New User Registered",
    description: "A new user has joined the FindIt Lanka platform.",
    details: "Registration completed successfully.",
    category: "Users",
    time: "Sep 7, 2026",
    read: true,

    icon: FiUsers,
    iconBg: "bg-[#7C3AED]",
    iconColor: "text-white",
    categoryBg: "bg-[#EDE9FE]",
    categoryColor: "text-[#7C3AED]",
  },
];