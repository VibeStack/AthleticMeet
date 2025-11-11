import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Body parsing
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Cookies
app.use(cookieParser());

// Static files
app.use(express.static("public"));

// ✅ CORS - should come before routes
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "PATCH","DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "x-client-key",
      "x-client-token",
      "x-client-secret",
    ],
    credentials: true, // Allow cookies
  })
);

// router import
import userRouter from "./routes/user.routes.js"
import otpRouter from "./routes/emailOtpGenerator.routes.js"

// router decleration
app.use("/api/v1/users",userRouter)
app.use("/api/v1/otp", otpRouter);

// ping route
app.get("/ping",(req,res)=>{
  res.status(200).send("OK");
})


export { app };
