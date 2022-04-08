import {
  serverError,
  itemNotFound,
  invalidId,
} from "../../globals/errors/index.js";
import { itemUpdated } from "../../globals/success/index.js";
import { prisma, validId } from "../../utils/index.js";

/**
 * @description Updates an item
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function updateItem(req, res) {
  try {
    let { id } = req.params;

    if (!validId(id)) {
      console.log(id, parseInt(id));
      return res.json(invalidId);
    }

    id = parseInt(id);

    const { description, price, img } = req.body;

    if ((await prisma.item.count({ where: { id } })) === 0) {
      return res.json(itemNotFound);
    }

    await prisma.item.update({
      where: {
        id,
      },
      data: {
        description,
        price,
        img,
      },
    });

    res.json(itemUpdated);
  } catch (err) {
    console.log(err);
    res.json(serverError);
  }
}

export { updateItem };
