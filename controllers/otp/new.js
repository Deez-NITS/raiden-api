import { prisma } from "../../utils/index.js";
import {
  serverError,
  userAlreadyVerified,
  userNotFound,
} from "../../globals/errors/index.js";
import { generateOtp } from "../../utils/index.js";
import { otpIssued } from "../../globals/success/index.js";

/**
 * @description Sets a new OTP
 * for user
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function newOtp(req, res) {
  try {
    const { type } = req.body;
    const { email } = req.body;

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

    // User already Verified
    if (user.verified) {
      return res.json(userAlreadyVerified);
    }

    // All perfect
    const otp = await generateOtp(req);

    if (type === "provider") {
      await prisma.provider.update({
        where: {
          email,
        },
        data: {
          otpValue: otp.value,
          otpExpiry: otp.expiry,
        },
      });
    } else {
      await prisma.user.update({
        where: {
          email,
        },
        data: {
          otpValue: otp.value,
          otpExpiry: otp.expiry,
        },
      });
    }

    res.json(otpIssued);
  } catch (err) {
    console.log(err);
    res.json(serverError);
  }
}

export { newOtp };
