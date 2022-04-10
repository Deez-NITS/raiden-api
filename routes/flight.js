import express from "express";
import {
  newFlight,
  getFlight,
  getFlightById,
  getAllFlights,
} from "../controllers/flight/index.js";

// import { blockRoute } from "../middlewares/index.js";

const router = express.Router({ mergeParams: true });

router.get("/all", getAllFlights);
router.post("/new", newFlight);
router.get("/", getFlight);
router.get("/:id", getFlightById);

export default router;
