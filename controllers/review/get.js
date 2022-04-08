import {
  serverError,
  invalidId,
  providerNotFound,
  reviewNotFound,
} from "../../globals/errors/index.js";
import { validId, prisma } from "../../utils/index.js";
import { success } from "../../globals/success/index.js";

/**
 *
 * @description Get score of
 * provider
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
async function getScoreOfProvider(req, res) {
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

    const reviews = await prisma.review.findMany({
      where: {
        providerId: id,
      },
    });

    let score = 0;
    for (let i = 0; i < reviews.length; i++) {
      score += reviews[i].score;
    }

    if (reviews.length === 0) {
      res.json(success(null));
    } else {
      res.json(success(score / reviews.length));
    }
  } catch (err) {
    console.log(err);
    res.json(serverError);
  }
}

/**
 *
 * @description Gets review details
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function getReviewById(req, res) {
  try {
    let { id } = req.params;

    if (!validId(id)) {
      console.log(id, parseInt(id));
      return res.json(invalidId);
    }

    id = parseInt(id);

    const review = await prisma.review.findFirst({
      where: {
        id,
      },
    });

    if (!review) {
      return res.json(reviewNotFound);
    }

    res.json(success(review));
  } catch (err) {
    console.log(err);
    res.json(serverError);
  }
}

export { getScoreOfProvider, getReviewById };
