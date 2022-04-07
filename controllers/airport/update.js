import { prisma } from "../../utils/index.js";
import {
  serverError,
  userUnauthenticated,
  invalidId,
} from "../../globals/errors/index.js";
import { airportUpdated } from "../../globals/success/index.js";
import { validId } from "../../utils/index.js";

/**
 * @description Adds a new airport
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function updateAirport(req, res) {
  try {
    let { id } = req.params;

    if (!validId(id)) {
      console.log(id, parseInt(id));
      return res.json(invalidId);
    }

    id = parseInt(id);

    const { name, place } = req.body;

    if ((await prisma.airport.count({ where: { id } })) === 0) {
      return res.json(userUnauthenticated);
    }

    await prisma.airport.update({
      where: {
        id,
      },
      data: {
        name,
        place,
      },
    });

    res.json(airportUpdated);
  } catch (err) {
    console.log(err);
    res.json(serverError);
  }
}

export { updateAirport };
