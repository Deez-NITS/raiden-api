import express from "express";

const router = express.Router({ mergeParams: true });

import {
  newReview,
  getScoreOfProvider,
  getReviewById,
} from "../controllers/review/index.js";

router.post("/new", newReview);
router.get("/score/:id", getScoreOfProvider);
router.get("/:id", getReviewById);

export default router;
