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
    const { flightNumber, startTime } = req.body;

    const flights = await prisma.flight.findMany({
      where: {
        flightNumber,
      },
    });

    const day = 1000 * 60 * 60 * 24;
    const today = Math.floor(startTime / day) * day;
    const range = [today, today + day];

    console.log(range);

    let flight;
    for (let i = 0; i < flights.length; i++) {
      if (
        flights[i].startTime <= range[1] &&
        flights[i].startTime >= range[0]
      ) {
        flight = flights[i];
      }
    }

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

async function getAllFlights(req, res) {
  try {
    const flights = await prisma.flight.findMany();

    res.json(success(flights));
  } catch (err) {
    console.log(err);
    res.json(serverError);
  }
}

export { getFlight, getFlightById, getAllFlights };
