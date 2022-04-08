import express from "express";
import { authenticated } from "../middlewares/index.js";
import {
  newOrder,
  getOrder,
  updateOrderStatus,
} from "../controllers/order/index.js";

const router = express.Router();

router.post("/new", authenticated, newOrder);
router.get("/:id", getOrder);
router.patch("/:id", authenticated, updateOrderStatus); // TODO: Update auth level to provider

export default router;
