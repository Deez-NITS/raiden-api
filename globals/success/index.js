import { success } from "./success.js";

const userCreated = success("User successfully created.");
const userLoggedOut = success("User logged out successfully.");

const otpVerified = success("OTP verified successfully.");
const otpIssued = success("New OTP issued successfully.");

export { success, userCreated, userLoggedOut, otpVerified, otpIssued };
