import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({ path: "./.env" });

// ✅ Global error handlers (for debugging during deployment)
process.on("uncaughtException", (err) => {
  console.error("💥 Uncaught Exception:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("💥 Unhandled Promise Rejection:", err);
});

// ✅ Track DB connection state
let isConnected = false;

export default async function handler(req, res) {
  try {
    if (!isConnected) {
      await connectDB();
      isConnected = true;
      console.log("✅ MongoDB connected (serverless)");
    }
    return app(req, res);
  } catch (err) {
    console.error("❌ Handler error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
