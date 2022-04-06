import bcrypt from "bcrypt";

import { prisma } from "../../utils/index.js";
import { serverError, userAlreadyExists } from "../../globals/errors/index.js";
import { userCreated } from "../../globals/success/index.js";
import { generateOtp } from "../../utils/index.js";

/**
 * @description Signs Up the user
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function userSignUp(req, res) {
  try {
    const { email, name, password, dob, phoneNumber } = req.body;

    // Hashing the Password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Default Profile Picture
    const pfpUrl = `https://avatars.dicebear.com/api/identicon/${name}.svg`;

    // Finding if user already exists
    const findUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (findUser) {
      return res.json(userAlreadyExists);
    }

    // New User

    const otp = await generateOtp(req);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        dob: new Date(dob),
        img: pfpUrl,
        phoneNumber,
        otpValue: otp.value,
        otpExpiry: otp.expiry,
      },
    });

    res.json(userCreated);
  } catch (err) {
    console.log(err);
    res.json(serverError);
  }
}

export { userSignUp };
