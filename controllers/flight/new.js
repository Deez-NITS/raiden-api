import {
  error,
  flightExists,
  serverError,
} from "../../globals/errors/index.js";
import { flightCreated } from "../../globals/success/index.js";
import { prisma } from "../../utils/index.js";

/**
 * @description Add a new flight
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function newFlight(req, res) {
  try {
    const { company, flightNumber, start, end, from, to } = req.body;

    if (
      (await prisma.airport.count({
        where: {
          code: from,
        },
      })) === 0
    ) {
      return res.json(error("Source not found."));
    }

    if (
      (await prisma.airport.count({
        where: {
          code: to,
        },
      })) === 0
    ) {
      return res.json(error("Destination not found."));
    }

    if (
      (await prisma.flight.count({
        where: {
          flightNumber,
          company,
          startTime: new Date(start),
          endTime: new Date(end),
          sourceCode: from,
          destinationCode: to,
        },
      })) !== 0
    ) {
      return res.json(flightExists);
    }

    await prisma.flight.create({
      data: {
        flightNumber,
        company,
        startTime: new Date(start),
        endTime: new Date(end),
        sourceCode: from,
        destinationCode: to,
      },
    });

    res.json(flightCreated);
  } catch (err) {
    console.log(err);
    res.json(serverError);
  }
}

export { newFlight };
