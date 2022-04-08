import express from "express";

import {
  newAirport,
  getAirport,
  updateAirport,
  getProvidersInAirport,
} from "../controllers/airport/index.js";

import { blockRoute } from "../middlewares/index.js";

const router = express.Router({ mergeParams: true });

router.post("/new", blockRoute, newAirport);
router.get("/:id/providers", getProvidersInAirport);
router.get("/:id", getAirport);
router.patch("/:id", blockRoute, updateAirport);

export default router;
