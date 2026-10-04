import acerLaptop from "../assets/images/acerLaptop.jpg";
import iphone1 from "../assets/images/LpIphone1.avif";
import carKey1 from "../assets/images/UdbCarKey1.webp";
import watch1 from "../assets/images/UdbWatch1.avif";
import leatherBag from "../assets/images/UdbLeatherBag.avif";
import umbrella1 from "../assets/images/UdbUmbrella1.avif";
import dog1 from "../assets/images/UdbDog1.avif";
import handBag from "../assets/images/LpLeatherHandbag.avif";
import bicycle from "../assets/images/LpBicycle1.avif";
import cat from "../assets/images/LpPersianCat.avif";

import { lostItemCategories, districts } from "./ReportLost";
import { dateFilterOptions as myReportsDateFilterOptions } from "./myReportsData";

export const initialBrowseItems = [
  // Row 1
  {
    id: "bi-01",
    title: "dell Laptop",
    category: "Electronics",
    location: "Galle",
    district: "Galle",
    date: "June 20, 2026",
    rawDate: "2026-06-20",
    status: "Lost",
    image: acerLaptop,
  },
  {
    id: "bi-02",
    title: "acer Laptop",
    category: "Electronics",
    location: "Galle",
    district: "Galle",
    date: "June 20, 2026",
    rawDate: "2026-06-20",
    status: "Found",
    image: acerLaptop,
  },
  {
    id: "bi-03",
    title: "asus Laptop",
    category: "Electronics",
    location: "Galle",
    district: "Galle",
    date: "June 20, 2026",
    rawDate: "2026-06-20",
    status: "Lost",
    image: acerLaptop,
  },
  {
    id: "bi-04",
    title: "lenovo Laptop",
    category: "Electronics",
    location: "Galle",
    district: "Galle",
    date: "June 20, 2026",
    rawDate: "2026-06-20",
    status: "Lost",
    image: acerLaptop,
  },

  // Row 2
  {
    id: "bi-05",
    title: "acer Laptop",
    category: "Electronics",
    location: "Galle",
    district: "Galle",
    date: "June 20, 2026",
    rawDate: "2026-06-20",
    status: "Found",
    image: acerLaptop,
  },
  {
    id: "bi-06",
    title: "acer Laptop",
    category: "Electronics",
    location: "Galle",
    district: "Galle",
    date: "June 20, 2026",
    rawDate: "2026-06-20",
    status: "Lost",
    image: acerLaptop,
  },
  {
    id: "bi-07",
    title: "acer Laptop",
    category: "Electronics",
    location: "Galle",
    district: "Galle",
    date: "June 20, 2026",
    rawDate: "2026-06-20",
    status: "Found",
    image: acerLaptop,
  },
  {
    id: "bi-08",
    title: "acer Laptop",
    category: "Electronics",
    location: "Galle",
    district: "Galle",
    date: "June 20, 2026",
    rawDate: "2026-06-20",
    status: "Lost",
    image: acerLaptop,
  },

  // Row 3
  {
    id: "bi-09",
    title: "acer Laptop",
    category: "Electronics",
    location: "Galle",
    district: "Galle",
    date: "June 20, 2026",
    rawDate: "2026-06-20",
    status: "Lost",
    image: acerLaptop,
  },
  {
    id: "bi-10",
    title: "acer Laptop",
    category: "Electronics",
    location: "Galle",
    district: "Galle",
    date: "June 20, 2026",
    rawDate: "2026-06-20",
    status: "Found",
    image: acerLaptop,
  },
  {
    id: "bi-11",
    title: "acer Laptop",
    category: "Electronics",
    location: "Galle",
    district: "Galle",
    date: "June 20, 2026",
    rawDate: "2026-06-20",
    status: "Lost",
    image: acerLaptop,
  },
  {
    id: "bi-12",
    title: "acer Laptop",
    category: "Electronics",
    location: "Galle",
    district: "Galle",
    date: "June 20, 2026",
    rawDate: "2026-06-20",
    status: "Found",
    image: acerLaptop,
  },

  // Row 4
  {
    id: "bi-13",
    title: "acer Laptop",
    category: "Electronics",
    location: "Galle",
    district: "Galle",
    date: "June 20, 2026",
    rawDate: "2026-06-20",
    status: "Lost",
    image: acerLaptop,
  },
  {
    id: "bi-14",
    title: "acer Laptop",
    category: "Electronics",
    location: "Galle",
    district: "Galle",
    date: "June 20, 2026",
    rawDate: "2026-06-20",
    status: "Found",
    image: acerLaptop,
  },
  {
    id: "bi-15",
    title: "acer Laptop",
    category: "Electronics",
    location: "Galle",
    district: "Galle",
    date: "June 20, 2026",
    rawDate: "2026-06-20",
    status: "Lost",
    image: acerLaptop,
  },
  {
    id: "bi-16",
    title: "acer Laptop",
    category: "Electronics",
    location: "Galle",
    district: "Galle",
    date: "June 20, 2026",
    rawDate: "2026-06-20",
    status: "Found",
    image: acerLaptop,
  },

  // Subsequent items for pagination & category discovery
  {
    id: "bi-17",
    title: "Apple iPhone 13",
    category: "Electronics",
    location: "Colombo 07",
    district: "Colombo",
    date: "June 18, 2026",
    rawDate: "2026-06-18",
    status: "Found",
    image: iphone1,
  },
  {
    id: "bi-18",
    title: "Leather Handbag",
    category: "Bags & Wallets",
    location: "Galle Fort",
    district: "Galle",
    date: "June 17, 2026",
    rawDate: "2026-06-17",
    status: "Lost",
    image: handBag,
  },
  {
    id: "bi-19",
    title: "Toyota Smart Key",
    category: "Personal Items",
    location: "Matara",
    district: "Matara",
    date: "June 15, 2026",
    rawDate: "2026-06-15",
    status: "Found",
    image: carKey1,
  },
  {
    id: "bi-20",
    title: "Classic Wristwatch",
    category: "Jewellery",
    location: "Kandy",
    district: "Kandy",
    date: "June 14, 2026",
    rawDate: "2026-06-14",
    status: "Found",
    image: watch1,
  },
  {
    id: "bi-21",
    title: "Black Travel Umbrella",
    category: "Personal Items",
    location: "University Campus",
    district: "Colombo",
    date: "June 12, 2026",
    rawDate: "2026-06-12",
    status: "Found",
    image: umbrella1,
  },
  {
    id: "bi-22",
    title: "Brown Leather Wallet",
    category: "Bags & Wallets",
    location: "Main Library",
    district: "Galle",
    date: "June 10, 2026",
    rawDate: "2026-06-10",
    status: "Lost",
    image: leatherBag,
  },
  {
    id: "bi-23",
    title: "Golden Retriever",
    category: "Pets & Animals",
    location: "Galle",
    district: "Galle",
    date: "June 08, 2026",
    rawDate: "2026-06-08",
    status: "Lost",
    image: dog1,
  },
  {
    id: "bi-24",
    title: "Mountain Bicycle",
    category: "Vehicles",
    location: "Nuwara Eliya",
    district: "Nuwara Eliya",
    date: "June 05, 2026",
    rawDate: "2026-06-05",
    status: "Lost",
    image: bicycle,
  },
  {
    id: "bi-25",
    title: "Persian Cat",
    category: "Pets & Animals",
    location: "Kandy",
    district: "Kandy",
    date: "June 02, 2026",
    rawDate: "2026-06-02",
    status: "Found",
    image: cat,
  },
];

// 1. Filter by Category -> Use categories from Report a Lost Item page
export const categoryFilterOptions = [
  { value: "all", label: "All Categories" },
  ...lostItemCategories.map((cat) => ({ value: cat, label: cat })),
];

// 2. Filter by District -> Use districts from Report a Lost Item page
export const districtFilterOptions = [
  { value: "all", label: "All Districts" },
  ...districts.map((dist) => ({ value: dist, label: dist })),
];

// 3. Filter by Date -> Use date options from My Reports page
export const dateFilterOptions = myReportsDateFilterOptions;

// 4. Filter by Status -> only Lost and Found
export const statusFilterOptions = [
  { value: "all", label: "All Status" },
  { value: "Lost", label: "Lost" },
  { value: "Found", label: "Found" },
];

export const ITEMS_PER_PAGE = 16;
