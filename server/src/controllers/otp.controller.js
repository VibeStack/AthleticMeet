import bcrypt from "bcrypt";
import { User } from "../models/User.model.js";
import nodemailer from "nodemailer";
import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

const otpStore = new Map(); // key: email, value: { otp, expiryTime, userData }

// ---------------- GOOGLE OAUTH CONFIG ----------------
const CLIENT_ID = process.env.GMAIL_CLIENT_ID;
const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN;
const USER_EMAIL = process.env.GMAIL_USER;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// ✅ Reusable Gmail Send Function
const sendEmail = async (to, subject, htmlContent) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: USER_EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      from: `Athletix 2025 <${USER_EMAIL}>`,
      to,
      subject,
      html: htmlContent,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", result.response);
    return result;
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw error;
  }
};

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
      return res.status(400).json({
        error: "Username, email, and password are required.",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email or username already exists." });
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

    // ✅ Send OTP using Gmail API
    const htmlContent = `
      <div style="font-family: Arial; padding: 20px;">
        <h2 style="color: #2b6cb0;">Email Verification</h2>
        <p>Your OTP for verification is:</p>
        <h1 style="letter-spacing: 3px; color: #2f855a;">${otp}</h1>
        <p>This OTP will expire in 5 minutes.</p>
        <br/>
        <p>- Team Athletix 2025</p>
      </div>
    `;

    await sendEmail(email, "Athletix 2025 - Verify Your Email", htmlContent);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully to your email.",
      email,
    });
  } catch (error) {
    console.error("❌ Error sending OTP:", error);
    res.status(500).json({ error: "Failed to send OTP" });
  }
};

/* ------------------------ VERIFY OTP + SAVE USER DATA ------------------------ */
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res
        .status(400)
        .json({ error: "Email and OTP are required." });
    }

    const otpData = otpStore.get(email);

    if (!otpData) {
      return res
        .status(400)
        .json({ error: "No OTP found for this email." });
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

    // ✅ If verified: create or update user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      await User.updateOne(
        { email },
        { ...otpData.userData, isEmailVerified: true }
      );
    } else {
      await User.create({
        ...otpData.userData,
        isEmailVerified: true,
      });
    }

    otpStore.delete(email);

    return res.status(200).json({
      success: true,
      message: "OTP verified and user details saved successfully!",
    });
  } catch (error) {
    console.error("❌ Error verifying OTP:", error);
    res.status(500).json({ error: "Failed to verify OTP" });
  }
};
