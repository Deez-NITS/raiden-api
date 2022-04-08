import express from "express";

import { authLevel } from "../middlewares/index.js";
import {
  getProvider,
  changePassword,
  updateProfileDetails,
  getProviderById,
} from "../controllers/provider/index.js";

const router = express.Router({ mergeParams: true });

router.get("/", authLevel("provider"), getProvider);
router.patch("/password", authLevel("provider"), changePassword);
// router.patch("/img", updateProfileImage);
router.patch("/details", authLevel("provider"), updateProfileDetails);
router.get("/:id", getProviderById);

export default router;
