import express from "express";

import { authenticated } from "../middlewares/index.js";
import {
  getUser,
  getUserById,
  changePassword,
  updateProfileDetails,
} from "../controllers/user/index.js";

const router = express.Router({ mergeParams: true });

router.get("/", authenticated, getUser);
router.get("/:id", getUserById);
router.patch("/password", authenticated, changePassword);
// router.patch("/img", authenticated, updateProfileImage);
router.patch("/details", authenticated, updateProfileDetails);

export default router;
