import {
  flightNotFound,
  serverError,
  invalidId,
} from "../../globals/errors/index.js";
import { success } from "../../globals/success/index.js";
import { prisma, validId } from "../../utils/index.js";

/**
 * @description Get flight
 * details
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function getFlight(req, res) {
  try {
    const { flightNumber, startTime, endTime } = req.body;

    const flight = await prisma.flight.findFirst({
      where: {
        flightNumber,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
      },
    });

    if (!flight) {
      return res.json(flightNotFound);
    }

    res.json(success(flight));
  } catch (err) {
    console.log(err);
    res.json(serverError);
  }
}

/**
 * @description Get flight
 * details
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function getFlightById(req, res) {
  try {
    let { id } = req.params;

    if (!validId(id)) {
      console.log(id, parseInt(id));
      return res.json(invalidId);
    }

    id = parseInt(id);

    const flight = await prisma.flight.findFirst({
      where: {
        id,
      },
    });

    if (!flight) {
      return res.json(flightNotFound);
    }

    res.json(success(flight));
  } catch (err) {
    console.log(err);
    res.json(serverError);
  }
}

export { getFlight, getFlightById };
