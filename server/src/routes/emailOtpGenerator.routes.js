import { Router } from "express";
import {
  loginOtpSender,
  registerOtpSender,
  registerOtpVerifier,
} from "../controllers/otp.controller.js";

const router = Router();

router.route("/registerOtpSender").post(registerOtpSender);
router.route("/registerOtpVerifier").post(registerOtpVerifier);
router.route("/loginOtpSender").post(loginOtpSender);

export default router;
