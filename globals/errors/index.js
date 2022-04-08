import { error } from "./error.js";

const serverError = error("Internal Server Error.");
const invalidId = error("Invalid ID.");
const unauthorizedAccess = error("Unauthorized access.");

//----------------- AUTH -------------------------------

const userNotFound = error("User not found.");
const userAlreadyExists = error("User already exists.");
const userUnauthenticated = error("User unauthenticated.");
const incorrectCredentials = error("Incorrect credentials.");

//----------------- OTP -------------------------------

const otpExpired = error("OTP expired.");
const incorrectOtp = error("OTP incorrect.");
const userAlreadyVerified = error("User already verified.");

//----------------- AIRPORT -------------------------------

const airportNotFound = error("Airport not found.");
const airportCodeTaken = error("Airport code taken");

//----------------- FLIGHT -------------------------------

const flightExists = error("Flight already exists.");
const flightNotFound = error("Flight not found.");

//----------------- ORDER -------------------------------

const orderExists = error("Order already exists.");
const orderNotFound = error("Order not found.");

//----------------- ITEM -------------------------------

const itemExists = error("Item already exists");
const itemNotFound = error("Item not found.");

//----------------- PROVIDER -------------------------------

const providerNotFound = error("Provider not found");

//----------------- PROVIDER -------------------------------

const reviewExists = error("Review already exists");
const reviewNotFound = error("Review not found");

//----------------- UPLOAD -------------------------------

const errorUploading = error("Error uploading files");

export {
  error,
  serverError,
  invalidId,
  unauthorizedAccess,
  userNotFound,
  userAlreadyExists,
  userUnauthenticated,
  incorrectCredentials,
  otpExpired,
  incorrectOtp,
  userAlreadyVerified,
  airportNotFound,
  airportCodeTaken,
  flightExists,
  flightNotFound,
  orderExists,
  orderNotFound,
  itemExists,
  itemNotFound,
  providerNotFound,
  reviewExists,
  reviewNotFound,
  errorUploading,
};
