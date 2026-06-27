import  { useState } from "react";
import { Link } from "react-router-dom";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
} from "react-icons/fa";

import logo from "../assets/images/Loginlogo.png";
import googleIcon from "../assets/icons/google.png";
import facebookIcon from "../assets/icons/facebook.png";
import LoginBgImage from "../assets/images/LoginRegBg.png";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side */}
      <div
        className="w-full lg:w-4/7 min-h-[60vh] sm:min-h-[70vh] lg:min-h-screen relative bg-cover bg-center bg-no-repeat flex items-end justify-center"
        style={{
          backgroundImage: `url(${LoginBgImage})`,
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
      <div className="w-full lg:w-3/7 flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 md:py-10 bg-gradient-to-b from-white to-blue-200 min-h-screen">
  
  <div className="
    relative z-10
    w-[92%] sm:w-[85%] md:w-[75%] lg:w-full
    max-w-md sm:max-w-lg lg:max-w-xl
    min-h-[580px] sm:min-h-[620px] md:min-h-[680px] lg:min-h-[700px]
    bg-gradient-to-br from-white/85 via-blue-100/70 to-blue-200/70
    backdrop-blur-md shadow-xl rounded-3xl
    px-4 sm:px-6 md:px-8
    py-6 sm:py-8
    flex flex-col items-center justify-center
    
  ">
          <div className="w-full max-w-md flex flex-col gap-7 sm:gap-6">
            {/* Logo */}
            <div className="flex justify-center">
              <div className="bg-white shadow-lg rounded-2xl p-4">
                <img src={logo} alt="logo" className="w-16 sm:w-20" />
              </div>
            </div>

            {/* Heading */}
            <div className="text-center">
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2A3B63]"
                style={{ fontFamily: "Poppins" }}
              >
                Welcome Back
              </h2>

              <p className="text-[#64748B] text-sm sm:text-base mt-2">
                Sign in to your account to continue
              </p>
            </div>

            <form>
              <div className="flex flex-col gap-6">
                {/* Email */}
                <div>
                  <label className="text-[#64748B] text-sm font-medium">
                    Email Address
                  </label>

                  <div className="relative mt-2">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]" />

                    <input
                      type="email"
                      placeholder="name@example.com"
                      style={{ paddingLeft: "48px" }}
                      className="w-[90%] sm:w-full h-12 pl-12 pr-4 border rounded-xl text-sm sm:text-base text-[#2d2929] focus:outline-none focus:ring-2 focus:ring-[#2F6BFF] transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex justify-between">
                    <label className="text-[#64748B] text-sm font-medium">
                      Password
                    </label>

                    <a
                      href="#"
                      className="text-[#2563EB] text-sm font-medium hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>

                  <div className="relative mt-2">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]" />

                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="•••••••••••••"
                      style={{ paddingLeft: "48px" }}
                      className="w-full h-12 pl-12 pr-12 border rounded-xl text-sm sm:text-base text-[#29292D] focus:outline-none focus:ring-2 focus:ring-[#2F6BFF] transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
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

                {/* Remember me */}
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-[#64748B] text-sm">Remember me</span>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="w-full h-12 bg-[#2F6BFF] text-white rounded-xl text-sm sm:text-base font-semibold hover:bg-[#1D4ED8] transition duration-300 hover:shadow-xl flex items-center justify-center gap-2 hover:-translate-y-2"
                >
                  Log In
                  <FaArrowRight />
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-gray-200"></div>
                  <span className="text-[#64748B] text-[11px] sm:text-xs">
                    OR CONTINUE WITH
                  </span>
                  <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                {/* Social Buttons */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <button className="border h-12 rounded-xl flex items-center justify-center gap-2 sm:gap-3 hover:bg-gray-50 transition duration-300 hover:shadow-lg hover:-translate-y-2">
                    <img
                      src={googleIcon}
                      alt="Google"
                      className="w-5 h-5 sm:w-6 sm:h-6"
                    />
                    <span className="text-sm sm:text-base">Google</span>
                  </button>

                  <button className="border h-12 rounded-xl flex items-center justify-center gap-2 sm:gap-3 hover:bg-gray-50 transition duration-300 hover:shadow-lg hover:-translate-y-2">
                    <img
                      src={facebookIcon}
                      alt="facebook"
                      className="w-5 h-5 sm:w-6 sm:h-6"
                    />
                    <span className="text-sm sm:text-base">Facebook</span>
                  </button>
                </div>

                {/* Signup */}
                <p className="text-center text-[#64748B] text-sm">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-[#2563EB] font-medium cursor-pointer hover:underline"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
