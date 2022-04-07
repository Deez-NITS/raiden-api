import express from "express";
import {
  newFlight,
  getFlight,
  getFlightById,
} from "../controllers/flight/index.js";

const router = express.Router({ mergeParams: true });

router.post("/new", newFlight);
router.get("/", getFlight);
router.get("/:id", getFlightById);

export default router;
