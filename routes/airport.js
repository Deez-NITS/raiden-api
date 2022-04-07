import express from "express";

import {
  newAirport,
  getAirport,
  updateAirport,
} from "../controllers/airport/index.js";

const router = express.Router({ mergeParams: true });

router.post("/new", newAirport);
router.get("/:id", getAirport);
router.patch("/:id", updateAirport);

export default router;
