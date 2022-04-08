import express from "express";

import {
  newItem,
  getItem,
  getItemsByProvider,
  updateItem,
} from "../controllers/item/index.js";

const router = express.Router({ mergeParams: true });

router.post("/new", newItem); // TODO: Update auth level to provider
router.get("/provider/:id", getItemsByProvider);
router.post("/:id", getItem);
router.patch("/:id", updateItem);
export default router;
