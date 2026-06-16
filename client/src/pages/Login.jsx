import React, { useState } from "react";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
} from "react-icons/fa";

import logo from "../assets/images/Loginlogo.png";
import Loginimage from "../assets/images/Loginimage.png";
import googleIcon from "../assets/icons/google.png";
import facebookIcon from "../assets/icons/facebook.png";
import LoginBgImage from "../assets/images/LoginBgImage.png";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-white via-blue-100 to-blue-300">
      {/*Left side */}
      <div className="w-1/2 relative flex items-center justify-center p-10 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-110 blur-sm"
          style={{ backgroundImage: `url(${LoginBgImage})` }}
        ></div>

        <div className="relative bg-gradient-to-b from-white via-blue-100 to-blue-300 backdrop-blur-md shadow-xl rounded-3xl p-12 text-center w-[90%] max-w-xl min-h-[850px] flex flex-col justify-center">
          <div className="flex justify-center mb-6 overflow-hidden">
            <img
              src={Loginimage}
              alt="Login"
              className="w-90 mx-auto mb-8 opacity-100 drop-shadow-sm mix-blend-multiply"
            />
          </div>

          <div className="flex flex-col gap-6 items-center">
            <h1
              className="text-[48px] font-bold text-[#2A3B63] leading-tight"
              style={{ fontFamily: "Poppins" }}
            >
              FindIt Lanka
            </h1>

            <p
              className="mt-6 text-[20px] font-medium text-[#2563EB]"
              style={{ fontFamily: "Poppins" }}
            >
              Find Yours
            </p>

            <h3
              className="text-[28px] font-semibold text-[#2A3B63] mt-10"
              style={{ fontFamily: "Poppins" }}
            >
              Lost and Found Simplified
            </h3>

            <p className="text-[#64748B] text-[16px] mt-5 leading-[1.6]">
              Join our community of over 50,000 users helping each other and
              recover what matters most.
            </p>
          </div>
        </div>
      </div>

      {/* Right side*/}
      <div className="  w-1/2 relative flex items-center justify-center px-6 bg-[#EAF1FB] min-h-screen flex bg-gradient-to-b from-white via-blue- to-blue-200">
        <div className="relative z-10 w-full max-w-xl h-[700px] bg-gradient-to-br from-white/85 via-blue-100/70 to-blue-200/70 backdrop-blur-md shadow-xl rounded-3xl px-6 py-6 flex flex-col items-center justify-center transition duration-300 hover:scale-[1.02] hover:shadow-2xl">
          <div className="w-full max-w-md flex flex-col gap-8">
            <div className="flex justify-center mb-8">
              <div className="bg-white shadow-lg rounded-2xl p-4">
                <img src={logo} alt="logo" className="w-20" />
              </div>
            </div>

            <div className="text-center mb-8">
              <h2
                className="text-[36px] font-bold text-[#2A3B63]"
                style={{ fontFamily: "Poppins" }}
              >
                Welcome Back
              </h2>

              <p className="text-[#64748B] text-[16px] mt-2">
                Sign in to your account to continue
              </p>
            </div>

            <form>
              <div className="flex flex-col gap-6">
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
                      className="w-full h-10 pl-12 pr-4 border rounded-xl text-[16px] text-[#29292D] focus:outline-none focus:ring-2 focus:ring-[#2F6BFF]"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between">
                    <label className="text-[#64748B] text-[14px] font-medium">
                      Password
                    </label>

                    <a
                      href="#"
                      className="text-[#2563EB] text-[14px] font-medium hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>

                  <div className="relative mt-2">
                    <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />

                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="•••••••••••••"
                      style={{ paddingLeft: "40px" }}
                      className="w-full h-10 pl-20 pr-12 border rounded-xl text-[16px] text-[#29292D] focus:outline-none focus:ring-2 focus:ring-[#2F6BFF]"
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

                <div className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-[#64748B] text-[14px]">
                    Remember me
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full h-10 bg-[#2F6BFF] text-white py-4 rounded-xl text-[16px] font-semibold hover:bg-[#1D4ED8] transition flex items-center justify-center gap-2"
                >
                  Login In
                  <FaArrowRight />
                </button>

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-gray-200"></div>
                  <span className="text-[#64748B] text-[12px]">
                    OR CONTINUE WITH
                  </span>
                  <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button className="border h-10 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition">
                    <img src={googleIcon} alt="Google" className="w-6 h-6" />
                    <span className="text-[17px]">Google</span>
                  </button>

                  <button className="border h-10 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition">
                    <img
                      src={facebookIcon}
                      alt="facebook"
                      className="w-6 h-6"
                    />

                    <span className="text-[17px]">Facebook</span>
                  </button>
                </div>

                <p className="text-center text-[#64748B] text-[14px]">
                  Don't have an account?{" "}
                  <span className="text-[#2563EB] font-medium cursor-pointer hover:underline">
                    Sign Up
                  </span>
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
