import { itemExists, serverError } from "../../globals/errors/index.js";
import { itemCreated } from "../../globals/success/index.js";
import { prisma } from "../../utils/index.js";
import { defaultProfilePic } from "../../utils/index.js";

/**
 * @description Add a new item
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function newItem(req, res) {
  try {
    const { name, description, price, tags } = req.body;

    if (
      (await prisma.item.count({
        where: {
          name,
          providerId: req.user.id,
        },
      })) !== 0
    ) {
      return res.json(itemExists);
    }

    await prisma.provider.update({
      where: {
        id: req.user.id,
      },
      data: {
        items: {
          create: [
            {
              name,
              description,
              price,
              tags,
              providerId: req.params.id,
              img: defaultProfilePic(name),
            },
          ],
        },
      },
    });

    res.json(itemCreated);
  } catch (err) {
    console.log(err);
    res.json(serverError);
  }
}
export { newItem };
