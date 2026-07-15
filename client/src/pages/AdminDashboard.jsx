import { useState } from "react";
import { FiSearch, FiBell, FiCalendar,FiUsers, FiClipboard, FiCheckCircle, FiClock } from "react-icons/fi";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import ProfileImg from "../assets/icons/ProfileImg.jpeg";
import iphone from  "../assets/images/iphone.png";
import umbrella from  "../assets/images/umbrella.png";
import dog from  "../assets/images/dog.jpg";
import watch from  "../assets/images/watch.png";


import AdminNavBar from "../components/AdminNavBar";

export default function AdminDashboard() {

  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const stats = [
  {
    title: "Total Users",
    value: "15,642",
    sub: "↑ 12.5% from last 30 days",
    icon: <FiUsers size={24} />,
  },
  {
    title: "Total Reports",
    value: "1,248",
    sub: "↑ 8.3% from last 30 days",
    icon: <FiClipboard size={24} />,
  },
  {
    title: "Recovered",
    value: "840",
    sub: "↑ 15.7% from last 30 days",
    icon: <FiCheckCircle size={24} />,
  },
  {
    title: "Pending",
    value: "18",
    sub: "Review Required",
    icon: <FiClock size={24} />,
  },
];

const approvals = [
  {
    id: "#APP-1252",
    image: iphone,
    title: "iPhone 14 Pro",
    type: "Lost",
    category: "Electronics",
    user: "Kasun Perera",
    date: "Jun 20, 2025",
    status: "Pending",
  },
  {
    id: "#APP-1240",
    image: umbrella,
    title: "umbrella",
    type: "Found",
    category: "Outdoor Equipment",
    user: "Nimal Silva",
    date: "Jun 18, 2025",
    status: "Pending",
  },
  {
    id: "#APP-1256",
    image: dog,
    title: "Golden Retriever ",
    type: "Lost",
    category: "pets",
    user: "Amal Perera",
    date: "Jun 17, 2025",
    status: "Pending",
  },
  {
    id: "#APP-1230",
    image: watch,
    title: "luxury watch",
    type: "Found",
    category: "Accessories",
    user: "Saman Kumara",
    date: "Jun 15, 2025",
    status: "Pending",
  },
];


  return (
  <div className="flex min-h-screen">
    <AdminNavBar />

    <div className="flex-1 bg-gray-50 p-8">

      {/* Top Bar */}
      <div className="flex items-center justify-between mb-8">

        <div className="flex items-center bg-white/70 backdrop-blur-md border border-white/30 rounded-xl px-4 py-3 w-[430px] shadow-md  hover:shadow-xl hover:bg-white">
          <FiSearch className="text-gray-400 text-xl" />

          <input
            type="text"
            placeholder="Search reports, items, or locations..."
            className="flex-1 px-3 outline-none"
          />

          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Search
          </button>
        </div>

        <div className="flex items-center gap-6">
          <FiBell className="text-2xl text-orange-400 cursor-pointer" />

          <div className="text-right">
            <h3 className="font-semibold">Kasun Perera</h3>
            <p className="text-sm text-gray-500">Pro Member</p>
          </div>

          <img
            src={ProfileImg}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
        </div>

      </div>

      {/* Dashboard Heading */}
      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-4xl font-bold text-slate-700">
            Dashboard Overview
          </h1>

          <p className="text-gray-500 mt-2">
            Welcome back, Admin! Here's what's happening today.
          </p>
        </div>

{/* calender dropdown */}

        <div className="relative">
  <button
    onClick={() => setShowCalendar(!showCalendar)}
    className="flex items-center gap-3 border border-gray-300 rounded-xl px-5 py-3 bg-white shadow-sm hover:shadow-md transition"
  >
    <FiCalendar className="text-blue-600 text-xl" />

    <span className="text-gray-700 font-medium">
      {selectedDate.toLocaleDateString()}
    </span>
  </button>

  {showCalendar && (
    <div className="absolute right-0 mt-3 bg-white border border-gray-200 rounded-2xl shadow-xl p-4 z-50">
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={(date) => {
          if (date) {
            setSelectedDate(date);
            setShowCalendar(false);
          }
        }}
      />
    </div>
  )}
</div>
</div>

{/* cards */}

      <div className="grid grid-cols-4 gap-5 mb-10">

        {stats.map((item) => (
          <div
            key={item.title}
            className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl p-5 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-blue-500 hover:bg-white">
            <div className="flex items-center gap-3 text-blue-500">
              {item.icon}
              <h3 className="font-semibold text-lg text-slate-700">
                {item.title}
              </h3>
            </div>

            <h2 className="text-4xl font-bold text-blue-700 mt-5">
              {item.value}
            </h2>

            <p className="text-xs text-gray-500 mt-2">{item.sub}</p>
          </div>
        ))}
      </div>

{/* approvel table */}

<div className="flex justify-between items-center px-6 py-5">
          <h2 className="text-3xl font-bold text-slate-700">
            Pending Approvals
          </h2>

          <button className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm">
            View All
          </button>
        </div>

<div className="bg-white rounded-xl border shadow-sm overflow-x-auto">

  <table className="w-full text-sm">

    <thead className="bg-gray-50 border-b">
      <tr className="text-gray-700">
        <th className="px-6 py-4 text-center">Id</th>
        <th className="px-6 py-4 text-left">Item Title</th>
        <th className="px-6 py-4 text-center">Type</th>
        <th className="px-6 py-4 text-center">Category</th>
        <th className="px-6 py-4 text-center">Submitted By</th>
        <th className="px-6 py-4 text-center">Date</th>
        <th className="px-6 py-4 text-center">Status</th>
        <th className="px-6 py-4 text-center">Action</th>
      </tr>
    </thead>

    <tbody>
      {approvals.map((item) => (
        <tr
          key={item.id}
          className="border-b hover:bg-gray-50"
        >
          <td className="px-6 py-4 text-center">
            {item.id}
          </td>

          <td className="px-6 py-4">
  <div className="flex items-center gap-3">
    <img
      src={item.image}
      alt={item.title}
      className="w-10 h-10 rounded-lg object-cover"
    />

    <span className="font-medium">
      {item.title}
    </span>
  </div>
</td>

          <td className="px-6 py-4 text-center">
  <span
    className={
      item.type === "Lost"
        ? "text-red-600 font-medium"
        : "text-green-600 font-medium"
    }
  >
    {item.type}
  </span>
</td>

          <td className="px-6 py-4 text-center">
            {item.category}
          </td>

          <td className="px-6 py-4 text-center">
            {item.user}
          </td>

          <td className="px-6 py-4 text-center">
            {item.date}
          </td>

          <td className="px-6 py-4 text-center">
            <span className="text-orange-500 font-medium">
              {item.status}
            </span>
          </td>

          <td className="px-6 py-4">
            <div className="flex justify-center gap-2">
              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-full text-xs flex-nowrap whitespace-nowrap ">
                Approve
              </button>

              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-full text-xs">
                Reject
              </button>
            </div>
          </td>

        </tr>
      ))}
    </tbody>

  </table>

</div>


    </div>
  </div>
);
}