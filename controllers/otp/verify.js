import bcrypt from "bcrypt";

import { prisma } from "../../utils/index.js";
import {
  incorrectOtp,
  otpExpired,
  serverError,
  userAlreadyVerified,
  userNotFound,
} from "../../globals/errors/index.js";
import { otpVerified } from "../../globals/success/index.js";

/**
 *
 * @description Verifies the OTP
 * of a user.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function verifyOtp(req, res) {
  try {
    const { type } = req.params;
    const { email, otp } = req.body;

    let user;

    if (type === "provider") {
      user = await prisma.provider.findFirst({
        where: {
          email,
        },
      });
    } else {
      user = await prisma.user.findFirst({
        where: {
          email,
        },
      });
    }

    // User not found
    if (!user) {
      return res.json(userNotFound);
    }

    // User already verified
    if (user.verified) {
      return res.json(userAlreadyVerified);
    }

    // OTP Expired
    if (user.otpExpiry < new Date()) {
      return res.json(otpExpired);
    }

    // Incorrect OTP
    if (!(await bcrypt.compare(otp, user.otpValue))) {
      return res.json(incorrectOtp);
    }

    // All perfect

    if (type === "provider") {
      await prisma.provider.update({
        where: {
          email,
        },
        data: {
          otpValue: "",
          otpExpiry: new Date(0),
          verified: true,
        },
      });
    } else {
      await prisma.user.update({
        where: {
          email,
        },
        data: {
          otpValue: "",
          otpExpiry: new Date(0),
          verified: true,
        },
      });
    }
    res.json(otpVerified);
  } catch (err) {
    console.log(err);
    res.json(serverError);
  }
}

export { verifyOtp };
