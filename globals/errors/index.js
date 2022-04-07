import { error } from "./error.js";

const serverError = error("Internal Server Error.");
const invalidId = error("Invalid ID.");

//----------------- AUTH -------------------------------

const userNotFound = error("User not found.");
const userAlreadyExists = error("User already exists.");
const userUnauthenticated = error("User unauthenticated.");

//----------------- OTP -------------------------------

const otpExpired = error("OTP expired.");
const incorrectOtp = error("OTP incorrect.");
const userAlreadyVerified = error("User already verified.");

//----------------- AIRPORT -------------------------------

const airportNotFound = error("Airport not found.");
const airportCodeTaken = error("Airport code taken");

export {
  serverError,
  invalidId,
  userNotFound,
  userAlreadyExists,
  userUnauthenticated,
  otpExpired,
  incorrectOtp,
  userAlreadyVerified,
  airportNotFound,
  airportCodeTaken,
};
