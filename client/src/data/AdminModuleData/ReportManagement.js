import {
  Bell,
  Download,
  Settings,
} from "lucide-react";

//Report Management Header Data

export const reportHeaderData = {
  title: "Report Management",

  description:
    "Review and manage all user reports submitted to the system.",

  buttons: [
    {
      id: "notification-settings",
      label: "Notification Settings",
      icon: Settings,
    },
    {
      id: "export-report",
      label: "Export Report",
      icon: Download,
    },
  ],
};


  // admin user data


export const adminUserData = {
  name: "Kasun Perera",
  role: "Pro Admin",
  icon: Bell,
};

//reportcards

import { FileText, CheckCircle, XCircle } from "lucide-react";

export const reportIcons = {
  total: FileText,
  pending: FileText,
  approved: CheckCircle,
  rejected: XCircle,
};

export const ReportCardsData = [
  {
    icon: reportIcons.total,
    title: "Total Reports",
    value: "1,500",
    description: "All Posted Reports",
    change: "12.5%",
    iconBg: "bg-[#D06262]/10",
    iconColor: "text-[#D06262]",
  },
  {
    icon: reportIcons.pending,
    title: "Pending Review",
    value: "100",
    description: "Currently Pending Reports",
    change: "8.7%",
    iconBg: "bg-[#2563EB]/10",
    iconColor: "text-[#2563EB]",
  },
  {
    icon: reportIcons.approved,
    title: "Approved",
    value: "1,300",
    description: "Approved Reports",
    change: "3.2%",
    iconBg: "bg-[#F97316]/10",
    iconColor: "text-[#F97316]",
  },
  {
    icon: reportIcons.rejected,
    title: "Rejected",
    value: "100",
    description: "Rejected Reports",
    change: "0.2%",
    iconBg: "bg-[#6366F1]/10",
    iconColor: "text-[#6366F1]",
  },
];

//filter section

import { Search, ChevronDown } from "lucide-react";

export const reportFilterIcons = {
  search: Search,
  dropdown: ChevronDown,
};

export const reportFiltersData = {
  search: {
    placeholder: "Search Reports by item name, reporter name...",
    buttonText: "Search",
  },

  filters: [
    {
      id: "reportType",
      label: "Filter By Report Type",
      defaultValue: "Found",
      options: ["All", "Lost", "Found"],
    },
    {
      id: "status",
      label: "Filter By Status",
      defaultValue: "Pending",
      options: ["All", "Pending", "Approved", "Rejected"],
    },
    {
      id: "date",
      label: "Filter By Date",
      defaultValue: "All Time",
      options: ["All Time", "Today", "This Week", "This Month"],
    },
  ],
};

//report table

import {
  Eye,
  Pencil,
  Check,
  X,
} from "lucide-react";

export const reportTableIcons = {
  view: Eye,
  edit: Pencil,
  approve: Check,
  reject: X,
};

export const reportTableText = {
  columns: {
    item: "Items",
    reporter: "Reported by",
    location: "Location",
    type: "Type",
    date: "Date",
    status: "Status",
    actions: "Actions",
  },

  actions: {
    view: "View",
    edit: "Edit",
    approve: "Approve",
    reject: "Reject",
  },
};

export const reportsData = [
  {
    id: 1,
    itemName: "iPhone 13",
    itemImage: "/images/reports/iphone-13.jpg",
    reporterName: "Tharindu Perera",
    reporterImage: "/images/users/tharindu.jpg",
    location: "Galle",
    type: "Lost",
    date: "2025-01-15",
    status: "Approved",
  },

  {
    id: 2,
    itemName: "Wallet",
    itemImage: "/images/reports/wallet.jpg",
    reporterName: "Sehansa Minduli",
    reporterImage: "/images/users/sehansa.jpg",
    location: "Colombo",
    type: "Found",
    date: "2025-01-15",
    status: "Pending",
  },

  {
    id: 3,
    itemName: "Laptop",
    itemImage: "/images/reports/laptop.jpg",
    reporterName: "Saranga Hewage",
    reporterImage: "/images/users/saranga.jpg",
    location: "Galle",
    type: "Lost",
    date: "2025-01-15",
    status: "Approved",
  },

  {
    id: 4,
    itemName: "Car Keys",
    itemImage: "/images/reports/car-keys.jpg",
    reporterName: "PinithiNimsara",
    reporterImage: "/images/users/pinithi.jpg",
    location: "Colombo",
    type: "Lost",
    date: "2025-01-15",
    status: "Approved",
  },

  {
    id: 5,
    itemName: "Backpack",
    itemImage: "/images/reports/backpack.jpg",
    reporterName: "HeshanKavinda",
    reporterImage: "/images/users/heshan.jpg",
    location: "Matara",
    type: "Found",
    date: "2025-01-15",
    status: "Rejected",
  },

  {
    id: 6,
    itemName: "gold ring",
    itemImage: "/images/reports/gold-ring.jpg",
    reporterName: "Kavindu Sandeepa",
    reporterImage: "/images/users/kavindu.jpg",
    location: "Gampaha",
    type: "Found",
    date: "2025-01-15",
    status: "Pending",
  },

  {
    id: 7,
    itemName: "iphone 12",
    itemImage: "/images/reports/iphone-12.jpg",
    reporterName: "Dilusha Lakshan",
    reporterImage: "/images/users/dilusha.jpg",
    location: "Badulla",
    type: "Found",
    date: "2025-01-15",
    status: "Rejected",
  },
];


//report actions

export const reportActionModalText = {
  approve: {
    title: "Approve Report",
    description: "Are you sure you want to approve this report?",
    confirm: "Approve",
  },

  reject: {
    title: "Reject Report",
    description: "Are you sure you want to reject this report?",
    confirm: "Reject",
  },

  reportInfo: {
    reportedBy: "Reported by",
  },

  buttons: {
    cancel: "Cancel",
  },
};



//  Notification settings icons
import {
  FiBell,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiRefreshCw,
} from "react-icons/fi";


//  Notification settings data
export const notificationSettingsData = {
  title: "Notification Settings",

  description: "Manage report management notifications.",

  settings: [
    {
      id: "newReport",
      title: "New Report Submitted",
      description: "Get notified when a new report is submitted.",
      icon: FiBell,
      defaultEnabled: true,
    },
    {
      id: "pendingReport",
      title: "Report Pending Review",
      description: "Get notified when a report is waiting for review.",
      icon: FiClock,
      defaultEnabled: true,
    },
    {
      id: "approvedReport",
      title: "Report Approved",
      description: "Get notified when a report is approved.",
      icon: FiCheckCircle,
      defaultEnabled: true,
    },
    {
      id: "rejectedReport",
      title: "Report Rejected",
      description: "Get notified when a report is rejected.",
      icon: FiXCircle,
      defaultEnabled: true,
    },
    {
      id: "reportUpdates",
      title: "Report Action Updates",
      description: "Receive updates about changes made to reports.",
      icon: FiRefreshCw,
      defaultEnabled: true,
    },
  ],

  buttons: {
    done: "Done",
  },

  ariaLabels: {
    close: "Close notification settings",
    toggle: "Toggle",
  },
};