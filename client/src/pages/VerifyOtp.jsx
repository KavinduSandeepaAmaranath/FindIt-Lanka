import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { HiOutlinePaperAirplane, HiOutlineShieldCheck } from "react-icons/hi2";
import backgroundImage from "../assets/images/OtpBg.png";
import verifyOtpIcon from "../assets/images/VerifyOtpLogo2.png";
import {
  verifyResetOTP,
  resendResetOTP,
} from "../services/authService.js";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 120;
const RESEND_STORAGE_KEY = "forgotPasswordOtpResendExpiry";

const VerifyOTP = () => {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendTimer, setResendTimer] = useState(() => {
    const expiry = sessionStorage.getItem(
      RESEND_STORAGE_KEY
    );
      if (!expiry) {
        return 0;
      }

      const remaining = Math.ceil(
        (Number(expiry) - Date.now()) / 1000
      );

      return remaining > 0 ? remaining : 0;
    });

  const navigate = useNavigate();
  const location = useLocation();

  const registeredEmail = (
    location.state?.email ||
    sessionStorage.getItem("forgotPasswordEmail") ||
    ""
  ).trim();

    useEffect(() => {

      if (!registeredEmail) {
        navigate("/forgot-password", { replace: true });
      }
    }, [registeredEmail, navigate]);

  const inputRefs = useRef([]);

  //  RESEND COUNTDOWN
  useEffect(() => {
    if (resendTimer <= 0) {
      sessionStorage.removeItem(RESEND_STORAGE_KEY);
      return;
    }

    const interval = setInterval(() => {
      setResendTimer((prev) => 
        prev > 0 ? prev - 1 : 0
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [resendTimer]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // OTP INPUT HANDLERS
  const handleChange = (index, value) => {
    const digit = value.replace(/[^0-9]/g, "").slice(-1);

    const updatedOtp = [...otp];
    updatedOtp[index] = digit;
    setOtp(updatedOtp);

    if (error) setError("");

    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        const updatedOtp = [...otp];
        updatedOtp[index - 1] = "";
        setOtp(updatedOtp);
        inputRefs.current[index - 1]?.focus();
      } else {
        const updatedOtp = [...otp];
        updatedOtp[index] = "";
        setOtp(updatedOtp);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/[^0-9]/g, "")
      .slice(0, OTP_LENGTH);

    if (!pasted) return;

    const updatedOtp = Array(OTP_LENGTH).fill("");
    pasted.split("").forEach((char, i) => {
      updatedOtp[i] = char;
    });
    setOtp(updatedOtp);

    const nextIndex = Math.min(pasted.length, OTP_LENGTH - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  // VALIDATION LOGIC
  const validateOtp = () => {
    if (otp.some((digit) => digit === "")) {
      return "Please enter the complete 6-digit code.";
    }
    return "";
  };

  // SUBMIT HANDLERS 
  const handleVerify = async () => {
    const validationError = validateOtp();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setIsVerifying(true);
      setError("");

      const code = otp.join("");

      await verifyResetOTP(registeredEmail, code);

      sessionStorage.removeItem(RESEND_STORAGE_KEY);

      navigate("/new-password", {
        state: {
          email: registeredEmail,
        },
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Invalid or expired OTP."
      );
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      handleVerify();
  };

  const handleResend = async () => {
    if (resendTimer > 0 || isResending) return;

    try {
      setIsResending(true);
      setError("");

      await resendResetOTP(registeredEmail);

      const expiry = Date.now() + RESEND_SECONDS *1000;

      sessionStorage.setItem(
        RESEND_STORAGE_KEY,
        expiry.toString()
      );

      setOtp(Array(OTP_LENGTH).fill(""));
      setResendTimer(RESEND_SECONDS);

      inputRefs.current[0]?.focus();
    } catch (err) {
      setError(err.response?.data?.message || 
        "Could not resend OTP. Please try again."
      );
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div
      className="fixed inset-0 overflow-y-auto flex items-center justify-center px-4 py-6 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-full max-w-[410px] bg-white rounded-2xl shadow-2xl px-6 pt-2 pb-6 sm:px-8 sm:pt-2 sm:pb-7">

        {/* TOP ICON */}
        <div className="flex justify-center mb-1">
          <img
            src={verifyOtpIcon}
            alt="Verify OTP"
            className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
          />
        </div>

        {/* HEADING  */}
        <h1 className="font-poppins font-bold text-[22px] sm:text-[26px] leading-[1.2] text-center text-[#2A3B63] mb-2 px-4 sm:px-6">
          Verify OTP
        </h1>

        <p className="font-inter text-[13px] sm:text-[14px] leading-[1.6] text-center text-[#29292D] mb-4 px-6 sm:px-8">
          Enter the 6-digit verification code sent to your
          <br className="hidden sm:block" /> registered email address.
        </p>

        <p className="font-inter text-[13px] sm:text-[14px] text-center text-[#29292D] mb-4">
          Code sent to:{" "}
          <span className="text-[#2563EB] font-medium">{registeredEmail}</span>
        </p>

        <form onSubmit={handleSubmit}>
          {/* OTP INPUTS */}
          <div className="flex justify-center gap-2 sm:gap-2.5 mb-4" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                disabled={isVerifying}
                className={`w-11 h-12 sm:w-12 sm:h-13 text-center text-lg font-poppins font-semibold text-[#2A3B63] rounded-xl border ${
                  error ? "border-red-400" : "border-gray-300"
                } focus:border-[#2F6BFF] focus:ring-2 focus:ring-[#2F6BFF]/20 outline-none transition-colors disabled:opacity-60`}
              />
            ))}
          </div>

          {error && (
            <p className="text-center text-sm text-red-500 font-inter mb-3">
              {error}
            </p>
          )}

          {/* RESEND */}
          <div className="text-center mb-6">
            <p className="font-inter text-[14px] text-[#29292D]">
              Didn&apos;t receive the code?{" "}
              <button
                type="button"
                onClick={handleResend}
                disabled={resendTimer > 0 || isResending}
                className={`font-medium underline ${
                  resendTimer > 0 || isResending
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-[#2563EB] hover:text-[#1D4ED8]"
                }`}
              >
                {isResending ? "Resending..." : "Resend OTP"}
              </button>
            </p>
            {resendTimer > 0 && (
              <p className="font-inter text-[13px] text-[#64748B] mt-1">
                Resend available in {formatTime(resendTimer)}
              </p>
            )}
          </div>

          {/* VERIFY BUTTON  */}
          <button
            type="submit"
            disabled={isVerifying || otp.some((digit) => digit === "")}
            className="w-full flex items-center justify-center gap-2 bg-[#2F6BFF] hover:bg-[#1D4ED8] disabled:opacity-60 disabled:cursor-not-allowed text-white font-poppins font-semibold text-base rounded-xl py-2.5 transition-colors duration-200 shadow-md shadow-blue-500/20 mb-4"
          >
            {isVerifying ? (
              <>
                <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                <HiOutlinePaperAirplane className="text-lg -rotate-45" />
                Verify OTP
              </>
            )}
          </button>
        </form>

        {/* BACK TO EMAIL*/}
        <div className="flex justify-center mb-4">
          <Link
            to="/forgot-password"
            className="flex items-center gap-2 font-inter font-semibold text-[15px] text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
          >
            <FiArrowLeft className="text-lg" />
            Try another email
          </Link>
        </div>

        {/* SECURITY NOTE */}
        <div className="flex items-start gap-3 bg-[#EAF1FF] rounded-xl px-4 py-3">
          <HiOutlineShieldCheck className="text-[#2563EB] text-xl shrink-0 mt-0.5" />
          <p className="font-inter text-sm leading-[1.4] text-[#2563EB]">
            For your security, this OTP will expire in 2 minutes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;