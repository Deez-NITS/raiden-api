import { error } from "./error.js";

const serverError = error("Internal Server Error.");

//----------------- AUTH -------------------------------

const userNotFound = error("User not found.");
const userAlreadyExists = error("User already exists.");
const userUnauthenticated = error("User unauthenticated.");

//----------------- OTP -------------------------------

const otpExpired = error("OTP expired.");
const incorrectOtp = error("OTP incorrect.");
const userAlreadyVerified = error("User already verified.");

export {
  serverError,
  userNotFound,
  userAlreadyExists,
  userUnauthenticated,
  otpExpired,
  incorrectOtp,
  userAlreadyVerified,
};
