// components/Register/Step1AccountForm.jsx
import React from "react";
import { useFormContext } from "react-hook-form";
import InputField from "./InputField";
import axios from "axios";

export default function Step1AccountForm({ nextStep }) {
  const {
    register,
    handleSubmit,
    formState: { errors,isSubmitting },
  } = useFormContext();

  const onSubmit = async (data) => {
    const API_URL = import.meta.env.VITE_API_URL;
    try {
      console.log(data);
      const response = await axios.post(`${API_URL}/otp/send`, data, {
        withCredentials: true,
      });
      console.log("✅ OTP Sent:", response.data);
      alert("OTP sent to your email. Please verify to complete registration.");
      nextStep();
    } catch (error) {
      if (error.response) {
        console.error("❌ Error:", error.response.data);
        alert(error.response.data.error || "Failed to send OTP.");
      } else {
        alert("Network error. Please try again later.");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow-lg rounded-xl w-full max-w-md p-6 sm:p-8 mx-auto border border-gray-100 transition-all duration-300 hover:shadow-xl"
    >
      {/* Header */}
      <div className="text-center mb-4">
        <img
          src="/images/gne_logo.png"
          alt="College Logo"
          className="h-18 w-18 mx-auto mb-3"
        />
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          Guru Nanak Dev Engineering College
        </h2>
        <p className="text-[14px] md:text-sm text-gray-600">
          Athletic Meet Registration Portal
        </p>
      </div>

      {/* Form Title */}
      <h3 className="text-[16px] sm:text-xl font-extrabold text-center mb-6 bg-linear-to-r from-blue-500 via-blue-600 to-blue-700 bg-clip-text text-transparent tracking-wide">
        Create Your Account
      </h3>

      {/* Input Fields */}
      <InputField
        label="Username"
        id="username"
        placeholder="Enter Username"
        register={register}
        rules={{
          required: {
            value: true,
            message: "Username is required",
          },
          minLength: {
            value: 3,
            message: "Username must be at least 3 characters long",
          },
        }}
        errors={errors}
      />

      <InputField
        label="Email"
        id="email"
        type="email"
        placeholder="Enter your College Email (example@gndec.ac.in)"
        register={register}
        rules={{
          required: { value: true, message: "Email is required" },
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@gndec\.ac\.in$/,
            message: "Valid College Mail must end with @gndec.ac.in",
          },
        }}
        errors={errors}
      />

      <InputField
        label="Password"
        id="password"
        type="password"
        placeholder="Create a Strong Password"
        register={register}
        rules={{
          required: { value: true, message: "Password is required" },
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters long",
          },
        }}
        errors={errors}
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full mt-6 py-3 px-4 bg-linear-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
      >
        Send Email OTP
      </button>
      <button
          type="submit"
          className={`w-full mt-6 py-3 px-4 bg-linear-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 flex items-center justify-center gap-2 ${
            isSubmitting
              ? "bg-blue-600 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Submitting...
            </>
          ) : (
            "Login"
          )}
        </button>

      {/* Footer */}
      <p className="text-sm text-gray-600 text-center mt-6">
        Already have an account?{" "}
        <a href="/login" className="text-blue-600 hover:underline font-medium">
          Login here
        </a>
      </p>
    </form>
  );
}
