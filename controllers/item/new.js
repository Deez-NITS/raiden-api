import { itemExists, serverError } from "../../globals/errors/index.js";
import { itemCreated } from "../../globals/success/index.js";
import { prisma } from "../../utils/index.js";

/**
 * @description Add a new item
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function newItem(req, res) {
  try {
    const { name, providerId, description, price, tags } = req.body;

    if (
      (await prisma.item.findFirst({
        where: {
          name,
          providerId,
        },
      })) !== 0
    ) {
      return res.json(itemExists);
    }

    await prisma.item.create({
      data: {
        name,
        description,
        price,
        tags,
      },
    });

    res.json(itemCreated);
  } catch (err) {
    console.log(err);
    res.json(serverError);
  }
}
export { newItem };
