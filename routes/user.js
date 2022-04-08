import express from "express";
import fileUpload from "express-fileupload";
import { imageUploadOptions } from "../utils/index.js";
import { authLevel } from "../middlewares/index.js";
import {
  getUser,
  getUserById,
  changePassword,
  updateProfileDetails,
  updateProfileImage,
} from "../controllers/user/index.js";

const router = express.Router({ mergeParams: true });

router.get("/", authLevel(), getUser);
router.patch("/password", authLevel(), changePassword);
router.patch(
  "/img",
  authLevel(),
  fileUpload(imageUploadOptions),
  updateProfileImage
);
router.patch("/details", authLevel(), updateProfileDetails);
router.get("/:id", getUserById);

export default router;
