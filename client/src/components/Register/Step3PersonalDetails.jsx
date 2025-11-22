import React, { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import axios from "axios";
import InputField from "./InputField";
import SelectField from "./SelectField";

export default function Step3PersonalDetails({ nextStep, prevStep }) {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useFormContext();

  const selectedCourse = useWatch({ control, name: "course" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Course → Branch mapping
  const courseBranchMap = {
    "B.Tech": [
      "Computer Science & Engineering",
      "Information Technology",
      "Electrical Engineering",
      "Mechanical Engineering",
      "Civil Engineering",
      "Electronics & Communication Engineering",
      "Robotics & AI",
    ],
    "M.Tech": [
      "Computer Science & Engineering",
      "Electronics Engineering",
      "Mechanical Engineering",
      "Production Engineering",
      "Geo Technical Engineering",
      "Structural Engineering",
      "Environmental Science & Engineering",
    ],
    MBA: ["Finance", "Marketing", "Human Resource"],
    MCA: ["Computer Applications"],
    "B.Voc.": ["Interior Design"],
    "B.Com": ["Entrepreneurship"],
    BBA: [],
    BCA: [],
    "B.Arch": [],
  };

  const [branchOptions, setBranchOptions] = useState([]);
  const [isBranchDisabled, setIsBranchDisabled] = useState(true);

  useEffect(() => {
    if (selectedCourse) {
      const branches = courseBranchMap[selectedCourse] || [];
      setBranchOptions(branches);
      setIsBranchDisabled(branches.length === 0);
    } else {
      setBranchOptions([]);
      setIsBranchDisabled(true);
    }
  }, [selectedCourse]);

  /* ------------------------ SUBMIT FUNCTION ------------------------ */
  const onFormSubmit = async (data) => {
    const API_URL = import.meta.env.VITE_API_URL;

    // 👇 Get Step 1 data (already verified via OTP)
    const baseData = {
      username: getValues("username"),
      email: getValues("email"),
      password: getValues("password"),
    };

    // 👇 Combine Step 1 + Step 3 data
    const mergedData = { ...baseData, ...data };

    // 🧹 Remove any leftover OTP fields (otp0–otp5)
    const fullUserData = Object.fromEntries(
      Object.entries(mergedData).filter(([key]) => !key.startsWith("otp"))
    );

    try {
      setLoading(true);
      setMessage("Saving your registration details...");

      // ✅ Send to backend (update user by email or username)
      const response = await axios.put(
        `${API_URL}/users/register`,
        fullUserData
      );

      setMessage("Registration completed successfully!");
      // nextStep();
    } catch (error) {
      setMessage("Failed to complete registration.");
    } finally {
      setLoading(false);
    }
  };

  /* ------------------------ RENDER FORM ------------------------ */
  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="bg-white shadow-lg rounded-xl w-full max-w-2xl p-6 md:p-8 mx-auto mt-6 md:mt-10 border border-gray-100 transition-all duration-300 hover:shadow-xl overflow-hidden"
    >
      {/* Header */}
      <div className="text-center mb-5">
        <img
          src="/images/gne_logo.png"
          alt="College Logo"
          className="h-14 w-14 mx-auto mb-3"
        />
        <h2 className="text-[16px] md:text-xl font-bold text-gray-800">
          Guru Nanak Dev Engineering College
        </h2>
        <p className="text-[12px] md:text-sm text-gray-600">
          Athletic Meet Registration Portal
        </p>
      </div>

      {/* Title */}
      <h3 className="text-[16px] sm:text-xl font-extrabold text-center mb-5 bg-linear-to-r from-blue-500 via-blue-600 to-blue-700 bg-clip-text text-transparent tracking-wide">
        Personal Details
      </h3>

      {/* Full Name + Gender */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Full Name"
          id="fullname"
          placeholder="Enter your full name"
          register={register}
          rules={{
            required: { value: true, message: "Full name is required" },
          }}
          errors={errors}
        />

        <SelectField
          label="Gender"
          id="gender"
          options={["Male", "Female", "Other"]}
          register={register}
          rules={{ required: { value: true, message: "Gender is required" } }}
          errors={errors?.gender}
        />
      </div>

      {/* Course + Branch */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <SelectField
          label="Course"
          id="course"
          options={Object.keys(courseBranchMap)}
          register={register}
          rules={{ required: { value: true, message: "Course is required" } }}
          errors={errors?.course}
        />

        <SelectField
          label="Branch"
          id="branch"
          options={branchOptions}
          register={register}
          disabled={isBranchDisabled}
          rules={
            !isBranchDisabled
              ? { required: { value: true, message: "Branch is required" } }
              : {}
          }
          errors={errors?.branch}
        />
      </div>

      {/* CRN + URN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <InputField
          label="College Roll Number (CRN)"
          id="crn"
          placeholder="Enter your CRN"
          register={register}
          rules={{ required: { value: true, message: "CRN is required" } }}
          errors={errors}
        />

        <InputField
          label="University Roll Number (URN)"
          id="urn"
          placeholder="Enter your URN"
          register={register}
          rules={{ required: { value: true, message: "URN is required" } }}
          errors={errors}
        />
      </div>

      {/* Year + Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <SelectField
          label="Year"
          id="year"
          options={["1st Year", "2nd Year", "3rd Year", "4th Year"]}
          register={register}
          rules={{ required: { value: true, message: "Year is required" } }}
          errors={errors?.year}
        />

        <InputField
          label="Phone Number"
          id="phone"
          type="text"
          placeholder="Enter 10-digit phone number"
          register={register}
          rules={{
            required: { value: true, message: "Phone number is required" },
            pattern: {
              value: /^[6-9]\d{9}$/,
              message: "Enter a valid 10-digit phone number",
            },
          }}
          errors={errors}
        />
      </div>

      {/* Message */}
      {message && (
        <p
          className={`text-center text-sm absolute right-0.5 ${
            [
              "Registration completed successfully!",
              "Saving your registration details...",
            ].some((txt) => message.includes(txt))
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      {/* Buttons */}
      <div className="flex justify-center items-center mt-4">
        <button
          type="submit"
          className="px-6 py-2 bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Finish Registration"}
        </button>
      </div>
    </form>
  );
}
