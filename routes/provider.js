import express from "express";

import { authenticated } from "../middlewares/index.js";
import {
  getProvider,
  changePassword,
  updateProfileDetails,
  getProviderById,
} from "../controllers/provider/index.js";

const router = express.Router({ mergeParams: true });

router.get("/", authenticated, getProvider);
router.patch("/password", authenticated, changePassword);
// router.patch("/img", authenticated, updateProfileImage);
router.patch("/details", authenticated, updateProfileDetails);
router.get("/:id", getProviderById);

export default router;
