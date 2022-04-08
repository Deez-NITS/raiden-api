import express from "express";

import { authLevel } from "../middlewares/index.js";
import {
  getUser,
  getUserById,
  changePassword,
  updateProfileDetails,
} from "../controllers/user/index.js";

const router = express.Router({ mergeParams: true });

router.get("/", authLevel(), getUser);
router.patch("/password", authLevel(), changePassword);
// router.patch("/img", updateProfileImage);
router.patch("/details", authLevel(), updateProfileDetails);
router.get("/:id", getUserById);

export default router;
