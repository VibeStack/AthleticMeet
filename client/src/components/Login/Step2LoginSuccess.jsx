import React from "react";
import { CheckIcon } from "../Helpers/SvgCollection.jsx";

export default function LoginSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8 border border-gray-100 text-center animate-fade-in">
        
        <div className="flex justify-center mb-4">{CheckIcon}</div>

        <h2 className="text-2xl font-extrabold bg-linear-to-r from-green-500 via-green-600 to-green-700 bg-clip-text text-transparent mb-3">
          Login Successful!
        </h2>

        <p className="text-gray-700 text-sm mb-2">
          🎉 Welcome back! Your OTP has been verified successfully.
        </p>

        <p className="text-gray-600 text-[12px] sm:text-[14px] mb-8">
          Redirecting you to the main portal...
        </p>

        <a
          href="/portal"
          className="inline-block w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
        >
          Go to Portal
        </a>
      </div>
    </div>
  );
}
