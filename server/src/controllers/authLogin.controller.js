import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const loginUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    console.log({ username, email, password });

    if (!email || !password || !username){
      throw new ApiError(400, "Username, Email & Password are required!");
    }

    const existingUser = await User.findOne({ email }).select("+password");
    if (!existingUser) throw new ApiError(404, "User not found");

    // const isPasswordValid = await existingUser.isPasswordCorrect(password);
    // if (!isPasswordValid) {
    //   throw new ApiError(401, "Incorrect password. Please try again.");
    // }

    // await Otp.deleteOne({ email, purpose: "login" });

    return res.status(200).json(
      new ApiResponse(
        200,
        null,
        "Login successful! Welcome back."
      )
    );
  } catch (error) {
    if (!(error instanceof ApiError)) {
      error = new ApiError(500, "Internal Server Error", [error.message]);
    }
    next(error);
  }
};
