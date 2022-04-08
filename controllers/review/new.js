import {
  serverError,
  providerNotFound,
  orderNotFound,
  reviewExists,
} from "../../globals/errors/index.js";
import { reviewCreated } from "../../globals/success/index.js";
import { prisma } from "../../utils/index.js";

/**
 *
 * @description Write a new review
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function newReview(req, res) {
  try {
    const { score, providerId, comment, orderId } = req.body;

    const provider = await prisma.provider.findFirst({
      where: {
        id: providerId,
      },
    });

    if (!provider) {
      return res.json(providerNotFound);
    }

    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
      },
    });

    if (!order) {
      return res.json(orderNotFound);
    }

    if (
      (await prisma.review.count({
        where: {
          userId: req.user.id,
          providerId,
        },
      })) !== 0
    ) {
      return res.json(reviewExists);
    }

    await prisma.review.create({
      data: {
        userId: req.user.id,
        score,
        providerId,
        orderId,
        comment,
      },
    });

    res.json(reviewCreated);
  } catch (err) {
    console.log(err);
    res.json(serverError);
  }
}

export { newReview };
