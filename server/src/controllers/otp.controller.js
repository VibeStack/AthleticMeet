import bcrypt from "bcrypt";
import { User } from "../models/User.model.js";
import { Resend } from "resend";

const otpStore = new Map(); // key: email, value: { otp, expiryTime, userData }

/* ------------------------ SEND OTP ------------------------ */
export const sendOtp = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      fullName,
      gender,
      course,
      branch,
      crn,
      urn,
      year,
      phone,
    } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ error: "Username, email, and password are required." });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: "User with this email or username already exists." });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    const expiryTime = Date.now() + 5 * 60 * 1000; // 5 min expiry

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Temporarily store user until OTP verified
    otpStore.set(email, {
      otp,
      expiryTime,
      userData: {
        username,
        email,
        password: hashedPassword,
        fullName,
        gender,
        course,
        branch,
        crn,
        urn,
        year,
        phone,
      },
    });

    // ✅ Send OTP using Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Athletix 2025 <onboarding@resend.dev>",
      to: email,
      subject: "Athletix 2025 - Verify Your Email",
      html: `
        <div style="font-family: Arial; padding: 20px;">
          <h2 style="color: #2b6cb0;">Email Verification</h2>
          <p>Your OTP for verification is:</p>
          <h1 style="letter-spacing: 3px; color: #2f855a;">${otp}</h1>
          <p>This OTP will expire in 5 minutes.</p>
          <br/>
          <p>- Team Athletix 2025</p>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully to your email.",
      email,
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ error: "Failed to send OTP" });
  }
};

/* ------------------------ VERIFY OTP + SAVE USER DATA ------------------------ */
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ error: "Email and OTP are required." });
    }

    const otpData = otpStore.get(email);

    if (!otpData) {
      return res.status(400).json({ error: "No OTP found for this email." });
    }

    // Check if OTP expired
    if (Date.now() > otpData.expiryTime) {
      otpStore.delete(email);
      return res.status(400).json({ error: "OTP has expired." });
    }

    // Check if OTP matches
    if (Number(otp) !== otpData.otp) {
      return res.status(400).json({ error: "Invalid OTP." });
    }

    // ✅ If verified: either create new or update existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // Update existing user (if already created partially)
      await User.updateOne(
        { email },
        {
          ...otpData.userData,
          isEmailVerified: true,
        }
      );
    } else {
      // Create new user (if not created yet)
      await User.create({
        ...otpData.userData,
        isEmailVerified: true,
      });
    }

    // Cleanup memory store
    otpStore.delete(email);

    return res.status(200).json({
      success: true,
      message: "OTP verified and user details saved successfully!",
    });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ error: "Failed to verify OTP" });
  }
};
