import {
  FiBell,
  FiUser,
  FiMenu,
  FiFileText,
  FiCheck,
  FiX,
  FiSearch,
  FiChevronDown,
  FiEye,
  FiChevronLeft,
  FiChevronRight,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

import {
  MdOutlineHandshake,
  MdOutlineAccessTime,
} from "react-icons/md";

// header


export const claimHeaderData = {
  title: "Claim Management",
  description: "Monitor ownership claims and recovery activity",

  profile: {
    name: "Kasun Perera",
    role: "Pro Admin",
  },
};

export const claimHeaderIcons = {
  notification: FiBell,
  profile: FiUser,
  menu: FiMenu,
};


// cards

export const claimCardsData = [
  {
    id: 1,
    title: "Total Claims",
    value: "16",
    changeText: "-40.0% from last month",
    icon: FiFileText,
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
  },
  {
    id: 2,
    title: "In Progress",
    value: "4",
    changeText: "-66.7% from last month",
    icon: FiFileText,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    id: 3,
    title: "Completed",
    value: "10",
    changeText: "-33.3% from last month",
    icon: FiCheck,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
  },
  {
    id: 4,
    title: "Rejected",
    value: "2",
    changeText: "+0.0% from last month",
    icon: FiX,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-500",
  },
];


// filters


export const claimFilterData = {
  search: {
    placeholder: "Search claims by item name, owner or finder...",
    buttonText: "Search",
  },
  searchPlaceholder: "Search claims by item name, owner or finder...",
  tabs: [
    "All",
    "Submitted",
    "Accepted",
    "Handover",
    "Completed",
    "Rejected",
  ],
  filters: [
    {
      id: "status",
      label: "STATUS",
      options: [
        "All",
        "Submitted",
        "Accepted",
        "Handover",
        "Completed",
        "Rejected",
      ],
    },
    {
      id: "type",
      label: "CLAIM TYPE",
      options: ["All", "Lost", "Found"],
    },
  ],
};

export const claimFilterIcons = {
  search: FiSearch,
  dropdown: FiChevronDown,
};

// table

export const claimTableData = [
  {
    id: 1,

    itemName: "iPhone 13",
    image:
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200",

    type: "Lost",

    owner: "Tharindu Perera",
    ownerImage: "https://i.pravatar.cc/100?img=12",

    finder: "Tharindu Perera",
    finderImage: "https://i.pravatar.cc/100?img=12",

    date: "2025-01-15",

    status: "Accepted",
  },

  {
    id: 2,

    itemName: "Wallet",
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=200",

    type: "Found",

    owner: "Sehansa Minduli",
    ownerImage: "https://i.pravatar.cc/100?img=47",

    finder: "Sehansa Minduli",
    finderImage: "https://i.pravatar.cc/100?img=47",

    date: "2025-01-15",

    status: "Handover Arranged",
  },

  {
    id: 3,

    itemName: "Laptop",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200",

    type: "Lost",

    owner: "Saranga Hewage",
    ownerImage: "https://i.pravatar.cc/100?img=11",

    finder: "Saranga Hewage",
    finderImage: "https://i.pravatar.cc/100?img=11",

    date: "2025-01-15",

    status: "Accepted",
  },

  {
    id: 4,

    itemName: "Car Keys",
    image:
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=200",

    type: "Lost",

    owner: "Pinithi Nimsara",
    ownerImage: "https://i.pravatar.cc/100?img=45",

    finder: "Pinithi Nimsara",
    finderImage: "https://i.pravatar.cc/100?img=45",

    date: "2025-01-15",

    status: "Completed",
  },

  {
    id: 5,

    itemName: "Backpack",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200",

    type: "Found",

    owner: "Heshan Kavinda",
    ownerImage: "https://i.pravatar.cc/100?img=13",

    finder: "Heshan Kavinda",
    finderImage: "https://i.pravatar.cc/100?img=13",

    date: "2025-01-15",

    status: "Rejected",
  },

  {
    id: 6,

    itemName: "Gold Ring",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=200",

    type: "Found",

    owner: "Kavindu Sandeepa",
    ownerImage: "https://i.pravatar.cc/100?img=14",

    finder: "Kavindu Sandeepa",
    finderImage: "https://i.pravatar.cc/100?img=14",

    date: "2025-01-15",

    status: "In Progress",
  },

  {
    id: 7,

    itemName: "iPhone 12",
    image:
      "https://images.unsplash.com/photo-1603898037225-1bea09c550c0?w=200",

    type: "Found",

    owner: "Dilusha Lakshan",
    ownerImage: "https://i.pravatar.cc/100?img=15",

    finder: "Dilusha Lakshan",
    finderImage: "https://i.pravatar.cc/100?img=15",

    date: "2025-01-15",

    status: "Rejected",
  },

  {
    id: 8,

    itemName: "Laptop",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200",

    type: "Lost",

    owner: "Saranga Hewage",
    ownerImage: "https://i.pravatar.cc/100?img=11",

    finder: "Saranga Hewage",
    finderImage: "https://i.pravatar.cc/100?img=11",

    date: "2025-01-15",

    status: "Accepted",
  },
];


// icons


export const claimTableIcons = {
  view: FiEye,

  previous: FiChevronLeft,
  next: FiChevronRight,

  accepted: MdOutlineHandshake,
  handover: MdOutlineAccessTime,
  completed: MdOutlineHandshake,
  rejected: FiXCircle,
  progress: MdOutlineAccessTime,
  submitted: FiCheckCircle,
};

