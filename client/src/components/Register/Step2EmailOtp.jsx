import React, { useRef, useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import axios from "axios";

export default function Step2EmailOtp({ nextStep, prevStep }) {
  const { register, setValue, handleSubmit, getValues } = useFormContext();
  const otpRefs = useRef([]);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");
  const [resendTimer, setResendTimer] = useState(0); // seconds left for resend

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    setValue(`otp${index}`, value);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
    else if (!value && index > 0) otpRefs.current[index - 1]?.focus();
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
      const email = getValues("email");
      if (!email) return alert("Please enter your email first.");

      setLoading(true);
      setMessage(isResend ? "Resending OTP..." : "Sending OTP...");
      console.log(message)

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/otp/send`,
        { email }
      );

      setOtpSent(true);
      setResendTimer(30); // ⏳ 30 seconds cooldown
      setMessage(
        isResend
          ? "A new OTP has been sent to your email."
          : "OTP sent successfully to your email."
      );
      console.log("✅ OTP Sent:", response.data);
    } 
    catch (error) {
      console.error("❌ Error sending OTP:", error);
      setMessage("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
      setMessage("")
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
        `${import.meta.env.VITE_API_URL}/otp/verify`,
        { email, otp }
      );

      console.log("✅ OTP Verified:", response.data);
      setMessage("✅ OTP verified successfully!");
      nextStep();
    } catch (error) {
      console.error("❌ OTP verification failed:", error);
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
      <div className="flex justify-center gap-3 mb-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <input
            key={i}
            maxLength={1}
            {...register(`otp${i}`)}
            ref={(el) => (otpRefs.current[i] = el)}
            onChange={(e) => handleOtpChange(i, e.target.value)}
            className="aspect-5/6 w-10 md:w-12 text-center border border-gray-300 rounded-lg text-lg
              focus:outline-none focus:ring-2 focus:ring-blue-500 transition
              shadow-sm font-bold"
          />
        ))}
      </div>

      {/* Message */}
      {message && (
        <p
          className={`text-center text-sm mb-4 ${
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

      {/* Buttons */}
      <div className="flex justify-between items-center mt-6">
        <button
          type="button"
          onClick={prevStep}
          className="px-5 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-200 transition"
          disabled={loading}
        >
          Back
        </button>

        <button
          type="submit"
          className="px-6 py-2.5 bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </div>

      {/* Resend OTP Section */}
      <p className="text-sm text-gray-600 text-center mt-6">
        Didn't receive the OTP?{" "}
        <button
          type="button"
          className={`font-medium ${
            resendTimer > 0
              ? "text-gray-400 cursor-not-allowed"
              : "text-blue-600 hover:underline"
          }`}
          onClick={() => sendOtp(true)}
          disabled={resendTimer > 0 || loading}
        >
          {resendTimer > 0
            ? `Resend in ${resendTimer}s`
            : otpSent
            ? "Resend OTP"
            : "Send OTP"}
        </button>
      </p>
    </form>
  );
}
