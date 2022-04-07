import bcrypt from "bcrypt";

import { prisma } from "../../utils/index.js";
import {
  incorrectCredentials,
  serverError,
} from "../../globals/errors/index.js";
import {
  passwordChanged,
  profileUpdated,
} from "../../globals/success/index.js";

/**
 * @description Change the password
 * of logged in user
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function changePassword(req, res) {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        id: req.user.id,
      },
    });

    if (!(await bcrypt.compare(oldPassword, user.password))) {
      return res.json(incorrectCredentials);
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    res.json(passwordChanged);
  } catch (err) {
    console.log(err);
    res.json(serverError);
  }
}

/**
 * @description Update the details of user
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function updateProfileDetails(req, res) {
  try {
    const { name, dob, phoneNumber } = req.body;

    await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        name,
        dob: dob ? new Date(dob) : undefined,
        phoneNumber,
      },
    });

    res.json(profileUpdated);
  } catch (err) {
    console.log(err);
    res.json(serverError);
  }
}

export { changePassword, updateProfileDetails };
