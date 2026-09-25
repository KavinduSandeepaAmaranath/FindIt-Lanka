import {
  FiBell,
  FiUser,
  FiMenu,
  FiBox,
  FiPackage,
  FiAward,
  FiShield,
  FiRefreshCw,
  FiSearch,
  FiChevronDown,
  FiEye,
  FiCheckCircle,
  FiXCircle,
  FiCircle,
  FiRepeat,
} from "react-icons/fi";

/* =========================================
   ALL ITEMS HEADER DATA
========================================= */

export const allItemsHeaderData = {
  title: "All Items",

  description:
    "View and manage all active lost and found items in the system.",

  profile: {
    name: "Kasun Perera",
    role: "Pro Member",
  },
};

/* =========================================
   ALL ITEMS HEADER ICONS
========================================= */

export const allItemsHeaderIcons = {
  notification: FiBell,
  profile: FiUser,
  menu: FiMenu,
};

/* =========================================
   ALL ITEMS CARDS DATA
========================================= */

export const AllItemsCardsData = [
  {
    id: 1,
    title: "Total Items",
    value: "1,250",
    description: "All Active Items",
    change: "12.5%",
    icon: FiBox,
    iconBg: "bg-[#DCEEFF]",
    iconColor: "text-[#2563EB]",
  },

  {
    id: 2,
    title: "Lost Items",
    value: "720",
    description: "Currently Lost Items",
    change: "8.2%",
    icon: FiPackage,
    iconBg: "bg-[#DCEEFF]",
    iconColor: "text-[#2563EB]",
  },

  {
    id: 3,
    title: "Found Items",
    value: "530",
    description: "Currently Found Items",
    change: "5.4%",
    icon: FiAward,
    iconBg: "bg-[#DCEEFF]",
    iconColor: "text-[#2563EB]",
  },

  {
    id: 4,
    title: "Claimed Items",
    value: "280",
    description: "Successfully Claimed Items",
    change: "10.3%",
    icon: FiShield,
    iconBg: "bg-[#DCEEFF]",
    iconColor: "text-[#2563EB]",
  },

  {
    id: 5,
    title: "Returned Items",
    value: "150",
    description: "Successfully Returned Items",
    change: "6.7%",
    icon: FiRefreshCw,
    iconBg: "bg-[#DCEEFF]",
    iconColor: "text-[#2563EB]",
  },
];

/* =========================================
   ALL ITEMS SEARCH + FILTER DATA
========================================= */

export const allItemsFilterData = {
  search: {
    placeholder: "Search any item in this platform.",
    buttonText: "Search",
  },

  filters: [
    {
      id: "type",
      label: "Filter By Type",
      defaultValue: "Found",

      options: [
        "All",
        "Lost",
        "Found",
      ],
    },

    {
      id: "status",
      label: "Filter By Status",
      defaultValue: "Claimed",

      options: [
        "All",
        "Active",
        "Claimed",
        "Unclaimed",
        "Returned",
      ],
    },

    {
      id: "date",
      label: "Filter By Date",
      defaultValue: "All Time",

      options: [
        "All Time",
        "Today",
        "This Week",
        "This Month",
        "This Year",
      ],
    },
  ],
};

/* =========================================
   ALL ITEMS FILTER ICONS
========================================= */

export const allItemsFilterIcons = {
  search: FiSearch,
  chevronDown: FiChevronDown,
};

/* =========================================
   ALL ITEMS TABLE COLUMNS
========================================= */

export const allItemsTableColumns = [
  {
    key: "itemName",
    label: "Items",
    align: "left",
  },
  {
    key: "type",
    label: "Type",
    align: "center",
  },
  {
    key: "location",
    label: "Location",
    align: "left",
  },
  {
    key: "date",
    label: "Date",
    align: "left",
  },
  {
    key: "itemStatus",
    label: "Item Status",
    align: "center",
  },
  {
    key: "claimStatus",
    label: "Claim Status",
    align: "center",
  },
  {
    key: "action",
    label: "Action",
    align: "center",
  },
];

/* =========================================
   ALL ITEMS TABLE DATA
========================================= */

export const allItemsTableData = [
  {
    id: 1,
    itemName: "iPhone 13",
    image: "/images/items/iphone-13.jpg",
    type: "Found",
    location: "Galle",
    date: "2025-01-15",
    itemStatus: "Returned",
    claimStatus: null,

  description: "Black iPhone 14 with blue case.",
  reportedBy: "Kasun Perera",
  contact: "+94 77 123 4567",
  },

  {
    id: 2,
    itemName: "Wallet",
    image: "/images/items/wallet.jpg",
    type: "Lost",
    location: "Colombo",
    date: "2025-01-15",
    itemStatus: "Active",
    claimStatus: "Claimed",
  },

  {
    id: 3,
    itemName: "Laptop",
    image: "/images/items/laptop.jpg",
    type: "Found",
    location: "Galle",
    date: "2025-01-15",
    itemStatus: "Returned",
    claimStatus: null,
  },

  {
    id: 4,
    itemName: "Car Keys",
    image: "/images/items/car-keys.jpg",
    type: "Lost",
    location: "Colombo",
    date: "2025-01-15",
    itemStatus: "Active",
    claimStatus: "Unclaimed",
  },

  {
    id: 5,
    itemName: "Backpack",
    image: "/images/items/backpack.jpg",
    type: "Found",
    location: "Matara",
    date: "2025-01-15",
    itemStatus: "Returned",
    claimStatus: null,
  },

  {
    id: 6,
    itemName: "Gold Ring",
    image: "/images/items/gold-ring.jpg",
    type: "Lost",
    location: "Gampaha",
    date: "2025-01-15",
    itemStatus: "Active",
    claimStatus: "Claimed",
  },

  {
    id: 7,
    itemName: "iPhone 12",
    image: "/images/items/iphone-12.jpg",
    type: "Found",
    location: "Badulla",
    date: "2025-01-15",
    itemStatus: "Active",
    claimStatus: "Unclaimed",
  },

  {
    id: 8,
    itemName: "Black Watch",
    image: "/images/items/watch.jpg",
    type: "Lost",
    location: "Kandy",
    date: "2025-01-14",
    itemStatus: "Returned",
    claimStatus: null,
  },

  {
    id: 9,
    itemName: "Blue Water Bottle",
    image: "/images/items/water-bottle.jpg",
    type: "Found",
    location: "Badulla",
    date: "2025-01-14",
    itemStatus: "Active",
    claimStatus: "Unclaimed",
  },

  {
    id: 10,
    itemName: "Student ID Card",
    image: "/images/items/id-card.jpg",
    type: "Lost",
    location: "Galle",
    date: "2025-01-14",
    itemStatus: "Active",
    claimStatus: "Unclaimed",
  },

  {
    id: 11,
    itemName: "umbrella",
    image: "/images/items/umbrella.jpg",
    type: "Lost",
    location: "Colombo",
    date: "2025-01-15",
    itemStatus: "Active",
    claimStatus: "Unclaimed",
  },
];

/* =========================================
   ALL ITEMS TABLE ICONS
========================================= */

export const allItemsTableIcons = {
  view: FiEye,
  returned: FiRepeat,
  active: FiCircle,
  claimed: FiCheckCircle,
  unclaimed: FiXCircle,
};


