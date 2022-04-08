import { sendMail } from "./mailer.js";
import { newHashString } from "./string.js";
import { hash } from "./hash.js";
import { OTP_AGE } from "../globals/constants.js";

/**
 *  Generates OTP and Expiry Date and sends mail.
 *
 * @param {import("express").Request} req
 * @returns {Promise<{
 *  value: string,
 *  expiry: number,
 * }>}
 */
async function generateOtp(req) {
  let otp = newHashString();
  let hashedOtp = await hash(otp);
  let expiryDuration = OTP_AGE;

  await sendOtpMail(req, otp, expiryDuration);

  return {
    value: hashedOtp,
    expiry: new Date(expiryDuration + new Date().getTime()),
  };
}

/**
 * Sends OTP mail.
 *
 * @param {import("express").Request} req
 * @param {string} otp
 * @param {number} expiryDuration
 */
async function sendOtpMail(req, otp, expiryDuration) {
  try {
    const { name, email } = req.body;

    const subject = `Please Verify Your Email | ${process.env.NAME}`;

    const html = `
      <p>
        <h3>Dear ${name},</h3>
      Thank you for joining ${process.env.NAME}.
      To verify your account, please verify your OTP.
      </p>
      <p>OTP : <b>${otp}</b></p>
      <p>Duration: ${expiryDuration / (60 * 1000)} min</p>
    `;

    await sendMail({ email, subject, html });
  } catch (err) {
    console.log(err);
  }
}

export { generateOtp, sendOtpMail };
