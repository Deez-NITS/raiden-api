import express from "express";
import passport from "passport";

import otpRouter from "./otp.js";

import {
  userLogin,
  userSignUp,
  userSignOut,
} from "../controllers/auth/index.js";
import { authenticated, loginErrors } from "../middlewares/index.js";

const router = express.Router({ mergeParams: true });

router.use("/otp", otpRouter);

router.post(
  "/login",
  passport.authenticate("local", { failWithError: true }),
  loginErrors,
  userLogin
);
router.post("/signup", userSignUp);
router.post("/logout", authenticated, userSignOut);

export default router;
