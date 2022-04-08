import {
  serverError,
  invalidId,
  orderNotFound,
} from "../../globals/errors/index.js";
import { validId } from "../../utils/index.js";
import { prisma } from "../../utils/index.js";
import { success } from "../../globals/success/index.js";

/**
 *
 * @description Gets order details
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function getOrder(req, res) {
  try {
    let { id } = req.params;

    if (!validId(id)) {
      console.log(id, parseInt(id));
      return res.json(invalidId);
    }

    id = parseInt(id);

    const order = await prisma.order.findFirst({
      where: {
        id,
      },
    });

    if (!order) {
      return res.json(orderNotFound);
    }

    res.json(success(order));
  } catch (err) {
    console.log(err);
    res.json(serverError);
  }
}

export { getOrder };
