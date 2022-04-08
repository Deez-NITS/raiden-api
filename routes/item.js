import express from "express";

import {
  newItem,
  getItem,
  getItemsByProvider,
  updateItem,
} from "../controllers/item/index.js";

import { authLevel } from "../middlewares/index.js";

const router = express.Router({ mergeParams: true });

router.post("/new", authLevel("provider"), newItem);
router.get("/provider/:id", getItemsByProvider);
router.get("/:id", getItem);
router.patch("/:id", authLevel("provider"), updateItem);
export default router;
