import { success } from "../../globals/success/index.js";
import {
  serverError,
  invalidId,
  userNotFound,
} from "../../globals/errors/index.js";
import { validId, prisma } from "../../utils/index.js";

/**
 * @description Gets details of
 * the logged in provider.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function getProvider(req, res) {
  try {
    res.json(success(req.user));
  } catch (err) {
    console.log(err);
    res.json(serverError);
  }
}

/**
 * @description Gets user by id
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function getProviderById(req, res) {
  try {
    let { id } = req.params;

    if (!validId(id)) {
      console.log(id, parseInt(id));
      return res.json(invalidId);
    }

    id = parseInt(id);

    const user = await prisma.provider.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      return res.json(userNotFound);
    }

    return res.json(success(user));
  } catch (err) {
    console.log(err);
    res.json(serverError);
  }
}

export { getProvider, getProviderById };
