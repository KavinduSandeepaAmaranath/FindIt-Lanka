import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMail, FiArrowLeft } from "react-icons/fi";
import { HiOutlinePaperAirplane } from "react-icons/hi2";
import { HiOutlineShieldCheck } from "react-icons/hi2";
import backgroundImage from "../assets/images/OtpBg.png";
import forgotPasswordIcon from "../assets/images/Forgot_pwdLogo.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (value) => {
    if (!value.trim()) {
      return "Email address is required.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value.trim())) {
      return "Please enter a valid email address.";
    }

    return "";
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateEmail(email);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      // Simulated request delay
      await new Promise((resolve) => setTimeout(resolve, 1200));

      setIsSubmitted(true);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 overflow-y-auto flex items-center justify-center px-4 py-6 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-2xl px-6 pt-5 pb-6 sm:px-8 sm:pt-5 sm:pb-7">
        {/* TOP ICON */}
        <div className="flex justify-center">
          <img
            src={forgotPasswordIcon}
            alt="Forgot Password"
            className="w-24 h-24 sm:w-20 sm:h-20 object-contain mb-3"
          />
        </div>

        {/* HEADING  */}
        <h1 className="font-poppins font-bold text-[28px] sm:text-[36px] leading-[1.2] text-center text-[#2A3B63] mb-4">
          Forgot Password?
        </h1>

        <p className="font-inter text-[12px] sm:text-base leading-[1.6] text-center text-[#29292D] mb-8 px-2">
          No worries! Enter your email address and
          <br className="hidden sm:block" /> we&apos;ll send you a OTP to reset your password
        </p>

        {/* FORM */}
        <div className="space-y-3.5">
          <div>
            <label
              htmlFor="email"
              className="block font-inter font-medium text-sm text-[#29292D] mb-2"
            >
              Email Address
            </label>

            <div
              className={`flex items-center gap-3 w-full rounded-xl border ${
                error ? "border-red-400" : "border-gray-300"
              } px-4 py-3.5 focus-within:border-[#2F6BFF] focus-within:ring-2 focus-within:ring-[#2F6BFF]/20 transition-colors bg-white`}
            >
              <FiMail className="text-gray-400 text-xl shrink-0" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email address"
                disabled={isSubmitted}
                className="w-full font-inter text-[16px] text-[#29292D] placeholder-gray-400 outline-none bg-transparent disabled:opacity-60"
              />
            </div>

            {error && (
              <p className="mt-2 text-sm text-red-500 font-inter">{error}</p>
            )}

            {isSubmitted && (
              <p className="mt-2 text-sm text-green-600 font-inter">
                An OTP has been sent to your email address.
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting || isSubmitted}
            className="w-full flex items-center justify-center gap-2 bg-[#2F6BFF] hover:bg-[#1D4ED8] disabled:opacity-60 disabled:cursor-not-allowed text-white font-poppins font-semibold text-base rounded-xl py-3.5 transition-colors duration-200 shadow-md shadow-blue-500/20"
          >
            {isSubmitting ? (
              <>
                <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Sending...
              </>
            ) : isSubmitted ? (
              "Reset Code Sent"
            ) : (
              <>
                <HiOutlinePaperAirplane className="text-lg -rotate-45" />
                Send Reset Code
              </>
            )}
          </button>

          {/*  DIVIDER */}
          <div className="flex items-center gap-4">
            <span className="flex-1 h-px bg-gray-200" />
            <span className="font-inter text-sm text-[#64748B]">or</span>
            <span className="flex-1 h-px bg-gray-200" />
          </div>

          {/* BACK TO LOGIN  */}
          <div className="flex justify-center">
            <Link
              to="/login"
              className="flex items-center gap-2 font-inter font-semibold text-[15px] text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
            >
              <FiArrowLeft className="text-lg" />
              Back to Login
            </Link>
          </div>

          {/* SECURITY NOTE  */}
          <div className="flex items-start gap-3 bg-[#EAF1FF] rounded-xl px-4 py-3">
            <HiOutlineShieldCheck className="text-[#2563EB] text-xl shrink-0 mt-0.5" />
            <p className="font-inter text-sm leading-[1.6] text-[#2563EB]">
              For your security, we will only send reset OTP Code to your
              registered email.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;