import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
} from "react-icons/fa";
import { VscWorkspaceTrusted } from "react-icons/vsc";

import { login } from "../services/authService.js";

import googleIcon from "../assets/icons/google.png";
import facebookIcon from "../assets/icons/facebook.png";
import LoginBgImage from "../assets/images/LoginRegBackground.png";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      await login(email, password);

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="
        min-h-screen w-screen
        flex flex-col lg:flex-row
        overflow-x-hidden
        lg:h-screen lg:overflow-hidden lg:fixed lg:inset-0
        bg-gradient-to-b from-white to-blue-100
      ">

      {/* Left side  */}
      <div className="
          hidden lg:flex
          lg:w-[58%] xl:w-[58%]
          shrink-0
          h-full relative overflow-hidden
        ">
        <img
          src={LoginBgImage}
          alt="Login"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        <div className="relative z-10 flex flex-col items-center justify-end w-full pb-8 xl:pb-12">
          <h1 className="
              font-['Poppins'] font-bold text-[#2A3B63] text-center px-6
              text-2xl xl:text-3xl 2xl:text-4xl
            ">
            Your Items Matter to Us
          </h1>

          <p className="
              text-[#29292D] leading-6 text-center mt-3
              max-w-xs xl:max-w-sm
              text-xs xl:text-sm
            ">
            Connect with thousands of people helping each other find lost items.
            Sign in to your community of trusted helpers.
          </p>

          <p className="font-['Poppins'] text-xl xl:text-2xl font-bold text-[#2A3B63] mt-2">
            FindIt Lanka
          </p>
        </div>
      </div>

      {/*banner*/}
 
      <div className="
          lg:hidden
          w-full
          flex flex-col
          bg-white
        ">
        
        <img
          src={LoginBgImage}
          alt="Login"
          className="
            w-full
            h-auto
            object-cover
            max-h-64 sm:max-h-72 md:max-h-80
            display-block
          "
        />

        <div className="
            w-full
            flex flex-col items-center justify-center
            py-4 sm:py-5 md:py-6
            px-4
            bg-white
          ">
          <h1 className="
              font-['Poppins'] text-2xl sm:text-3xl
              font-bold text-[#2A3B63]
              text-center
            ">
            FindIt Lanka
          </h1>
          <p className="
              text-[#29292D] text-xs sm:text-sm
              mt-2 sm:mt-3
              text-center
            ">
            Welcome Back
          </p>
        </div>
      </div>

      {/*  Right side / Form panel  */}
      <div className="
          w-full lg:w-[42%]
          bg-transparent
          flex items-start lg:items-center justify-center
          px-3 sm:px-6 md:px-10 lg:px-8
          overflow-y-auto lg:overflow-hidden
          lg:h-full
          py-4 sm:py-6 md:py-8 lg:py-0
        ">

        <div className="
            w-full
            max-w-[340px] sm:max-w-md lg:max-w-md
            flex flex-col
            py-4 sm:py-6 lg:py-2
          ">

          {/*  Icon  */}
          <div className="flex justify-center mb-2">
            <div className="
                w-11 h-11 sm:w-13 sm:h-13 lg:w-12 lg:h-12
                shrink-0
                bg-blue-600 rounded-xl
                flex items-center justify-center
              ">
              <VscWorkspaceTrusted className="text-white text-lg sm:text-xl lg:text-2xl" />
            </div>
          </div>

          {/*  Heading  */}
          <div className="text-center mb-3">
            <h2 className="
                font-bold text-[#2A3B63] font-['Poppins']
                text-xl sm:text-2xl lg:text-2xl
              ">
              Welcome Back
            </h2>
            <p className="text-[#64748B] text-xs sm:text-sm mt-1 leading-snug">
              Sign in to your FindIt Lanka account
            </p>
          </div>

          {/*  Form fields  */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:gap-2.5">

            {/* Email */}
            <div>
              <label className="text-[#64748B] text-xs font-medium">Email Address</label>
              <div className="relative mt-1">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] text-sm pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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

            {/* Password */}
            <div>
              <div className="flex items-center justify-between">
                <label className="text-[#64748B] text-xs font-medium">Password</label>
                <a
                  href="#"
                  className="text-[#2563EB] text-xs font-medium hover:underline"
                >
                  Forgot?
                </a>
              </div>
              <div className="relative mt-1">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] text-sm pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{ paddingLeft: "36px" }}
                  className="
                    w-full h-10 sm:h-11 lg:h-10
                    border border-gray-200 rounded-xl
                    text-sm text-[#29292D] bg-white
                    focus:outline-none focus:ring-2 focus:ring-[#2F6BFF]
                    transition-all duration-300 hover:shadow-md
                    pr-10 sm:pr-12
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
              {error && (
                <p className="text-sm text-red-500 mt-2">
                  {error}
                </p>
              )}
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4 mt-0.5 shrink-0 cursor-pointer" />
              <span className="text-[#64748B] text-xs">Remember me</span>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full h-10 sm:h-11 lg:h-10
                bg-[#2F6BFF] text-white rounded-xl
                text-sm font-semibold
                hover:bg-[#1D4ED8]
                transition duration-300 hover:shadow-lg
                flex items-center justify-center gap-2
                disabled:opacity-70
                disabled:cursor-not-allowed
              "
            >
              {loading ? "Signing In..." : "Sign In"}
              <FaArrowRight />
            </button>

            {/* Social divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-[#64748B] text-[10px] sm:text-[11px] tracking-wide whitespace-nowrap">
                OR SIGN IN WITH
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

            {/* Signup Link */}
            <p className="text-center text-[#64748B] text-xs pb-6 sm:pb-8 lg:pb-0">
              Don't have an account?{" "}
              <Link to="/register" className="text-[#2563EB] font-medium hover:underline">
                Sign Up
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;