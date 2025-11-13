import { Router } from "express";
import {
  loginOtpSender,
  loginOtpVerifier,
  registerOtpSender,
  registerOtpVerifier,
} from "../controllers/otp.controller.js";

const router = Router();

router.route("/registerOtpSender").post(registerOtpSender);
router.route("/registerOtpVerifier").post(registerOtpVerifier);
router.route("/loginOtpSender").post(loginOtpSender);
router.route("/loginOtpVerifier").post(loginOtpVerifier);

export default router;
