import express from "express";

import { newOtp, verifyOtp } from "../controllers/otp/index.js";

const router = express.Router();

router.post("/verify", verifyOtp);
router.post("/new", newOtp);

export default router;
