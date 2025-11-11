import { Router } from "express";
import {
  registerUser,
  getAllUsers,
  loginUser,
  getLoginStatus,
} from "../controllers/user.controller.js";

const router = Router();

// Register routes
router
  .route("/register")
  .post(registerUser)  // Create new user
  .put(registerUser)   // ✅ Update user if already exists (email/username)
  .get(getAllUsers);   // Get all users

// Login routes
router
  .route("/login")
  .post(loginUser)     // Login user
  .get(getLoginStatus); // Check login status

export default router;
