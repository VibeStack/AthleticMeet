import { User } from "../models/User.model.js";
import { otpGenerator } from "../utils/otpGenerator.js";
import { mailSender } from "../utils/mailSender.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Otp } from "../models/Otp.model.js";
import bcrypt from "bcrypt"

let isUserDetailsComplete = "false";

export const registerOtpSender = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      throw new ApiError(
        400,
        "All fields (username, email, password) are required"
      );
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] }).select("+password");

    if (existingUser && existingUser.isUserDetailsComplete === "false") {
      const { otp, expiryTime } = otpGenerator();

      console.log({otp,expiryTime})

      await Otp.findOneAndUpdate(
        { email, purpose: "registration" },
        { otp, expiryTime },
        { upsert: true }
      );

      await mailSender(email, otp);

      return res
        .status(200)
        .json(new ApiResponse(200, null, "OTP resent successfully!"));
    }

    if (existingUser && existingUser.isUserDetailsComplete === "partial") {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!isPasswordCorrect) {
        return res
          .status(401)
          .json(
            new ApiResponse(401, null, "❌ Incorrect password. Please try again.")
          );
      }

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { step: "Move To Personal Details Section" },
            "Your email is already verified. Please complete your personal details."
          )
        );
    }

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message:
          "User with this email or username already exists and is verified",
      });
    }

    const { otp, expiryTime } = otpGenerator();

    await Otp.create({
      email,
      otp,
      expiryTime,
      purpose: "registration",
    });

    await User.create({
      username,
      email,
      password,
      isUserDetailsComplete: "false",
    });
    await mailSender(email, otp);

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          null,
          "OTP sent successfully! Please verify your email."
        )
      );
  } catch (error) {
    if (!(error instanceof ApiError)) {
      error = new ApiError(500, "Internal Server Error", error.message);
    }
    next(error);
  }
};

export const registerOtpVerifier = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) throw new ApiError(400, "Email and OTP are required");

    const otpData = await Otp.findOne({ email, purpose: "registration" });

    if (!otpData)
      throw new ApiError(404, "No OTP found. Please request a new one.");

    if (Date.now() > otpData.expiryTime) {
      await Otp.deleteOne({ email, purpose: "registration" });
      throw new ApiError(410, "OTP has expired. Please request a new one.");
    }

    if (Number(otp) !== Number(otpData.otp)) {
      throw new ApiError(400, "Invalid OTP.");
    }

    await User.findOneAndUpdate(
      { email },
      { $set: { isUserDetailsComplete: "partial" } }
    );

    await Otp.deleteOne({ email, purpose: "registration" });

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          null,
          "OTP verified successfully! Registration complete."
        )
      );
  } catch (error) {
    next(error);
  }
};



