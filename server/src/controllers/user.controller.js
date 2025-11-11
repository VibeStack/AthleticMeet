import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/User.model.js";

/* ------------------------ REGISTER USER ------------------------ */
const registerUser = asyncHandler(async (req, res) => {
  const {
    username,
    email,
    fullname,
    gender,
    course,
    branch,
    crn,
    urn,
    year,
    phone,
    password,
  } = req.body;

  // Ensure email & username are present
  if (!username || !email) {
    return res
      .status(400)
      .json({ message: "Username and email are required." });
  }

  // ✅ Check if user already exists
  let user = await User.findOne({ $or: [{ email }, { username }] });

  if (user) {
    // ✅ Update existing verified user
    user.fullname = fullname || user.fullname;
    user.gender = gender || user.gender;
    user.course = course || user.course;
    user.branch = branch || user.branch;
    user.crn = crn || user.crn;
    user.urn = urn || user.urn;
    user.year = year || user.year;
    user.phone = phone || user.phone;

    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "User details updated successfully!" });
  }

  // ✅ Otherwise, create new user (only if OTP was not used yet)
  const newUser = await User.create({
    username,
    email,
    password,
    fullname,
    gender,
    course,
    branch,
    crn,
    urn,
    year,
    phone,
    isEmailVerified: true, // since OTP verified already
  });

  return res.status(201).json({
    success: true,
    message: "User registered successfully.",
    user: {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      fullname: newUser.fullname,
    },
  });
});



/* ------------------------ GET ALL USERS ------------------------ */
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json({
    success: true,
    count: users.length,
    users,
  });
});

/* ------------------------ LOGIN USER ------------------------ */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // 1️⃣ Check email and password
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  // 2️⃣ Find user with password
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  // 3️⃣ Compare password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  // 4️⃣ Generate tokens
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  // 5️⃣ Send response (with tokens)
  res.status(200).json({
    success: true,
    message: "Login successful.",
    accessToken,
    refreshToken,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      fullname: user.fullname,
    },
  });
});

/* ------------------------ CHECK LOGIN STATUS ------------------------ */
const getLoginStatus = asyncHandler(async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded._id).select("-password");

    if (!user) return res.status(404).json({ message: "User not found." });

    res.status(200).json({ success: true, user });
  } catch (error) {
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired token." });
  }
});

export { registerUser, getAllUsers, loginUser, getLoginStatus };
