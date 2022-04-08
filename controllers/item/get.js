import {
  serverError,
  invalidId,
  itemNotFound,
  providerNotFound,
} from "../../globals/errors/index.js";
import { success } from "../../globals/success/index.js";
import { prisma, validId } from "../../utils/index.js";

async function getItem(req, res) {
  try {
    let { id } = req.params;

    if (!validId(id)) {
      console.log(id, parseInt(id));
      return res.json(invalidId);
    }

    id = parseInt(id);

    const item = await prisma.item.findFirst({
      where: {
        id,
      },
    });

    if (!item) {
      return res.json(itemNotFound);
    }

    res.json(success(item));
  } catch (err) {
    console.log(err);
    res.json(serverError);
  }
}

/**
 *
 * @description Get items of
 * a provider
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function getItemsByProvider(req, res) {
  try {
    let { id } = req.params;

    if (!validId(id)) {
      console.log(id, parseInt(id));
      return res.json(invalidId);
    }

    id = parseInt(id);

    if ((await prisma.provider.count({ where: { id } })) === 0) {
      return res.json(providerNotFound);
    }

    const items = await prisma.item.findMany({
      where: {
        providerId: id,
      },
    });

    res.json(success(items));
  } catch (err) {
    console.log(err);
    res.json(serverError);
  }
}

export { getItem, getItemsByProvider };
