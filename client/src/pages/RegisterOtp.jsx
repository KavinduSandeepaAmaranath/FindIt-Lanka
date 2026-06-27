import React, { useState, useRef, useEffect, useCallback } from "react";
import { HiOutlineMail, HiLockClosed } from "react-icons/hi";
import { FiShield, FiRefreshCw, FiArrowLeft } from "react-icons/fi";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 45;

export default function RegisterOtp({ email = "example@gmail.com" }){
     const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
     const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
     const [isVerifying, setIsVerifying] = useState(false);
     const [isResending, setIsResending] = useState(false);
     const [error, setError] = useState("");

     const inputRefs = useRef([]);
     
    


}