import { success } from "./success.js";

//---------------------- USER -----------------------------

const userCreated = success("User successfully created.");
const userLoggedOut = success("User logged out successfully.");
const passwordChanged = success("Password changed successfully.");
const profileUpdated = success("Profile updated.");

//---------------------- OTP -----------------------------

const otpVerified = success("OTP verified successfully.");
const otpIssued = success("New OTP issued successfully.");

//---------------------- AIRPORT -----------------------------

const airportCreated = success("Airport created successfully.");
const airportUpdated = success("Airport updated successfully.");

//---------------------- FLIGHT -----------------------------

const flightCreated = success("Flight created successfully.");

//---------------------- ORDER -----------------------------

const orderCreated = success("Order created successfully.");
const orderStatusUpdated = success("Order status updated.");

//---------------------- ITEM -----------------------------

const itemCreated = success("Item created successfully.");
const itemUpdated = success("Item updated successfully.");

export {
  success,
  userCreated,
  userLoggedOut,
  passwordChanged,
  profileUpdated,
  otpVerified,
  otpIssued,
  airportCreated,
  airportUpdated,
  flightCreated,
  orderCreated,
  orderStatusUpdated,
  itemCreated,
  itemUpdated,
};
