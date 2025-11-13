import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import { User } from "../models/User.model.js";
import { otpGenerator } from "../utils/otpGenerator.js";
import { mailSender } from "../utils/mailSender.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registrationOtpStore = new Map();
const loginOtpStore = new Map();
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
        registrationOtpStore.set(email, { username, email, password, otp, expiryTime });

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
    registrationOtpStore.set(email, { username, email, password, otp, expiryTime });

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

    if (!registrationOtpStore.get(email)) {
      throw new ApiError(404, "No OTP found. Please request a new one.");
    }

    if (Date.now() > registrationOtpStore.expiryTime) {
      registrationOtpStore.delete(email);
      throw new ApiError(410, "OTP has expired. Please request a new one.");
    }
    if (Number(otp) === Number(registrationOtpStore.get(email).otp)) {
      await User.findOneAndUpdate(
        { $or: [{ email }] },
        { $set: { isUserVerified: true } }
      );

      isUserVerified = true;
      registrationOtpStore.delete(email);

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

export const loginOtpSender = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new ApiError(400, "Email is required for login.");
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new ApiError(404, "No account found with this email.");
    }

    if (existingUser.isUserVerified !== true) {
      throw new ApiError(
        403,
        "Your email is not verified. Please complete registration first."
      );
    }

    const { otp, expiryTime } = otpGenerator();

    loginOtpStore.set(email, { otp, expiryTime });
    
    await mailSender(email, otp);

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          null,
          "✅ Login OTP sent successfully! Please verify to continue."
        )
      );
  } catch (error) {
    if (!(error instanceof ApiError)) {
      error = new ApiError(500, "Internal Server Error", [error.message]);
    }
    next(error);
  }
};

export const loginOtpVerifier = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      throw new ApiError(400, "Email and OTP are required for verification.");
    }

    const storedOtpData = loginOtpStore.get(email);
    if (!storedOtpData) {
      throw new ApiError(404, "No OTP found for this email. Please request a new one.");
    }

    if (Date.now() > storedOtpData.expiryTime) {
      loginOtpStore.delete(email);
      throw new ApiError(410, "OTP has expired. Please request a new one.");
    }

    if (Number(otp) !== Number(storedOtpData.otp)) {
      throw new ApiError(400, "Invalid OTP. Please try again.");
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new ApiError(404, "User not found.");
    }

    if (existingUser.isUserVerified !== true) {
      throw new ApiError(403, "Account is not verified for login.");
    }

    loginOtpStore.delete(email);

    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json(
      new ApiResponse(200, { token }, "✅ Login successful! Welcome back.")
    );
  } catch (error) {
    if (!(error instanceof ApiError)) {
      error = new ApiError(500, "Internal Server Error", [error.message]);
    }
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
