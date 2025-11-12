export const otpGenerator = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  const expiryTime = Date.now() + 5 * 60 * 1000;
  return { otp, expiryTime };
};
