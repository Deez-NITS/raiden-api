import express from "express";
import { authLevel } from "../middlewares/index.js";
import {
  newOrder,
  getOrder,
  updateOrderStatus,
} from "../controllers/order/index.js";

const router = express.Router();

router.post("/new", authLevel(), newOrder);
router.get("/:id", getOrder);
router.patch("/:id", authLevel("provider"), updateOrderStatus);

export default router;
