import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      index: true,
    },
    otp: {
      type: String,
      required: true,
    },
    expiryTime: {
      type: Number,
      required: true,
    },
    purpose: {
      type: String,
      enum: ["registration", "login"],
      required: true,
    },
    expiresAt: {
      type: Date,
      default: () => Date.now() + 5 * 60 * 1000,
      expires: 300,
    },
  },
  { timestamps: true }
);

export const Otp = mongoose.model("Otp", OtpSchema);
