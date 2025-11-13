// components/Register/Step4Success.jsx
import React from "react";
import { CheckIcon } from "../Helpers/SvgCollection";

export default function Step4Success() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8 border border-gray-100 text-center animate-fade-in">
        {/* Success Icon */}
        <div className="flex justify-center mb-4">{CheckIcon}</div>

        {/* Title */}
        <h2 className="text-2xl font-extrabold bg-linear-to-r from-green-500 via-green-600 to-green-700 bg-clip-text text-transparent mb-3">
          Registration Successful!
        </h2>

        {/* Message */}
        <p className="text-gray-700 text-[14px] sm:text-base mb-2">
          🎉 Congratulations! Your account has been created successfully.
        </p>
        <p className="text-gray-600 text-[12px] sm:text-[14px] mb-8">
          You can now access the main portal to manage your profile, register for
          events, and explore more features of the Athletic Meet system.
        </p>

        {/* Button */}
        <a
          href="/portal" // 🔁 change this to your actual route
          className="inline-block w-full py-3 px-4 bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
        >
          Go to Main Portal
        </a>

        {/* Footer */}
        <p className="text-sm text-gray-500 mt-6">
          Thank you for registering with <br />
          <span className="font-semibold text-gray-700">
            Guru Nanak Dev Engineering College <br />
          </span>
          We look forward to your participation!
        </p>
      </div>
    </div>
  );
}
