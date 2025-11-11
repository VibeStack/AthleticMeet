import React from "react";
import { useFormContext } from "react-hook-form";
import InputField from "./InputField";
import { UserIcon, MailIcon, LockIcon } from "../Register/SvgCollection";

export default function Step1Credentials({ nextStep }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  const onSubmit = (data) => {
    console.log("Credentials:", data);
    nextStep();
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
        Login In Your Credentials
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
        placeholder="Enter Your Password"
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

      {/* Footer */}
      <p className="text-sm text-gray-600 text-center mt-6">
        Don’t have an account?{" "}
        <a
          href="/register"
          className="text-blue-600 hover:underline font-medium"
        >
          Create one
        </a>
      </p>
    </form>
  );
}
