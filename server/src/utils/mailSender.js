import nodemailer from "nodemailer";

export const mailSender = async (email,otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Athletix 2025" <${process.env.EMAIL_USER}>`,
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
};
