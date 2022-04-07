import { prisma } from "../../utils/index.js";
import { airportCodeTaken, serverError } from "../../globals/errors/index.js";
import { airportCreated } from "../../globals/success/index.js";

/**
 * @description Adds a new airport
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function newAirport(req, res) {
  try {
    const { name, code, place } = req.body;

    if ((await prisma.airport.count({ where: { code } })) !== 0) {
      return res.json(airportCodeTaken);
    }

    await prisma.airport.create({
      data: {
        name,
        code,
        place,
      },
    });

    res.json(airportCreated);
  } catch (err) {
    console.log(err);
    res.json(serverError);
  }
}

export { newAirport };
