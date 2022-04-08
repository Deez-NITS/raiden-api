import { prisma } from "../../utils/index.js";
import {
  airportNotFound,
  invalidId,
  serverError,
} from "../../globals/errors/index.js";
import { success } from "../../globals/success/index.js";
import { validId } from "../../utils/index.js";

/**
 * @description Gets information about
 * an airport
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function getAirport(req, res) {
  try {
    let { id } = req.params;

    if (!validId(id)) {
      console.log(id, parseInt(id));
      return res.json(invalidId);
    }

    id = parseInt(id);

    const airport = await prisma.airport.findFirst({
      where: {
        id,
      },
    });

    if (!airport) {
      return res.json(airportNotFound);
    }

    res.json(success(airport));
  } catch (err) {
    console.log(err);
    res.json(serverError);
  }
}

/**
 *
 * @description Get all providers
 * at a particular airport
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function getProvidersInAirport(req, res) {
  try {
    let { id } = req.params;

    if (!validId(id)) {
      console.log(id, parseInt(id));
      return res.json(invalidId);
    }

    id = parseInt(id);

    const airport = await prisma.airport.findFirst({
      where: {
        id,
      },
    });

    if (!airport) {
      return res.json(airportNotFound);
    }

    const providers = await prisma.provider.findMany({
      where: {
        airportCode: airport.code,
      },
    });

    res.json(success(providers));
  } catch (err) {
    console.log(err);
    res.json(serverError);
  }
}

export { getAirport, getProvidersInAirport };
