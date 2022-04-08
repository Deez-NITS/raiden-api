import fs from "node:fs";
import { v2 as cloudinary } from "cloudinary";

import { removeWhitespace } from "./string.js";

/**
 *
 * @description Provides a default
 * profile image link for name
 *
 * @param {string} name
 * @returns
 */
function defaultProfilePic(name) {
  return `https://avatars.dicebear.com/api/identicon/${removeWhitespace(
    name
  )}.svg`;
}

/**
 * @description Upload an image
 *
 * @param {import('express').Request} req
 * @returns {string | null} URL of uploaded image
 */
async function uploadImage(req) {
  if (!req.files) {
    return null;
  }

  const file = req.files.image;

  try {
    return await cloudinary.uploader.upload(file.tempFilePath);
  } catch (err) {
    console.log(err);
    return null;
  } finally {
    fs.unlink(file.tempFilePath, () => console.log("Temporary File Deleted"));
  }
}

export { uploadImage, defaultProfilePic };
