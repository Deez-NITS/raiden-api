import express from "express";
import fileUpload from "express-fileupload";
import { imageUploadOptions } from "../utils/index.js";
import {
  newItem,
  getItem,
  getItemsByProvider,
  updateItem,
  updateImage,
} from "../controllers/item/index.js";

import { authLevel } from "../middlewares/index.js";

const router = express.Router({ mergeParams: true });

router.post("/new", authLevel("provider"), newItem);
router.get("/provider/:id", getItemsByProvider);
router.get("/:id", getItem);
router.patch("/img/:id", fileUpload(imageUploadOptions), updateImage);
router.patch("/:id", authLevel("provider"), updateItem);
export default router;
