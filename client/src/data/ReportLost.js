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
  title: "Report a Lost Item",

  subtitle:
    "Help the community identify your item by providing as much detail as possible.",

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

export const lostItemCategories = [
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
    "Describe unique features, brand names, contents, or serial numbers...",

  maxLength: 1000,
};

/* ===========================================
   Safety Reminder
=========================================== */

export const safetyReminder = {
  title: "Safety Reminder",

  description:
    "For your safety, always meet in a well-lit public place like a police station or shopping mall to return the item. Never share sensitive personal information.",
};

/* ===========================================
   Section Titles
=========================================== */

export const LostFoundFormSections = {
  itemDetails: {
    title: "Lost Item Details",
    icon: FiPackage,
  },

  location: {
    title: "Lost Location",
    icon: FiMapPin,
  },

  dateTime: {
    title: "Lost Date & Time",
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
  /* Item Details */

  itemTitlePlaceholder:
    "e.g., iPhone 13 - Midnight Blue",

  categoryPlaceholder: "Select Category",

  categories: lostItemCategories,

  sections: LostFoundFormSections,

  /* Location */

  locationLabel: "Lost Location",

  locationPlaceholder:
    "Street name, landmark or city",

  districtLabel: "Lost District",

  districtPlaceholder: "Select District",

  districts,

  /* Date & Time */

  dateLabel: "Lost Date",

  timeLabel: "Lost Time",

  /* Upload */

  upload: uploadSettings,

  /* Description */

  description: descriptionSettings,

  /* Safety Reminder */

  safetyReminder,
};