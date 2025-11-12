import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import { User } from "../models/User.model.js";
import { otpGenerator } from "../utils/otpGenerator.js";
import { mailSender } from "../utils/mailSender.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const otpStore = new Map();
let isUserVerified = false;

export const registerOtpSender = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      throw new ApiError(
        400,
        "All fields (username, email, password) are required"
      );
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      if (existingUser.isUserVerified === false) {
        const { otp, expiryTime } = otpGenerator();
        otpStore.set(email, { username, email, password, otp, expiryTime });

        await mailSender(email, otp);

        return res
          .status(200)
          .json(new ApiResponse(200, null, "OTP resent successfully!"));
      }

      throw new ApiError(
        409,
        "User with this email or username already exists and is verified",
        ["User with this email or username already exists and is verified."]
      );
    }

    const { otp, expiryTime } = otpGenerator();
    otpStore.set(email, { username, email, password, otp, expiryTime });

    await mailSender(email, otp);

    await User.create({
      username,
      email,
      password,
      isUserVerified: false,
    });

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
    if (!email || !otp) {
      throw new ApiError(400, "Email and OTP are required");
    }

    if (!otpStore.get(email)) {
      throw new ApiError(404, "No OTP found. Please request a new one.");
    }

    if (Date.now() > otpStore.expiryTime) {
      otpStore.delete(email);
      throw new ApiError(410, "OTP has expired. Please request a new one.");
    }
    if (Number(otp) === Number(otpStore.get(email).otp)) {
      await User.findOneAndUpdate(
        { $or: [{ email }] },
        { $set: { isUserVerified: true } }
      );

      isUserVerified = true;
      otpStore.delete(email);

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            null,
            "✅ OTP verified successfully! Registration complete."
          )
        );
    } else {
      throw new ApiError(400, "Invalid OTP. Please try again.");
    }
  } catch (error) {
    next(error);
  }
};

// export const loginOtp = async (req, res) => {
//   try {
//     const {
//       username,
//       email,
//       password,
//       fullName,
//       gender,
//       course,
//       branch,
//       crn,
//       urn,
//       year,
//       phone,
//     } = req.body;

//     if (!email || !username || !password) {
//       return res
//         .status(400)
//         .json({ error: "Username, email, and password are required." });
//     }

//     // Check if user already exists
//     const existingUser = await User.findOne({ $or: [{ email }, { username }] });
//     if (existingUser) {
//       return res
//         .status(400)
//         .json({ error: "User with this email or username already exists." });
//     }

//     const { otp, expiryTime } = otpGenerator();

//     // Hash password before storing
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Temporarily store all data until OTP verified
//     otpStore.set(email, {
//       otp,
//       expiryTime,
//       userData: {
//         username,
//         email,
//         password: hashedPassword,
//         fullName,
//         gender,
//         course,
//         branch,
//         crn,
//         urn,
//         year,
//         phone,
//       },
//     });

//     mailSender();

//     return res.status(200).json({
//       success: true,
//       message: "OTP sent successfully to your email.",
//       email,
//     });
//   } catch (error) {
//     console.error("Error sending OTP:", error);
//     res.status(500).json({ error: "Failed to send OTP" });
//   }
// };

// /* ------------------------ VERIFY OTP + SAVE USER DATA ------------------------ */
// export const verifyOtp = async (req, res) => {
//   try {
//     const { email, otp } = req.body;

//     if (!email || !otp) {
//       return res.status(400).json({ error: "Email and OTP are required." });
//     }

//     const otpData = otpStore.get(email);

//     if (!otpData) {
//       return res.status(400).json({ error: "No OTP found for this email." });
//     }

//     // Check if OTP expired
//     if (Date.now() > otpData.expiryTime) {
//       otpStore.delete(email);
//       return res.status(400).json({ error: "OTP has expired." });
//     }

//     // Check if OTP matches
//     if (Number(otp) !== otpData.otp) {
//       return res.status(400).json({ error: "Invalid OTP." });
//     }

//     // ✅ If verified: either create new or update existing user
//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//       // Update existing user (if already created partially)
//       await User.updateOne(
//         { email },
//         {
//           ...otpData.userData,
//           isEmailVerified: true,
//         }
//       );
//     } else {
//       // Create new user (if not created yet)
//       await User.create({
//         ...otpData.userData,
//         isEmailVerified: true,
//       });
//     }

//     // Cleanup memory store
//     otpStore.delete(email);

//     return res.status(200).json({
//       success: true,
//       message: "OTP verified and user details saved successfully!",
//     });
//   } catch (error) {
//     console.error("Error verifying OTP:", error);
//     res.status(500).json({ error: "Failed to verify OTP" });
//   }
// };
