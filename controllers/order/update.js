import {
  serverError,
  invalidId,
  orderNotFound,
} from "../../globals/errors/index.js";
import { orderStatusUpdated } from "../../globals/success/index.js";
import { prisma, validId } from "../../utils/index.js";

/**
 * @description Updates order status
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns
 */
async function updateOrderStatus(req, res) {
  try {
    const { updatedStatus } = req.body;
    let { id } = req.params;

    if (!validId(id)) {
      console.log(id, parseInt(id));
      return res.json(invalidId);
    }

    id = parseInt(id);

    const order = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!order) {
      return res.json(orderNotFound);
    }

    await prisma.order.update({
      where: {
        id,
      },
      data: {
        status: updatedStatus,
      },
    });

    res.json(orderStatusUpdated);
  } catch (err) {
    console.log(err);
    res.json(serverError);
  }
}

export { updateOrderStatus };
