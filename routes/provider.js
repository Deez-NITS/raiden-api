import express from "express";
import fileUpload from "express-fileupload";
import { imageUploadOptions } from "../utils/index.js";
import { authLevel } from "../middlewares/index.js";
import {
  getProvider,
  changePassword,
  updateProfileDetails,
  getProviderById,
  updateProfileImage,
} from "../controllers/provider/index.js";

const router = express.Router({ mergeParams: true });

router.get("/", authLevel("provider"), getProvider);
router.patch("/password", authLevel("provider"), changePassword);
router.patch(
  "/img",
  authLevel("provider"),
  fileUpload(imageUploadOptions),
  updateProfileImage
);
router.patch("/details", authLevel("provider"), updateProfileDetails);
router.get("/:id", getProviderById);

export default router;
