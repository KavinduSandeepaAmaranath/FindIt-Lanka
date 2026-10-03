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

//header data

export const allItemsHeaderData = {
  title: "All Items",

  description:
    "View and manage all active lost and found items in the system.",

  profile: {
    name: "Kasun Perera",
    role: "Pro Member",
  },
};

//header icons

export const allItemsHeaderIcons = {
  notification: FiBell,
  profile: FiUser,
  menu: FiMenu,
};

//cards data

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

//search & filter data

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

//filter icons

export const allItemsFilterIcons = {
  search: FiSearch,
  chevronDown: FiChevronDown,
};

//table columns

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

//table data

export const allItemsTableData = [
  {
    id: 1,
    itemName: "iPhone 13",
    image: "/images/items/iphone-13.jpg",
    type: "Found",
    location: "Galle",
    date: "2026-10-02",
    itemStatus: "Returned",
    claimStatus: null,
    description: "Black iPhone 13 found near Galle fort.",
    reportedBy: "Kasun Perera",
    contact: "+94 77 123 4567",
  },
  {
    id: 2,
    itemName: "Wallet",
    image: "/images/items/wallet.jpg",
    type: "Lost",
    location: "Colombo",
    date: "2026-10-02",
    itemStatus: "Active",
    claimStatus: "Claimed",
    description: "Brown leather wallet lost at Pettah.",
    reportedBy: "Nimal Silva",
    contact: "+94 71 987 6543",
  },
  {
    id: 3,
    itemName: "Laptop",
    image: "/images/items/laptop.jpg",
    type: "Found",
    location: "Galle",
    date: "2026-10-01",
    itemStatus: "Returned",
    claimStatus: null,
    description: "Silver Dell laptop in black bag.",
    reportedBy: "Dilani Fernando",
    contact: "+94 75 444 3322",
  },
  {
    id: 4,
    itemName: "Car Keys",
    image: "/images/items/car-keys.jpg",
    type: "Lost",
    location: "Colombo",
    date: "2026-10-01",
    itemStatus: "Active",
    claimStatus: "Unclaimed",
    description: "Toyota car key remote control.",
    reportedBy: "Arjun Wickrama",
    contact: "+94 72 111 2233",
  },
  {
    id: 5,
    itemName: "Backpack",
    image: "/images/items/backpack.jpg",
    type: "Found",
    location: "Matara",
    date: "2026-09-29",
    itemStatus: "Returned",
    claimStatus: null,
    description: "Blue Adidas backpack with books.",
    reportedBy: "Sahan Jayasuriya",
    contact: "+94 76 555 4433",
  },
  {
    id: 6,
    itemName: "Gold Ring",
    image: "/images/items/gold-ring.jpg",
    type: "Lost",
    location: "Gampaha",
    date: "2026-09-29",
    itemStatus: "Active",
    claimStatus: "Claimed",
    description: "Small gold ring engraved with initials.",
    reportedBy: "Kavindu Amaranath",
    contact: "+94 78 888 9999",
  },
  {
    id: 7,
    itemName: "iPhone 12",
    image: "/images/items/iphone-12.jpg",
    type: "Found",
    location: "Badulla",
    date: "2026-09-29",
    itemStatus: "Active",
    claimStatus: "Unclaimed",
    description: "White iPhone 12 in transparent case.",
    reportedBy: "Senuri Dias",
    contact: "+94 70 333 2211",
  },
  {
    id: 8,
    itemName: "Black Watch",
    image: "/images/items/watch.jpg",
    type: "Lost",
    location: "Kandy",
    date: "2026-09-22",
    itemStatus: "Returned",
    claimStatus: null,
    description: "Casio G-Shock black digital watch.",
    reportedBy: "Ruwan Bandara",
    contact: "+94 77 666 5544",
  },
  {
    id: 9,
    itemName: "Blue Water Bottle",
    image: "/images/items/water-bottle.jpg",
    type: "Found",
    location: "Badulla",
    date: "2026-09-22",
    itemStatus: "Active",
    claimStatus: "Unclaimed",
    description: "Steel blue water bottle.",
    reportedBy: "Pathum Nissanka",
    contact: "+94 71 222 3344",
  },
  {
    id: 10,
    itemName: "Student ID Card",
    image: "/images/items/id-card.jpg",
    type: "Lost",
    location: "Galle",
    date: "2026-09-22",
    itemStatus: "Active",
    claimStatus: "Unclaimed",
    description: "University Student ID Card.",
    reportedBy: "Kamal Perera",
    contact: "+94 75 999 0000",
  },
  {
    id: 11,
    itemName: "Umbrella",
    image: "/images/items/umbrella.jpg",
    type: "Lost",
    location: "Colombo",
    date: "2026-10-02",
    itemStatus: "Active",
    claimStatus: "Unclaimed",
    description: "Foldable black rain umbrella.",
    reportedBy: "Sunil Shantha",
    contact: "+94 77 000 1122",
  },
];

//table icons

export const allItemsTableIcons = {
  view: FiEye,
  returned: FiRepeat,
  active: FiCircle,
  claimed: FiCheckCircle,
  unclaimed: FiXCircle,
};


