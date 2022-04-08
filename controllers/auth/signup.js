import bcrypt from "bcrypt";

import { prisma, defaultProfilePic } from "../../utils/index.js";
import {
  airportNotFound,
  serverError,
  userAlreadyExists,
} from "../../globals/errors/index.js";
import { userCreated } from "../../globals/success/index.js";
import { generateOtp } from "../../utils/index.js";

/**
 * @description Signs Up the user
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function signup(req, res) {
  try {
    const {
      email,
      name,
      password,
      dob,
      phoneNumber,
      tags,
      airportCode,
      gstin,
      description,
    } = req.body;

    const { type } = req.params;

    // Hashing the Password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Default Profile Picture
    const img = defaultProfilePic(name);

    // Finding if user already exists
    let findIdentity;

    if (type === "provider") {
      findIdentity = await prisma.provider.findFirst({
        where: {
          email,
        },
      });
    } else {
      findIdentity = await prisma.user.findFirst({
        where: {
          email,
        },
      });
    }

    if (findIdentity) {
      return res.json(userAlreadyExists);
    }

    // New User
    if (type === "provider") {
      if (
        (await prisma.airport.count({ where: { code: airportCode } })) === 0
      ) {
        return res.json(airportNotFound);
      }
    }

    const otp = await generateOtp(req);
    if (type === "provider") {
      await prisma.provider.create({
        data: {
          name,
          email,
          password: hashedPassword,
          phoneNumber,
          img,
          tags,
          airportCode,
          otpValue: otp.value,
          otpExpiry: otp.expiry,
          gstin,
          description,
        },
      });
    } else {
      await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          dob: new Date(dob),
          img,
          phoneNumber,
          otpValue: otp.value,
          otpExpiry: otp.expiry,
        },
      });
    }

    res.json(userCreated);
  } catch (err) {
    console.log(err);
    res.json(serverError);
  }
}

export { signup };
