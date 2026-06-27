import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash,
  FaArrowRight, FaPhone, FaMapMarkerAlt,
} from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { FaChevronDown } from "react-icons/fa";

import googleIcon from "../assets/icons/google.png";
import facebookIcon from "../assets/icons/facebook.png";
import RegisterBgImage from "../assets/images/LoginRegBg.png";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState("Select your district");

  const districts = [
    "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo",
    "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara",
    "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar",
    "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya",
    "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya",
  ];

  return (
    <div className="min-h-screen w-screen flex flex-col lg:flex-row lg:h-screen lg:overflow-hidden">

      {/* ── Left side - Desktop only ── */}
      <div
        className="hidden lg:flex lg:w-[58%] h-full bg-cover bg-center bg-no-repeat flex-col items-center justify-end pb-10"
        style={{ backgroundImage: `url(${RegisterBgImage})` }}
      >
        <h1 className="font-['Poppins'] text-3xl xl:text-4xl font-bold text-[#2A3B63] text-center px-6">
          Helping Find What's Lost
        </h1>
        <p className="text-[#29292D] text-sm leading-6 mt-3 max-w-sm text-center px-6">
          Join our community to help others and recover what matters most.
          A safer, more connected way to manage lost items.
        </p>
        <p className="font-['Poppins'] text-2xl font-bold text-[#2A3B63] mt-4">
          FindIt Lanka
        </p>
      </div>

      {/* ── Mobile top banner ── */}
      <div
        className="lg:hidden w-full h-52 sm:h-64 bg-cover bg-center bg-no-repeat flex flex-col items-center justify-end pb-5"
        style={{ backgroundImage: `url(${RegisterBgImage})` }}
      >
        <h1 className="font-['Poppins'] text-2xl sm:text-3xl font-bold text-[#2A3B63]">
          FindIt Lanka
        </h1>
        <p className="text-[#29292D] text-xs sm:text-sm mt-1">
          Helping Find What's Lost
        </p>
      </div>

      {/* ── Right side / Form ── */}
      <div className="w-full lg:w-[42%] lg:h-full bg-gradient-to-b from-white to-blue-100 flex items-start lg:items-center justify-center px-4 sm:px-8 lg:px-8 py-6 lg:py-0 overflow-y-auto lg:overflow-hidden">

        <div className="w-full max-w-sm sm:max-w-md lg:max-w-sm flex flex-col">

          {/* Icon */}
          <div className="flex justify-center mb-3 sm:mb-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-600 rounded-xl flex items-center justify-center">
              <FaUserPlus className="text-white text-xl sm:text-2xl" />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-4 sm:mb-5">
            <h2 className="text-xl sm:text-2xl font-bold text-[#2A3B63] font-['Poppins']">
              Create Your Account
            </h2>
            <p className="text-[#64748B] text-xs sm:text-sm mt-1">
              Become part of Sri Lanka's largest lost & found network
            </p>
          </div>

          <div className="flex flex-col gap-2.5 sm:gap-3">

            {/* Full Name */}
            <div>
              <label className="text-[#64748B] text-xs font-medium">Full Name</label>
              <div className="relative mt-1">
                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] text-sm" />
                <input
                  type="text"
                  placeholder="e.g. Kasun Perera"
                  style={{ paddingLeft: "36px" }}
                  className="w-full h-10 border border-gray-200 rounded-xl text-sm text-[#29292D] bg-white focus:outline-none focus:ring-2 focus:ring-[#2F6BFF] transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
                />
              </div>
            </div>

            {/* District */}

<div className="relative mt-2">
  <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] z-10 pointer-events-none" />

  <button
    type="button"
    onClick={() => setIsOpen(!isOpen)}
    className="relative w-full h-10 border border-gray-200 rounded-xl pr-4 flex items-center justify-end bg-white focus:outline-none focus:ring-2 focus:ring-[#2F6BFF] transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
  >
    <span
      className={`absolute left-10 top-1/2 -translate-y-1/2 text-[16px] ${
        selectedDistrict === "Select your district"
          ? "text-[#6B7280]"
          : "text-[#29292D]"
      }`}
    >
      {selectedDistrict}
    </span>

    <FaChevronDown
      className={`text-[#64748B] transition-transform ${
        isOpen ? "rotate-180" : ""
      }`}
    />
  </button>


  {isOpen && (
    <div className="absolute top-full left-0 right-0 mt-1 bg-blue-100/70 backdrop-blur-md rounded-xl shadow-lg max-h-60 overflow-y-auto z-50">
      {districts.map((district) => (
        <div
          key={district}
          onClick={() => {
            setSelectedDistrict(district);
            setIsOpen(false);
          }}
          className="px-10 py-3 text-[16px] text-[#29292D] cursor-pointer hover:bg-blue-200/70 transition-colors duration-200"
        >
          {district}
        </div>
      ))}
    </div>
  )}
</div>


            {/* Phone */}
            <div>
              <label className="text-[#64748B] text-xs font-medium">Phone Number</label>
              <div className="relative mt-1">
                <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] text-sm" />
                <input
                  type="text"
                  placeholder="+94 7X XXX XXXX"
                  style={{ paddingLeft: "36px" }}
                  className="w-full h-10 border border-gray-200 rounded-xl text-sm text-[#29292D] bg-white focus:outline-none focus:ring-2 focus:ring-[#2F6BFF] transition-all duration-300 hover:shadow-md"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-[#64748B] text-xs font-medium">E-Mail</label>
              <div className="relative mt-1">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] text-sm" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  style={{ paddingLeft: "36px" }}
                  className="w-full h-10 border border-gray-200 rounded-xl text-sm text-[#29292D] bg-white focus:outline-none focus:ring-2 focus:ring-[#2F6BFF] transition-all duration-300 hover:shadow-md"
                />
              </div>
            </div>

            {/* Password row */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <div>
                <label className="text-[#64748B] text-xs font-medium">Password</label>
                <div className="relative mt-1">
                  <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] text-sm" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    style={{ paddingLeft: "36px" }}
                    className="w-full h-10 border border-gray-200 rounded-xl text-sm text-[#29292D] bg-white focus:outline-none focus:ring-2 focus:ring-[#2F6BFF] transition-all duration-300 hover:shadow-md"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] text-sm">
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[#64748B] text-xs font-medium">Confirm Password</label>
                <div className="relative mt-1">
                  <VscWorkspaceTrusted className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] text-sm" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    style={{ paddingLeft: "36px" }}
                    className="w-full h-10 border border-gray-200 rounded-xl text-sm text-[#29292D] bg-white focus:outline-none focus:ring-2 focus:ring-[#2F6BFF] transition-all duration-300 hover:shadow-md"
                  />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] text-sm">
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
            </div>

            {/* Social divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-[#64748B] text-[10px] sm:text-[11px] tracking-wide">OR REGISTER WITH</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* Social buttons */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <button type="button"
                className="border border-gray-200 h-10 rounded-xl flex items-center justify-center gap-2 bg-white hover:bg-gray-50 transition duration-300 hover:shadow-md">
                <img src={googleIcon} alt="Google" className="w-5 h-5" />
                <span className="text-xs sm:text-sm">Google</span>
              </button>
              <button type="button"
                className="border border-gray-200 h-10 rounded-xl flex items-center justify-center gap-2 bg-white hover:bg-gray-50 transition duration-300 hover:shadow-md">
                <img src={facebookIcon} alt="Facebook" className="w-5 h-5" />
                <span className="text-xs sm:text-sm">Facebook</span>
              </button>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <input type="checkbox" className="w-4 h-4 mt-0.5 shrink-0" />
              <p className="text-[#64748B] text-xs leading-5">
                I agree to FindIt Lanka's{" "}
                <span className="text-[#2563EB] font-medium cursor-pointer hover:underline">Terms of Service</span>{" "}
                and{" "}
                <span className="text-[#2563EB] font-medium cursor-pointer hover:underline">Privacy Policy</span>
              </p>
            </div>

            {/* Submit */}
            <button type="submit"
              className="w-full h-10 bg-[#2F6BFF] text-white rounded-xl text-sm font-semibold hover:bg-[#1D4ED8] transition duration-300 hover:shadow-lg flex items-center justify-center gap-2">
              Create Account
              <FaArrowRight />
            </button>

            {/* Footer */}
            <div className="flex flex-col items-center gap-1 pb-4 lg:pb-0">
              <p className="text-[#64748B] text-xs">
                Already have an account?{" "}
                <Link to="/login" className="text-[#2563EB] font-medium hover:underline">Log in</Link>
              </p>
              <div className="flex items-center gap-1 text-[#64748B] text-xs">
                <VscWorkspaceTrusted className="text-[#040504]" />
                Verified Community Trusted
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;