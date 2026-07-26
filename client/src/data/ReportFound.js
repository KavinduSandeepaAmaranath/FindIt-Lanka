import {
  FiBell,
  FiPackage,
  FiMapPin,
  FiCalendar,
  FiImage,
  FiFileText,
  FiAlertTriangle,
} from "react-icons/fi";

/* ===========================================
   Header
=========================================== */

export const reportHeader = {
  title: "Report a Found Item",

  subtitle:
    "Help return an item to its rightful owner by providing accurate details.",

  profile: {
    name: "Kasun Perera",
    role: "Pro Member",
  },

  icons: {
    bell: FiBell,
  },
};

/* ===========================================
   Categories
=========================================== */

export const foundItemCategories = [
  "Electronics",
  "Personal Items",
  "Pets & Animals",
  "Bags & Wallets",
  "Documents",
  "Clothing",
  "Vehicles",
  "Jewellery",
  "Others",
];

/* ===========================================
   Districts
=========================================== */

export const districts = [
  "Colombo",
  "Gampaha",
  "Kalutara",
  "Kandy",
  "Matale",
  "Nuwara Eliya",
  "Galle",
  "Matara",
  "Hambantota",
  "Jaffna",
  "Kilinochchi",
  "Mannar",
  "Vavuniya",
  "Mullaitivu",
  "Batticaloa",
  "Ampara",
  "Trincomalee",
  "Kurunegala",
  "Puttalam",
  "Anuradhapura",
  "Polonnaruwa",
  "Badulla",
  "Monaragala",
  "Ratnapura",
  "Kegalle",
];

/* ===========================================
   Upload Settings
=========================================== */

export const uploadSettings = {
  title: "Upload Photo",

  subtitle: "JPG, PNG up to 5MB",

  maxImages: 10,

  imagesPerPage: 3,

  maxFileSize: 5,

  acceptedTypes: [
    "image/jpeg",
    "image/png",
  ],
};

/* ===========================================
   Description
=========================================== */

export const descriptionSettings = {
  placeholder:
    "Describe unique features, condition, or anything that helps identify the owner...",

  maxLength: 1000,
};

/* ===========================================
   Safety Reminder
=========================================== */

export const safetyReminder = {
  title: "Safety Reminder",

  description:
    "Meet the owner in a safe, public location during daylight when possible. Avoid sharing personal or financial information.",
};

/* ===========================================
   Form Sections
=========================================== */

export const LostFoundFormSections = {
  itemDetails: {
    title: "Found Item Details",
    icon: FiPackage,
  },

  location: {
    title: "Found Location",
    icon: FiMapPin,
  },

  dateTime: {
    title: "Found Date & Time",
    icon: FiCalendar,
  },

  upload: {
    title: "Upload Item Images",
    icon: FiImage,
  },

  description: {
    title: "Description",
    icon: FiFileText,
  },

  reminder: {
    title: "Safety Reminder",
    icon: FiAlertTriangle,
  },
};

/* ===========================================
   Form Data
=========================================== */

export const reportForm = {
  type: "found",
  // Item Details
  itemTitlePlaceholder: "e.g., iPhone 13 - Midnight Blue",

  categoryPlaceholder: "Select Category",

  categories: foundItemCategories,

  sections: LostFoundFormSections,

  // Location
  locationLabel: "Found Location",

  locationPlaceholder: "Street name, landmark or city",

  districtLabel: "Found District",

  districtPlaceholder: "Select District",

  districts,

  // Date & Time
  dateLabel: "Found Date",

  timeLabel: "Found Time",

  // Upload
  upload: uploadSettings,

  // Description
  description: descriptionSettings,

  // Safety Reminder
  safetyReminder,
};

