import { useState } from "react";
import { Link } from "react-router-dom";
import { FiLock, FiEye, FiEyeOff, FiCheck } from "react-icons/fi";
import { HiOutlineShieldCheck } from "react-icons/hi2";
import backgroundImage from "../assets/images/OtpBg.png";
import createnewpasswordIcon from "../assets/images/NewPasswordLogo.png";

const CreateNewPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // VALIDATION RULES
  const rules = {
    minLength: newPassword.length >= 8,
    hasUppercase: /[A-Z]/.test(newPassword),
    hasNumber: /[0-9]/.test(newPassword),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>_\-+=[\]/\\;'`~]/.test(newPassword),
  };

  const isPasswordValid = Object.values(rules).every(Boolean);
  const passwordsMatch =
    confirmPassword.length > 0 && newPassword === confirmPassword;

  // VALIDATION LOGIC
  const validate = () => {
    if (!newPassword || !confirmPassword) {
      return "Please fill in both password fields.";
    }
    if (!isPasswordValid) {
      return "Password does not meet all the requirements below.";
    }
    if (newPassword !== confirmPassword) {
      return "Passwords do not match.";
    }
    return "";
  };

  //  SUBMIT HANDLER 
  const handleSubmit = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      await new Promise((resolve) => setTimeout(resolve, 1200));

      setIsSuccess(true);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  //  CHECKLIST ITEM 
  const ChecklistItem = ({ met, label }) => (
    <div className="flex items-center gap-1.5">
      <FiCheck
        className={`text-sm shrink-0 ${
          met ? "text-green-500" : "text-gray-300"
        }`}
      />
      <span
        className={`font-inter text-[13px] ${
          met ? "text-[#111113]" : "text-gray-400"
        }`}
      >
        {label}
      </span>
    </div>
  );

  return (
    <div
      className="fixed inset-0 overflow-y-auto flex items-center justify-center px-4 py-6 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-2xl px-6 pt-0 pb-6 sm:px-8 sm:pt-0 sm:pb-7">
        {/* TOP ICON */}
        <div className="flex justify-center mb-0">
          <img
            src={createnewpasswordIcon}
            alt="Create New Password"
            className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
          />
        </div>

        {/* HEADING */}
        <h1 className="font-poppins font-bold text-[22px] sm:text-[30px] leading-[1.2] text-center text-[#2A3B63] mb-1.5 px-2 sm:px-4">
          Create New Password
        </h1>

        <p className="font-inter text-[13px] sm:text-[14px] leading-[1.5] text-center text-[#29292D] mb-4 px-6 sm:px-8">
          Your new password must be different
          <br className="hidden sm:block" /> from your previous password.
        </p>

        {/*  FORM */}
        <div className="space-y-3.5">
          {/* New Password */}
          <div>
            <label
              htmlFor="newPassword"
              className="block font-inter font-medium text-sm text-[#29292D] mb-1.5"
            >
              New Password
            </label>
            <div
              className={`flex items-center gap-3 w-full rounded-xl border ${
                error ? "border-red-400" : "border-gray-300"
              } px-4 py-2.5 focus-within:border-[#2F6BFF] focus-within:ring-2 focus-within:ring-[#2F6BFF]/20 transition-colors bg-white`}
            >
              <FiLock className="text-gray-400 text-lg shrink-0" />
              <input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  if (error) setError("");
                }}
                placeholder="Enter new password"
                disabled={isSuccess}
                className="w-full font-inter text-[15px] text-[#29292D] placeholder-gray-400 outline-none bg-transparent disabled:opacity-60"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="text-gray-400 hover:text-gray-600 shrink-0"
                tabIndex={-1}
              >
                {showNewPassword ? (
                  <FiEye className="text-lg" />
                ) : (
                  <FiEyeOff className="text-lg" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block font-inter font-medium text-sm text-[#29292D] mb-1.5"
            >
              Confirm Password
            </label>
            <div
              className={`flex items-center gap-3 w-full rounded-xl border ${
                error ? "border-red-400" : "border-gray-300"
              } px-4 py-2.5 focus-within:border-[#2F6BFF] focus-within:ring-2 focus-within:ring-[#2F6BFF]/20 transition-colors bg-white`}
            >
              <HiOutlineShieldCheck className="text-gray-400 text-lg shrink-0" />
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (error) setError("");
                }}
                placeholder="Confirm new password"
                disabled={isSuccess}
                className="w-full font-inter text-[15px] text-[#29292D] placeholder-gray-400 outline-none bg-transparent disabled:opacity-60"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="text-gray-400 hover:text-gray-600 shrink-0"
                tabIndex={-1}
              >
                {showConfirmPassword ? (
                  <FiEye className="text-lg" />
                ) : (
                  <FiEyeOff className="text-lg" />
                )}
              </button>
            </div>
            {confirmPassword.length > 0 && !passwordsMatch && (
              <p className="mt-1.5 text-xs text-red-500 font-inter">
                Passwords do not match.
              </p>
            )}
          </div>

          {/* REQUIREMENTS CHECKLIST  */}
          <div className="grid grid-cols-2 gap-y-1.5 gap-x-3 py-1">
            <ChecklistItem met={rules.minLength} label="At least 8 characters" />
            <ChecklistItem met={rules.hasNumber} label="One number" />
            <ChecklistItem met={rules.hasUppercase} label="One uppercase letter" />
            <ChecklistItem met={rules.hasSpecialChar} label="One special character" />
          </div>

          {error && (
            <p className="text-sm text-red-500 font-inter text-center">
              {error}
            </p>
          )}

          {isSuccess && (
            <p className="text-sm text-green-600 font-inter text-center">
              Password updated successfully!
            </p>
          )}

          {/*  SUBMIT BUTTON */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting || isSuccess}
            className="w-full flex items-center justify-center gap-2 bg-[#2F6BFF] hover:bg-[#1D4ED8] disabled:opacity-60 disabled:cursor-not-allowed text-white font-poppins font-semibold text-base rounded-xl py-2.5 transition-colors duration-200 shadow-md shadow-blue-500/20"
          >
            {isSubmitting ? (
              <>
                <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Updating...
              </>
            ) : isSuccess ? (
              "Password Updated"
            ) : (
              <>
                <HiOutlineShieldCheck className="text-lg" />
                Update Password
              </>
            )}
          </button>

          {/* BACK TO LOGIN */}
          <div className="flex justify-center">
            <Link
              to="/login"
              className="font-inter font-semibold text-[15px] text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
            >
              ← Back to Login
            </Link>
          </div>

          {/* SECURITY NOTE */}
          <div className="flex items-start gap-3 bg-[#EAF1FF] rounded-xl px-4 py-3">
            <HiOutlineShieldCheck className="text-[#2563EB] text-xl shrink-0 mt-0.5" />
            <p className="font-inter text-sm leading-[1.6] text-[#2563EB]">
              Use a strong password to keep your account secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNewPassword;