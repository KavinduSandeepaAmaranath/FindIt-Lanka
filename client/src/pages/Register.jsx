import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";
import { VscWorkspaceTrusted } from "react-icons/vsc";

import googleIcon from "../assets/icons/google.png";
import facebookIcon from "../assets/icons/facebook.png";
import RegisterBgImage from "../assets/images/LoginRegBg.png";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const districts = [
    "Ampara",
    "Anuradhapura",
    "Badulla",
    "Batticaloa",
    "Colombo",
    "Galle",
    "Gampaha",
    "Hambantota",
    "Jaffna",
    "Kalutara",
    "Kandy",
    "Kegalle",
    "Kilinochchi",
    "Kurunegala",
    "Mannar",
    "Matale",
    "Matara",
    "Monaragala",
    "Mullaitivu",
    "Nuwara Eliya",
    "Polonnaruwa",
    "Puttalam",
    "Ratnapura",
    "Trincomalee",
    "Vavuniya",
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-cover bg-center bg-no-repeat relative">

      {/* Left side */}
      <div
        className="w-full lg:w-4/7 h-[60vh] sm:h-[70vh] lg:h-screen relative bg-cover bg-bottom lg:bg-center bg-no-repeat flex items-end justify-center"
        style={{
          backgroundImage: `url(${RegisterBgImage})`,
        }}
      >
        <div className="relative z-10 text-center pb-6 sm:pb-8 md:pb-10 px-4 sm:px-8">
          <h1 className="font-['Poppins'] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2A3B63]">
            FindIt Lanka
          </h1>

          <p className="font-['Poppins'] mt-4 sm:mt-6 text-lg sm:text-xl font-medium text-[#0f0f10]">
            Find Yours
          </p>

          <h3 className="font-['Poppins'] text-xl sm:text-2xl lg:text-3xl font-semibold text-[#2A3B63] mt-6 sm:mt-8">
            Lost and Found Simplified
          </h3>

          <p className="text-[#29292D] text-sm sm:text-base leading-6 sm:leading-7 mt-4 max-w-md mx-auto">
            Join our community of over 50,000 users helping each other recover
            what matters most.
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className="w-full lg:w-3/7 relative flex items-center justify-center px-5 sm:px-8 md:px-10 lg:px-6 py-8 bg-[#EAF1FB] min-h-screen bg-gradient-to-b from-white to-blue-200">

        <div className="relative z-10 w-full sm:w-[95%] md:w-[90%] lg:w-full max-w-2xl h-[1000px] bg-gradient-to-br from-white/85 via-blue-100/70 to-blue-200/70 backdrop-blur-md shadow-xl rounded-3xl px-10 py-10 flex flex-col justify-center transition duration-300">

          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center">
              <FaUserPlus className="text-black text-3xl" />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <h2
              className="text-[36px] font-bold text-[#2A3B63]"
              style={{ fontFamily: "Poppins" }}
            >
              Create Your Account
            </h2>

            <p className="text-[#64748B] text-[16px] mt-2">
              Become part of Sri Lanka's largest lost & found network
            </p>
          </div>

          <form className="w-full flex justify-center">
            <div className="flex flex-col gap-6 max-w-lg mx-auto w-full">

              {/* Full Name */}
              <div>
                <label className="text-[#64748B] text-[14px] font-medium">
                  Full Name
                </label>

                <div className="relative mt-2">
                  <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />

                  <input
                    type="text"
                    placeholder="e.g. Kasun Perera"
                    style={{ paddingLeft: "40px" }}
                    className="w-full h-12 border rounded-xl text-[16px] text-[#29292D] focus:outline-none focus:ring-2 focus:ring-[#2F6BFF] transition duration-300 hover:shadow-2xl hover:-translate-y-2"
                  />
                </div>
              </div>

              {/* District */}
              <div>
                <label className="text-[#64748B] text-[14px] font-medium">
                  District
                </label>

                <div className="relative mt-2">
                  <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />

                  <select
                    defaultValue=""
                    style={{ paddingLeft: "40px" }}
                    className="w-full h-12 border rounded-xl text-[16px] text-[#29292D] focus:outline-none focus:ring-2 focus:ring-[#2F6BFF] transition duration-300 hover:shadow-2xl hover:-translate-y-2"
                  >
                    <option value="" disabled>
                      Select your district
                    </option>

                    {districts.map((district, index) => (
                      <option key={index} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="text-[#64748B] text-[14px] font-medium">
                  Phone Number
                </label>

                <div className="relative mt-2">
                  <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />

                  <input
                    type="text"
                    placeholder="+94 7X XXX XXXX"
                    style={{ paddingLeft: "40px" }}
                    className="w-full h-12 border rounded-xl text-[16px] text-[#29292D] focus:outline-none focus:ring-2 focus:ring-[#2F6BFF] transition duration-300 hover:shadow-2xl hover:-translate-y-2"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-[#64748B] text-[14px] font-medium">
                  Email Address
                </label>

                <div className="relative mt-2">
                  <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />

                  <input
                    type="email"
                    placeholder="name@example.com"
                    style={{ paddingLeft: "40px" }}
                    className="w-full h-12 border rounded-xl text-[16px] text-[#29292D] focus:outline-none focus:ring-2 focus:ring-[#2F6BFF] transition duration-300 hover:shadow-2xl hover:-translate-y-2"
                  />
                </div>
              </div>

              {/* Password row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Password */}
                <div>
                  <label className="text-[#64748B] text-[14px] font-medium">
                    Password
                  </label>

                  <div className="relative mt-2">
                    <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />

                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      style={{ paddingLeft: "40px" }}
                      className="w-full h-12 border rounded-xl text-[16px] text-[#29292D] focus:outline-none focus:ring-2 focus:ring-[#2F6BFF] transition duration-300 hover:shadow-2xl hover:-translate-y-2"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B]"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="text-[#64748B] text-[14px] font-medium">
                    Confirm Password
                  </label>

                  <div className="relative mt-2">
                    <VscWorkspaceTrusted
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]"
                      style={{ strokeWidth: 1.2 }}
                    />

                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      style={{ paddingLeft: "40px" }}
                      className="w-full h-12 border rounded-xl text-[16px] text-[#29292D] focus:outline-none focus:ring-2 focus:ring-[#2F6BFF] transition duration-300 hover:shadow-2xl hover:-translate-y-2"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B]"
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-[#64748B] text-[12px]">
                  OR REGISTER WITH
                </span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="border h-12 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition duration-300 hover:shadow-2xl hover:-translate-y-2">
                  <img src={googleIcon} alt="Google" className="w-6 h-6" />
                  <span className="text-[14px] sm:text-[17px]">Google</span>
                </button>

                <button className="border h-12 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition duration-300 hover:shadow-2xl hover:-translate-y-2">
                  <img src={facebookIcon} alt="Facebook" className="w-6 h-6" />
                  <span className="text-[14px] sm:text-[17px]">Facebook</span>
                </button>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-2">
                <input type="checkbox" className="w-4 h-4 mt-1" />

                <p className="text-[#64748B] text-[14px] leading-[1.5]">
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

              {/* Register Button */}
              <button
                type="submit"
                className="w-full h-12 bg-[#2F6BFF] text-white py-4 rounded-xl text-[16px] font-semibold hover:bg-[#1D4ED8] transition duration-300 hover:shadow-2xl hover:-translate-y-2 flex items-center justify-center gap-2"
              >
                Create Account
                <FaArrowRight />
              </button>

              <div className="flex flex-col items-center gap-3">
                <p className="text-[#64748B] text-[14px] leading-none m-0">
                  Already have an account?{" "}
                  <Link 
                  to="/login" className="text-[#2563EB] font-medium cursor-pointer hover:underline">
                    Log In
                  </Link>
                </p>

                <div className="flex items-center justify-center gap-1 text-[#64748B] text-[13px] leading-none">
                  <VscWorkspaceTrusted className="text-[#040504] text-sm" />
                  Verified Community Trusted
                </div>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;