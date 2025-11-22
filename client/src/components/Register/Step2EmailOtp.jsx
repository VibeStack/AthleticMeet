import React, { useRef, useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import axios from "axios";

export default function Step2EmailOtp({ nextStep, prevStep }) {
  const { register, setValue, handleSubmit, getValues } = useFormContext();
  const otpRefs = useRef([]);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  const handleKeyDown = (e, index) => {
    const key = e.key;

    // Allow navigation keys
    if (["Tab", "ArrowLeft", "ArrowRight"].includes(key)) return;

    // DIGIT typed
    if (/^[0-9]$/.test(key)) {
      e.preventDefault();

      // Replace existing or fill empty
      setValue(`otp${index}`, key);
      otpRefs.current[index].value = key;

      // Move forward
      if (index < 5) {
        otpRefs.current[index + 1].focus();
        otpRefs.current[index + 1].select?.();
      }
      return;
    }

    // BACKSPACE behavior
    if (key === "Backspace") {
      e.preventDefault();
      const current = otpRefs.current[index].value;

      if (current) {
        // If box has value → delete but stay here
        setValue(`otp${index}`, "");
        otpRefs.current[index].value = "";
        return;
      }

      // If empty → move backward and clear previous
      if (index > 0) {
        setValue(`otp${index - 1}`, "");
        otpRefs.current[index - 1].value = "";
        otpRefs.current[index - 1].focus();
      }
    }
  };

  const handleChange = (e, index) => {
    let value = e.target.value.replace(/\D/g, "").slice(-1);

    setValue(`otp${index}`, value);
    otpRefs.current[index].value = value;

    if (value && index < 5) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").replace(/\D/g, "");
    const digits = paste.slice(0, 6).split("");

    digits.forEach((d, i) => {
      setValue(`otp${i}`, d);
      otpRefs.current[i].value = d;
    });

    if (digits.length < 6) otpRefs.current[digits.length]?.focus();
    else otpRefs.current[5]?.focus(); // optional auto-submit
  };

  /* ------------------------ AUTO COUNTDOWN ------------------------ */
  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => setResendTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  /* ------------------------ SEND OTP ------------------------ */
  const sendOtp = async (isResend = false) => {
    try {
      if (resendTimer > 0) {
        const email = getValues("email");
        if (!email) return alert("Please enter your email first.");

        setLoading(true);
        setMessage(isResend ? "Resending OTP..." : "Sending OTP...");

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/otp/registerOtpSender`,
          { email }
        );

        setMessage(
          isResend
            ? "A new OTP has been sent to your email."
            : "OTP sent successfully to your email."
        );
      } else {
        setMessage(`⏳ You can resend OTP after 2 minutes.`);
      }
    } catch (error) {
      setMessage("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
      setMessage("");
    }
  };

  /* ------------------------ VERIFY OTP ------------------------ */
  const onSubmit = async (data) => {
    const email = getValues("email");
    const otp = Array.from({ length: 6 }, (_, i) => data[`otp${i}`]).join("");

    if (otp.length !== 6) return alert("Please enter all 6 digits of the OTP.");

    try {
      setLoading(true);
      setMessage("Verifying OTP...");
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/otp/registerOtpVerifier`,
        { email, otp }
      );

      setMessage("✅ OTP verified successfully!");
      nextStep();
    } catch (error) {
      setMessage("❌ Invalid or expired OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow-lg rounded-xl w-full max-w-md p-8 mx-auto border border-gray-100 transition-all duration-300 hover:shadow-xl"
    >
      {/* Header */}
      <div className="text-center mb-4">
        <img
          src="/images/gne_logo.png"
          alt="College Logo"
          className="h-16 w-16 mx-auto mb-3"
        />
        <h2 className="text-[16px] md:text-xl font-bold text-gray-800">
          Guru Nanak Dev Engineering College
        </h2>
        <p className="text-[12px] md:text-sm text-gray-600">
          Athletic Meet Registration Portal
        </p>
      </div>

      {/* Title */}
      <h3 className="text-[16px] sm:text-xl font-extrabold text-center mb-6 bg-linear-to-r from-blue-500 via-blue-600 to-blue-700 bg-clip-text text-transparent tracking-wide">
        Email Verification
      </h3>

      {/* OTP Boxes */}
      <div className="flex justify-center gap-3 mb-8 relative">
        {Array.from({ length: 6 }).map((_, i) => (
          <input
            key={i}
            maxLength={1}
            inputMode="numeric"
            pattern="[0-9]*"
            {...register(`otp${i}`)}
            ref={(el) => (otpRefs.current[i] = el)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            onChange={(e) => handleChange(e, i)}
            onPaste={handlePaste}
            className="aspect-5/6 w-10 md:w-12 text-center border border-gray-300 rounded-lg text-lg
        focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm font-bold"
          />
        ))}

        {/* Message */}
        {message && (
          <p
            className={`text-center text-sm absolute -bottom-8 ${
              message.includes("success") || message.includes("✅")
                ? "text-green-600"
                : message.includes("Verifying")
                ? "text-blue-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-center items-center mt-12">
        <button
          type="submit"
          className="w-full px-6 py-4 bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </div>
    </form>
  );
}
