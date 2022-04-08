/* eslint-disable camelcase */
import { v2 as cloudinary } from "cloudinary";
import { FILE_UPLOAD_LIMIT } from "../globals/constants.js";

function initializeCloudinary() {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

/**
 * @description Cloudinary file upload options
 */
const imageUploadOptions = {
  useTempFiles: true,
  limits: {
    fileSize: FILE_UPLOAD_LIMIT,
  },
  abortOnLimit: true,
  safeFileNames: true,
  preserveExtension: 5,
};

export { initializeCloudinary, imageUploadOptions };
