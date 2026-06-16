import React, { useState } from "react";

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

import RegisterImage from "../assets/images/Loginimage.png";
import googleIcon from "../assets/icons/google.png";
import facebookIcon from "../assets/icons/facebook.png";
import RegisterBgImage from "../assets/images/LoginBgImage.png";

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
    <div className="min-h-screen flex bg-cover bg-center bg-no-repeat relative">
      {/* Left side */}
      <div className="w-1/2 relative flex items-center justify-center p-10 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-110 blur-sm"
          style={{ backgroundImage: `url(${RegisterBgImage})` }}
        ></div>

        <div className="relative bg-gradient-to-b from-white via-blue-100 to-blue-300 backdrop-blur-md shadow-xl rounded-3xl p-12 text-center w-[90%] max-w-xl min-h-[850px] flex flex-col justify-center">
          <div className="flex justify-center mb-6 overflow-hidden">
            <img
              src={RegisterImage}
              alt="Register"
              className="w-90 mx-auto mb-8 opacity-100 drop-shadow-sm mix-blend-multiply"
            />
          </div>

          <div className="flex flex-col gap-6 items-center">
            <div>
            <h1
              className="text-[48px] font-bold text-[#2A3B63]"
              style={{ fontFamily: "Poppins" }}
            >
              Helping Find
            </h1>

            <h1
              className="text-[48px] font-bold text-[#2A3B63] leading-tight"
              style={{ fontFamily: "Poppins" }}
            >
              What's Lost
            </h1>
            </div>

            <p className="text-[#29292D] text-[16px] mt-5 leading-[1.6] text-center mx-auto max-w-md">
              Join our community to help others and recover what matters most. A
              safer, more connected way to manage lost items.
            </p>

            <p
              className="mt-6 text-[36px] font-bold text-[#2563EB]"
              style={{ fontFamily: "Poppins" }}
            >
              FindIt Lanka
            </p>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="w-1/2 relative flex items-center justify-center px-6 bg-[#EAF1FB] min-h-screen bg-gradient-to-b from-white to-blue-200">

      <div className="relative z-10 w-full max-w-2xl h-[900px] bg-gradient-to-br from-white/85 via-blue-100/70 to-blue-200/70 backdrop-blur-md shadow-xl rounded-3xl px-10 py-10 flex flex-col justify-center transition duration-300 hover:scale-[1.02] hover:shadow-2xl">
        
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
            <div className="flex flex-col gap-6 max-w-lg mx-auto">

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
                    className="w-full h-10 border rounded-xl text-[16px] text-[#29292D] focus:outline-none focus:ring-2 focus:ring-[#2F6BFF]"
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
      className="w-full h-10 border rounded-xl text-[16px] text-[#29292D] focus:outline-none focus:ring-2 focus:ring-[#2F6BFF]"
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
                    className="w-full h-10 border rounded-xl text-[16px] text-[#29292D] focus:outline-none focus:ring-2 focus:ring-[#2F6BFF]"
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
                    className="w-full h-10 border rounded-xl text-[16px] text-[#29292D] focus:outline-none focus:ring-2 focus:ring-[#2F6BFF]"
                  />
                </div>
              </div>

              {/* Password row */}
              <div className="grid grid-cols-2 gap-4">
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
                      className="w-full h-10 border rounded-xl text-[16px] text-[#29292D] focus:outline-none focus:ring-2 focus:ring-[#2F6BFF]"
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
                      className="w-full h-10 border rounded-xl text-[16px] text-[#29292D] focus:outline-none focus:ring-2 focus:ring-[#2F6BFF]"
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
                <button className="border h-10 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition">
                  <img src={googleIcon} alt="Google" className="w-6 h-6" />
                  <span className="text-[17px]">Google</span>
                </button>

                <button className="border h-10 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition">
                  <img src={facebookIcon} alt="Facebook" className="w-6 h-6" />
                  <span className="text-[17px]">Facebook</span>
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
                className="w-full h-10 bg-[#2F6BFF] text-white py-4 rounded-xl text-[16px] font-semibold hover:bg-[#1D4ED8] transition flex items-center justify-center gap-2"
              >
                Create Account
                <FaArrowRight />
              </button>

              <div className="flex flex-col items-center gap-3">
                <p className="text-[#64748B] text-[14px] leading-none m-0">
                  Already have an account?{" "}
                  <span className="text-[#2563EB] font-medium cursor-pointer hover:underline">
                    Log In
                  </span>
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
