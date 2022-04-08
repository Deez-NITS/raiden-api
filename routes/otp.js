import express from "express";

import { newOtp, verifyOtp } from "../controllers/otp/index.js";

const router = express.Router();

router.post("/verify/:type", verifyOtp);
router.post("/new/:type", newOtp);

export default router;
