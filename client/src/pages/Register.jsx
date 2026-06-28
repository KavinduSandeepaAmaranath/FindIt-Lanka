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
import RegisterBgImage from "../assets/images/LoginRegBackground.png";

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
    <div className="
        min-h-screen w-screen
        flex flex-col lg:flex-row
        overflow-x-hidden
        lg:h-screen lg:overflow-hidden lg:fixed lg:inset-0
      ">

      {/* ── Left side  ── */}
      <div className="
          hidden lg:flex
          lg:w-[58%] xl:w-[58%]
          shrink-0
          h-full relative overflow-hidden
        ">
        <img
          src={RegisterBgImage}
          alt="Register"
          className="
            absolute inset-0
            w-full h-full
            object-cover object-center
          "
        />

        <div className="relative z-10 flex flex-col items-center justify-end w-full pb-8 xl:pb-12">
          <h1 className="
              font-['Poppins'] font-bold text-[#2A3B63] text-center px-6
              text-2xl xl:text-3xl 2xl:text-4xl
            ">
            Helping Find What's Lost
          </h1>

          <p className="
              text-[#29292D] leading-6 text-center mt-3
              max-w-xs xl:max-w-sm
              text-xs xl:text-sm
            ">
            Join our community to help others and recover what matters most.
            A safer, more connected way to manage lost items.
          </p>

          <p className="font-['Poppins'] text-xl xl:text-2xl font-bold text-[#2A3B63] mt-2">
            FindIt Lanka
          </p>
        </div>
      </div>


      <div className="
          lg:hidden
          w-full
          flex flex-col
          bg-white
        ">
        {/* Image — Responsive */}
        <img
          src={RegisterBgImage}
          alt="FindIt Lanka Register"
          className="
            w-full
            h-auto
            object-cover object-center
            max-h-64 sm:max-h-72
          "
        />

       
        <div className="
            flex flex-col items-center justify-center
            py-4 sm:py-5
            px-3 sm:px-6
            bg-white
          ">
          <h1 className="font-['Poppins'] text-2xl sm:text-3xl font-bold text-[#2A3B63] text-center">
            FindIt Lanka
          </h1>
          <p className="text-[#29292D] text-xs sm:text-sm mt-2 text-center">
            Helping Find What's Lost
          </p>
        </div>
      </div>

      {/* ── Right side / Form panel ── */}
      <div className="
          w-full lg:w-[42%]
          bg-gradient-to-b from-white to-blue-100
          flex items-start lg:items-center justify-center
          px-3 sm:px-6 md:px-10 lg:px-8
          overflow-y-auto lg:overflow-hidden
          lg:h-full
        ">

        <div className="
            w-full
            max-w-[340px] sm:max-w-md lg:max-w-md
            flex flex-col
            py-4 sm:py-6 lg:py-2
          ">

          {/* ── Icon ── */}
          <div className="flex justify-center mb-2">
            <div className="
                w-11 h-11 sm:w-13 sm:h-13 lg:w-12 lg:h-12
                shrink-0
                bg-blue-600 rounded-xl
                flex items-center justify-center
              ">
              <FaUserPlus className="text-white text-lg sm:text-xl lg:text-2xl" />
            </div>
          </div>

          {/* ── Heading ── */}
          <div className="text-center mb-3">
            <h2 className="
                font-bold text-[#2A3B63] font-['Poppins']
                text-xl sm:text-2xl lg:text-2xl
              ">
              Create Your Account
            </h2>
            <p className="text-[#64748B] text-xs sm:text-sm mt-1 leading-snug">
              Become part of Sri Lanka's largest lost & found network
            </p>
          </div>

          {/* ── Form fields ── */}
          <div className="flex flex-col gap-2 sm:gap-2.5">

            {/* Full Name */}
            <div>
              <label className="text-[#64748B] text-xs font-medium">Full Name</label>
              <div className="relative mt-1">
                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] text-sm pointer-events-none" />
                <input
                  type="text"
                  placeholder="e.g. Kasun Perera"
                  style={{ paddingLeft: "36px" }}
                  className="
                    w-full h-10 sm:h-11 lg:h-10
                    border border-gray-200 rounded-xl
                    text-sm text-[#29292D] bg-white
                    focus:outline-none focus:ring-2 focus:ring-[#2F6BFF]
                    transition-all duration-300 hover:shadow-md
                  "
                />
              </div>
            </div>

            {/* District Dropdown */}
            <div>
              <label className="text-[#64748B] text-xs font-medium">District</label>
              <div className="relative mt-1">
                <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] z-10 pointer-events-none" />

                <button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  className="
                    relative w-full h-10 sm:h-11 lg:h-10
                    border border-gray-200 rounded-xl pr-4
                    flex items-center justify-end bg-white
                    focus:outline-none focus:ring-2 focus:ring-[#2F6BFF]
                    transition-all duration-300 hover:shadow-md
                  "
                >
                  <span
                    className={`
                      absolute left-10 top-1/2 -translate-y-1/2
                      text-sm truncate
                      max-w-[calc(100%-2.5rem)]
                      ${selectedDistrict === "Select your district"
                        ? "text-[#6B7280]"
                        : "text-[#29292D]"
                      }
                    `}
                  >
                    {selectedDistrict}
                  </span>

                  <FaChevronDown
                    className={`shrink-0 text-[#64748B] transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="
                      absolute top-full left-0 right-0 mt-1
                      bg-blue-100/70 backdrop-blur-md
                      rounded-xl shadow-lg
                      max-h-48 sm:max-h-60
                      overflow-y-auto z-50
                    ">
                    {districts.map((district) => (
                      <div
                        key={district}
                        onClick={() => {
                          setSelectedDistrict(district);
                          setIsOpen(false);
                        }}
                        className="
                          px-10 py-2.5 sm:py-3
                          text-sm text-[#29292D]
                          cursor-pointer
                          hover:bg-blue-200/70
                          transition-colors duration-200
                        "
                      >
                        {district}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="text-[#64748B] text-xs font-medium">Phone Number</label>
              <div className="relative mt-1">
                <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] text-sm pointer-events-none" />
                <input
                  type="text"
                  placeholder="+94 7X XXX XXXX"
                  style={{ paddingLeft: "36px" }}
                  className="
                    w-full h-10 sm:h-11 lg:h-10
                    border border-gray-200 rounded-xl
                    text-sm text-[#29292D] bg-white
                    focus:outline-none focus:ring-2 focus:ring-[#2F6BFF]
                    transition-all duration-300 hover:shadow-md
                  "
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-[#64748B] text-xs font-medium">E-Mail</label>
              <div className="relative mt-1">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] text-sm pointer-events-none" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  style={{ paddingLeft: "36px" }}
                  className="
                    w-full h-10 sm:h-11 lg:h-10
                    border border-gray-200 rounded-xl
                    text-sm text-[#29292D] bg-white
                    focus:outline-none focus:ring-2 focus:ring-[#2F6BFF]
                    transition-all duration-300 hover:shadow-md
                  "
                />
              </div>
            </div>

            {/* Password row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {/* Password */}
              <div>
                <label className="text-[#64748B] text-xs font-medium">Password</label>
                <div className="relative mt-1">
                  <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] text-sm pointer-events-none" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    style={{ paddingLeft: "36px" }}
                    className="
                      w-full h-10 sm:h-11 lg:h-10
                      border border-gray-200 rounded-xl
                      text-sm text-[#29292D] bg-white
                      focus:outline-none focus:ring-2 focus:ring-[#2F6BFF]
                      transition-all duration-300 hover:shadow-md
                    "
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] text-sm"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-[#64748B] text-xs font-medium">Confirm Password</label>
                <div className="relative mt-1">
                  <VscWorkspaceTrusted className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] text-sm pointer-events-none" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    style={{ paddingLeft: "36px" }}
                    className="
                      w-full h-10 sm:h-11 lg:h-10
                      border border-gray-200 rounded-xl
                      text-sm text-[#29292D] bg-white
                      focus:outline-none focus:ring-2 focus:ring-[#2F6BFF]
                      transition-all duration-300 hover:shadow-md
                    "
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] text-sm"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
            </div>

            {/* Social divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-[#64748B] text-[10px] sm:text-[11px] tracking-wide whitespace-nowrap">
                OR REGISTER WITH
              </span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* Social buttons */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <button
                type="button"
                className="
                  border border-gray-200
                  h-10 sm:h-11 lg:h-10
                  rounded-xl flex items-center justify-center gap-2
                  bg-white hover:bg-gray-50
                  transition duration-300 hover:shadow-md
                "
              >
                <img src={googleIcon} alt="Google" className="w-5 h-5 shrink-0" />
                <span className="text-xs sm:text-sm">Google</span>
              </button>
              <button
                type="button"
                className="
                  border border-gray-200
                  h-10 sm:h-11 lg:h-10
                  rounded-xl flex items-center justify-center gap-2
                  bg-white hover:bg-gray-50
                  transition duration-300 hover:shadow-md
                "
              >
                <img src={facebookIcon} alt="Facebook" className="w-5 h-5 shrink-0" />
                <span className="text-xs sm:text-sm">Facebook</span>
              </button>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <input type="checkbox" className="w-4 h-4 mt-0.5 shrink-0 cursor-pointer" />
              <p className="text-[#64748B] text-xs leading-5 break-words">
                I agree to FindIt Lanka's{" "}
                <span className="text-[#2563EB] font-medium cursor-pointer hover:underline">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-[#2563EB] font-medium cursor-pointer hover:underline">
                  Privacy Policy
                </span>
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="
                w-full h-10 sm:h-11 lg:h-10
                bg-[#2F6BFF] text-white rounded-xl
                text-sm font-semibold
                hover:bg-[#1D4ED8]
                transition duration-300 hover:shadow-lg
                flex items-center justify-center gap-2
              "
            >
              Create Account
              <FaArrowRight />
            </button>

            {/* Footer links */}
            <div className="flex flex-col items-center gap-1 pb-6 sm:pb-8 lg:pb-0">
              <p className="text-[#64748B] text-xs">
                Already have an account?{" "}
                <Link to="/login" className="text-[#2563EB] font-medium hover:underline">
                  Log in
                </Link>
              </p>
              <div className="flex items-center gap-1 text-[#64748B] text-xs">
                <VscWorkspaceTrusted className="text-[#040504] shrink-0" />
                <span>Verified Community Trusted</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;