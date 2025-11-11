// components/Register/Step2EmailOtp.jsx
import React, { useRef } from "react";
import { useFormContext } from "react-hook-form";

export default function Step2EmailOtp({ nextStep, prevStep }) {
  const { register, setValue, handleSubmit } = useFormContext();
  const otpRefs = useRef([]);

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    setValue(`otp${index}`, value);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
    else if (!value && index > 0) otpRefs.current[index - 1]?.focus();
  };

  const onSubmit = (data) => {
    const otp = Array.from({ length: 6 }, (_, i) => data[`otp${i}`]).join("");
    if (otp.length === 6) {
      console.log("Email OTP Verified:", otp);
      nextStep();
    } else {
      alert("Please enter all 6 digits of the OTP.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow-lg rounded-xl w-full max-w-md p-8 mx-auto border border-gray-100 transition-all duration-300 hover:shadow-xl"
    >
      {/* Header (same as Step 1) */}
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

      {/* Form Title */}
      <h3 className="text-[16px] sm:text-xl font-extrabold text-center mb-6 bg-linear-to-r from-blue-500 via-blue-600 to-blue-700 bg-clip-text text-transparent tracking-wide">
        Email Verification
      </h3>

      {/* OTP Input Boxes */}
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

      {/* Buttons */}
      <div className="flex justify-between items-center mt-6">
        <button
          type="button"
          onClick={prevStep}
          className="px-5 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-200 transition"
        >
          Back
        </button>
        <button
          type="submit"
          className="px-6 py-2.5 bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
        >
          Verify OTP
        </button>
      </div>

      {/* Resend OTP link */}
      <p className="text-sm text-gray-600 text-center mt-6">
        Didn't receive the OTP?{" "}
        <button
          type="button"
          className="text-blue-600 hover:underline font-medium"
          onClick={() => alert("Resend OTP logic here")}
        >
          Resend
        </button>
      </p>
    </form>
  );
}
