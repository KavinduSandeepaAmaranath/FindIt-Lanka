import { FiSearch,
           FiX,
          FiAlertTriangle,
          FiUsers,
          FiUserCheck,
          FiUserX,
          FiUserPlus,
          FiMenu
 } from "react-icons/fi";

import ProfileImg from "../assets/icons/ProfileImg.jpeg";

export const usersHeader = {
  title: "Users Management",

  subtitle:
    "Manage registered users, monitor activity and account status.",

  searchPlaceholder:
    "Search users by name, email or phone...",

  filterOptions: [
    "All Users",
    "Active Users",
    "Suspend Users",
    "New Users",
  ],

  icons: {
    search: FiSearch,
    menu: FiMenu,
  },
};


export const userscard = [
  {
    title: "Total Users",

    value: "1,248",

    description:
      "All registered users",

    change:
      "↑ 12.5% from last 30 days",

    icon: FiUsers,
  },

  {
    title: "Active Users",

    value: "1,102",

    description:
      "Currently active users",

    change:
      "↑ 8.7% vs last month",

    icon: FiUserCheck,
  },

  {
    title: "Suspended Users",

    value: "146",

    description:
      "Suspended accounts",

    change:
      "↑ 3.2% vs last month",

    icon: FiUserX,
  },

  {
    title: "New Users This Month",

    value: "146",

    description:
      "New registrations",

    change:
      "↑ 3.2% vs last month",

    icon: FiUserPlus,
  },
];

export const users = [
  {
    id: "USR001",
    image: ProfileImg,
    name: "Tharindu Perera",
    email: "tharindu.perera@gmail.com",
    phone: "071 446 5678",
    district: "Galle",
    registered: "2025-01-15",
    lost: 13,
    found: 8,
    claims: 6,
    status: "Active",
  },

  {
    id: "USR002",
    image: ProfileImg,
    name: "Kamal Perera",
    email: "kamalperera@gmail.com",
    phone: "071 234 6876",
    district: "Colombo",
    registered: "2025-01-15",
    lost: 32,
    found: 24,
    claims: 5,
    status: "Suspended",
  },

  {
    id: "USR003",
    image: ProfileImg,
    name: "Saranga Hewage",
    email: "sarangahewage@gmail.com",
    phone: "071 355 6754",
    district: "Galle",
    registered: "2025-01-15",
    lost: 9,
    found: 7,
    claims: 4,
    status: "Active",
  },

  {
    id: "USR004",
    image: ProfileImg,
    name: "Pinithi Nimsara",
    email: "pinithinimsara@gmail.com",
    phone: "071 345 5555",
    district: "Colombo",
    registered: "2025-01-15",
    lost: 21,
    found: 13,
    claims: 7,
    status: "Active",
  },

  {
    id: "USR005",
    image: ProfileImg,
    name: "Heshan Kavinda",
    email: "heshankavinda@gmail.com",
    phone: "071 343 4657",
    district: "Matara",
    registered: "2025-01-15",
    lost: 12,
    found: 16,
    claims: 9,
    status: "Active",
  },

  {
    id: "USR006",
    image: ProfileImg,
    name: "Kavindu Sandeepa",
    email: "kavindusandeepa@gmail.com",
    phone: "071 656 4546",
    district: "Gampaha",
    registered: "2025-01-15",
    lost: 21,
    found: 15,
    claims: 8,
    status: "Suspended",
  },

  {
    id: "USR007",
    image: ProfileImg,
    name: "Dilusha Lakshan",
    email: "dilushalakshan@gmail.com",
    phone: "071 453 4544",
    district: "Badulla",
    registered: "2025-01-15",
    lost: 5,
    found: 5,
    claims: 3,
    status: "Active",
  },

  {
    id: "USR008",
    image: ProfileImg,
    name: "Sehansa Minduli",
    email: "sehansaminduli@gmail.com",
    phone: "071 544 4566",
    district: "Kandy",
    registered: "2025-01-15",
    lost: 7,
    found: 14,
    claims: 10,
    status: "Active",
  },

  {
    id: "USR009",
    image: ProfileImg,
    name: "Vimukthi Vishwa",
    email: "vimukthivishwa@gmail.com",
    phone: "071 898 4546",
    district: "Kandy",
    registered: "2025-01-15",
    lost: 11,
    found: 12,
    claims: 5,
    status: "Active",
  },

  {
    id: "USR010",
    image: ProfileImg,
    name: "Ameesha Dewmini",
    email: "ameeshadewmini@gmail.com",
    phone: "071 767 6565",
    district: "Colombo",
    registered: "2025-01-15",
    lost: 15,
    found: 16,
    claims: 4,
    status: "Suspended",
  },
];

export const suspendIcons = {
  close: FiX,
  warning: FiAlertTriangle,
  userSuspend: FiUserX,
};


export const suspendContent = {
  title: "Suspend User",
  subtitle: "Account restriction",
  warningText:
    "This user will not be able to access the system until reactivated.",
  cancelButton: "Cancel",
  confirmButton: "Confirm Suspend",
};