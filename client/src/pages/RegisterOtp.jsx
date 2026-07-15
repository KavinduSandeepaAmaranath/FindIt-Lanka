import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { RiMailLockFill } from "react-icons/ri";
import { FaLock, FaRedo, FaShieldAlt } from "react-icons/fa";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import otpBackground from "../assets/images/OtpBg.png";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 90; // 01:30

const RegisterOTP = () => {
  
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "example@gmail.com";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");

  const inputRefs = useRef([]);

  // Countdown timer
  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timerId = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timerId);
  }, [secondsLeft]);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  // OTP input handlers
  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");

    if (!value) {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      return;
    }

    // Handles the case where a user types faster than one char at a time
    const digits = value.split("");
    const newOtp = [...otp];
    newOtp[index] = digits[0];
    setOtp(newOtp);

    if (index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (error) setError("");
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];

      if (otp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/[^0-9]/g, "")
      .slice(0, OTP_LENGTH);

    if (!pastedData) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((digit, i) => {
      newOtp[i] = digit;
    });
    setOtp(newOtp);

    const nextEmptyIndex =
      pastedData.length < OTP_LENGTH ? pastedData.length : OTP_LENGTH - 1;
    inputRefs.current[nextEmptyIndex]?.focus();
  };

  // Resend code
  const handleResend = () => {
    if (secondsLeft > 0) return;

    setOtp(["", "", "", "", "", ""]);
    setSecondsLeft(RESEND_SECONDS);
    setError("");
    inputRefs.current[0]?.focus();
  };

  // Verify code
  const isComplete = otp.every((digit) => digit !== "");

  const handleVerify = async () => {
    if (!isComplete) return;

    setIsVerifying(true);
    setError("");

    const code = otp.join("");

    try {
      // Dummy async behaviour to simulate a network request
      await new Promise((resolve) => setTimeout(resolve, 1200));

      console.log("Verifying OTP:", code, "for", email);

      // On success, redirect to login (or dashboard) after verification
      navigate("/login", { state: { verified: true } });
    } catch (err) {
      setError("Invalid or expired code. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleVerify();
  };

  return (
    <div
  className="fixed inset-0 overflow-y-auto flex [align-items:safe_center] justify-center bg-cover bg-center bg-no-repeat px-4 py-6 sm:px-6"
  style={{ backgroundImage: `url(${otpBackground})` }}
>
  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-[#1D4ED8]/10" />

  <div
    className="relative z-10 flex flex-col items-center gap-5 justify-center w-full max-w-md rounded-3xl border border-white/40 bg-white/90 px-8 py-8 shadow-2xl backdrop-blur-xl sm:px-10 sm:py-10"
    aria-labelledby="otp-heading"
  >
    {/* Top icon */}
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#2F6BFF]/10 sm:h-16 sm:w-16">
  <RiMailLockFill className="h-7 w-7 text-[#2F6BFF] sm:h-8 sm:w-8" aria-hidden="true" />
</div>

    {/* Heading */}
    <h1 id="otp-heading" className="text-center font-[Poppins,sans-serif] text-2xl font-bold leading-tight text-[#2A3B63] sm:text-3xl">
      Verify Your Account
    </h1>     
    
    {/* Description */}
    <div className="text-center">
      <p className="font-[Inter,sans-serif] text-base leading-relaxed text-[#29292D]">
        Enter the 6-digit verification code sent to
      </p>
      <p className="font-[Inter,sans-serif] text-base font-bold text-[#29292D] break-all">
        {email}
      </p>
    </div>


    {/* OTP Section */}
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex justify-center gap-3 sm:gap-4" onPaste={handlePaste}>
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            aria-label={`Digit ${index + 1} of verification code`}
            className="h-14 w-12 rounded-xl border border-gray-300 bg-white text-center text-2xl font-semibold text-[#29292D] shadow-sm outline-none transition focus:border-[#2F6BFF] focus:ring-2 focus:ring-[#2F6BFF]/40 sm:h-16 sm:w-14"
          />
        ))}
      </div>

      {error && (
        <p role="alert" className="mt-3 text-center text-sm font-medium text-red-500">
          {error}
        </p>
      )}

      <div className="mt-6">
        <button
          type="submit"
          disabled={!isComplete || isVerifying}
          className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-4 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:bg-[#1D4ED8] hover:shadow-xl disabled:cursor-not-allowed disabled:bg-blue-600 disabled:text-white disabled:opacity-70"
        >
          <FaLock className="h-4 w-4" aria-hidden="true" />
          {isVerifying ? "Verifying..." : "Verify Code"}
        </button>
      </div>
    </form>

    {/* Divider */}
    <div className="flex w-full items-center gap-4">
      <span className="h-px flex-1 bg-gray-200" />
      <span className="text-sm text-[#64748B]">or</span>
      <span className="h-px flex-1 bg-gray-200" />
    </div>

    {/* Resend Section */}
    <div className="text-center">
      <button
        type="button"
        onClick={handleResend}
        disabled={secondsLeft > 0}
        className="inline-flex items-center gap-2 text-base font-semibold text-[#2563EB] underline decoration-2 underline-offset-2 transition hover:text-[#1D4ED8] disabled:cursor-not-allowed disabled:text-[#94A3B8] disabled:no-underline"
      >
        <FaRedo className="h-3.5 w-3.5" aria-hidden="true" />
        Resend Code
      </button>

      <p className="mt-2 text-sm text-[#64748B]">
        {secondsLeft > 0 ? (
          <>
            You can resend the code in{" "}
            <span className="font-semibold text-[#2563EB]">{formatTime(secondsLeft)}</span>
          </>
        ) : (
          "You can resend the code now"
        )}
      </p>
    </div>

    {/* Security Notice */}
    <div className="flex items-center justify-center gap-3 rounded-xl bg-blue-100 max-w-md mx-auto min-h-[60px] px-5 py-4">
      <VscWorkspaceTrusted className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#2563EB]" aria-hidden="true" />
      <p className="text-sm leading-relaxed text-[#1D4ED8]">
        For your security, never share your verification code with anyone. The verification code will expire in 5 minutes.
      </p>
    </div>
  </div>
</div>
  );
};

export default RegisterOTP;
