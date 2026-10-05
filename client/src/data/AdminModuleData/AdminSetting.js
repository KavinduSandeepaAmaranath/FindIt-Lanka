import {
  FiSettings,
  FiUser,
  FiLock,
  FiBell,
  FiGlobe,
  FiAlertTriangle,
  FiShield,
  FiSave,
  FiKey,
  FiMonitor,
  FiActivity,
  FiFileText,
  FiMail,
  FiImage,
  FiList,
  FiTool,
  FiUserPlus,
  FiTrash2,
  FiPower,
  FiDatabase,
  FiCalendar,
  FiClock,
  FiPhone,
  FiMapPin,
  FiCamera,
  FiChevronDown,
} from "react-icons/fi";



export const adminSettingHeaderData = {
  title: "Admin Settings",
  description:
    "Manage your administrator account and FindIt Lanka platform settings.",
};

export const adminSettingHeaderIcons = {
  settings: FiSettings,
};


export const settingsSidebarData = [
  {
    id: "general",
    title: "General",
    icon: FiSettings,
  },
  {
    id: "profile",
    title: "Admin Profile",
    icon: FiUser,
  },
  {
    id: "security",
    title: "Security",
    icon: FiLock,
  },
  {
    id: "notifications",
    title: "Notifications",
    icon: FiBell,
  },
  {
    id: "platform",
    title: "Platform",
    icon: FiGlobe,
  },
  {
    id: "danger",
    title: "Danger Zone",
    icon: FiAlertTriangle,
    danger: true,
  },
];


export const generalSettingsData = {
  title: "General Settings",
  description:
    "Basic information about your platform.",

  fields: {
    platformName: {
      label: "Platform Name",
      value: "FindIt Lanka",
      icon: FiUser,
    },

    defaultLanguage: {
      label: "Default Language",
      value: "English",
      options: [
        "English",
        "Sinhala",
        "Tamil",
      ],
      icon: FiGlobe,
    },

    platformDescription: {
      label: "Platform Description",
      value:
        "Sri Lanka's Lost & Found Platform",
    },

    timeZone: {
      label: "Time Zone",
      value: "Asia/Colombo",
      options: [
        "Asia/Colombo",
        "Asia/Kolkata",
        "UTC",
      ],
      icon: FiClock,
    },

    dateFormat: {
      label: "Date Format",
      value: "DD/MM/YYYY",
      options: [
        "DD/MM/YYYY",
        "MM/DD/YYYY",
        "YYYY-MM-DD",
      ],
      icon: FiCalendar,
    },
  },

  saveButton: "Save Changes",
  saveIcon: FiSave,
};


export const platformStatusData = {
  title: "Platform Status",
  description:
    "Current platform status and maintenance mode.",

  status: {
    label: "Platform Status",
    value: "Active",
    active: true,
  },

  maintenance: {
    label: "Maintenance Mode",
    value: "Off",
    active: false,
  },

  icon: FiActivity,
};


export const adminProfileData = {
  title: "Admin Profile",
  description:
    "Manage your administrator account information.",

  fields: {
    fullName: {
      label: "Full Name",
      value: "Admin Perera",
      icon: FiUser,
    },

    email: {
      label: "Email Address",
      value: "admin@finditlanka.lk",
      icon: FiMail,
    },

    phone: {
      label: "Phone Number",
      value: "+94 77 123 4567",
      icon: FiPhone,
    },
  },

  changePhotoText: "Change Photo",
  saveButton: "Save Changes",

  icons: {
    profile: FiUser,
    camera: FiCamera,
    save: FiSave,
  },
};


export const securitySettingsData = {
  title: "Security",
  description:
    "Protect your administrator account.",

  changePassword: {
    title: "Change Password",
    description:
      "Update your password regularly to keep your account secure.",
    buttonText: "Change Password",
    icon: FiKey,
  },

  twoFactor: {
    title: "Two-Factor Authentication",
    description:
      "Add an extra layer of security to your account.",
    disabledText: "Disabled",
    icon: FiShield,
  },

  loginActivity: {
    title: "Login Activity",
    description:
      "View and manage all locations that have accessed your account.",
    buttonText: "View Activity",
    icon: FiMonitor,
  },

  mainIcon: FiLock,
};


export const notificationPreferencesData = {
  title: "Notification Preferences",
  description:
    "Choose what notifications you want to receive.",

  items: [
    {
      id: "reports",
      title: "Report Notifications",
      description:
        "Get notified about new reports and report updates.",
      icon: FiFileText,
      enabled: true,
    },

    {
      id: "system",
      title: "System Notifications",
      description:
        "Get notified about system updates and alerts.",
      icon: FiSettings,
      enabled: true,
    },

    {
      id: "claims",
      title: "Claim Notifications",
      description:
        "Get notified about claim activities and status updates.",
      icon: FiShield,
      enabled: true,
    },

    {
      id: "email",
      title: "Email Notifications",
      description:
        "Receive important updates through email.",
      icon: FiMail,
      enabled: true,
    },

    {
      id: "users",
      title: "User Notifications",
      description:
        "Get notified about new user registrations and activity.",
      icon: FiUser,
      enabled: true,
    },
  ],

  mainIcon: FiBell,
};



export const platformSettingsData = {
  title: "Platform Settings",
  description:
    "Configure FindIt Lanka platform behavior and features.",

  toggles: [
    {
      id: "newRegistrations",
      title: "Allow New Registrations",
      description:
        "Let new users create accounts on the platform.",
      enabled: true,
      icon: FiUserPlus,
    },

    {
      id: "itemReporting",
      title: "Allow Item Reporting",
      description:
        "Allow users to submit lost and found reports.",
      enabled: true,
      icon: FiFileText,
    },

    {
      id: "maintenance",
      title: "Maintenance Mode",
      description:
        "Temporarily disable public access to the platform.",
      enabled: false,
      icon: FiTool,
    },
  ],

  fields: {
    maximumImageUploadSize: {
      label: "Maximum Image Upload Size",
      value: "5 MB",
      options: [
        "2 MB",
        "5 MB",
        "10 MB",
        "20 MB",
      ],
      icon: FiImage,
    },

    defaultItemsPerPage: {
      label: "Default Items Per Page",
      value: "10",
      options: [
        "5",
        "10",
        "20",
        "50",
      ],
      icon: FiList,
    },
  },

  mainIcon: FiGlobe,
  saveButton: "Save Changes",
  saveIcon: FiSave,
};


export const dangerZoneData = {
  title: "Danger Zone",
  description:
    "These actions can affect the entire platform. Use with caution.",

  items: [
    {
      id: "disable",
      title: "Disable Platform",
      description:
        "Temporarily disable public access to the platform.",
      buttonText: "Disable Platform",
      icon: FiPower,
    },

    {
      id: "clear",
      title: "Clear Notification History",
      description:
        "Remove all system notifications.",
      buttonText: "Clear Notifications",
      icon: FiTrash2,
    },
  ],

  mainIcon: FiAlertTriangle,
};


export const adminSettingIcons = {
  chevronDown: FiChevronDown,
  database: FiDatabase,
  mapPin: FiMapPin,
};