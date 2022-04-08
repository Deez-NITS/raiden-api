import { orderExists, serverError } from "../../globals/errors/index.js";
import { orderCreated } from "../../globals/success/index.js";
import { prisma } from "../../utils/index.js";

/**
 * @description Creates a new order
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function newOrder(req, res) {
  try {
    const { providerId, flightId, remarks, items } = req.body;

    if (
      (await prisma.order.count({
        where: {
          providerId,
          userId: req.user.id,
          flightId,
          remarks,
        },
      })) !== 0
    ) {
      return res.json(orderExists);
    }

    let itemPromises = [];
    for (let i = 0; i < items.length; i++) {
      itemPromises.push(
        prisma.item.findFirst({
          where: {
            id: items[i],
          },
        })
      );
    }

    const itemData = await Promise.all(itemPromises);

    let price = 0;
    itemData.forEach((item) => {
      price += item.price;
    });

    await prisma.order.create({
      data: {
        providerId,
        userId: req.user.id,
        flightId,
        remarks,
        items,
        price,
      },
    });

    res.json(orderCreated);
  } catch (err) {
    console.log(err);
    res.json(serverError);
  }
}

export { newOrder };
