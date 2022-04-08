import express from "express";
import passport from "passport";

import otpRouter from "./otp.js";

import { login, signup, signout } from "../controllers/auth/index.js";
import { authenticated, loginErrors } from "../middlewares/index.js";

const router = express.Router({ mergeParams: true });

router.use("/otp", otpRouter);

router.post(
  "/login/:type",
  passport.authenticate("local", { failWithError: true }),
  loginErrors,
  login
);
router.post("/signup/:type", signup);
// router.post("/provider/signup", providerSignUp);
router.post("/logout", authenticated, signout);

export default router;
