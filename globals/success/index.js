import { success } from "./success.js";

const userCreated = success("User successfully created.");
const userLoggedOut = success("User logged out successfully.");

const otpVerified = success("OTP verified successfully.");
const otpIssued = success("New OTP issued successfully.");

const airportCreated = success("Airport created successfully.");
const airportUpdated = success("Airport updated successfully.");

export {
  success,
  userCreated,
  userLoggedOut,
  otpVerified,
  otpIssued,
  airportCreated,
  airportUpdated,
};
