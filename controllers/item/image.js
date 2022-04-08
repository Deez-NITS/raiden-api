import {
  errorUploading,
  serverError,
  invalidId,
} from "../../globals/errors/index.js";
import { imageUploaded } from "../../globals/success/index.js";
import { prisma, uploadImage, validId } from "../../utils/index.js";

/**
 * @description Updates image
 * of item
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function updateImage(req, res) {
  try {
    let { id } = req.params;

    if (!validId(id)) {
      console.log(id, parseInt(id));
      return res.json(invalidId);
    }

    id = parseInt(id);

    const url = await uploadImage(req);
    if (!url) {
      res.json(errorUploading);
    }

    await prisma.item.update({
      where: {
        id,
      },
      data: {
        img: url,
      },
    });

    res.json(imageUploaded);
  } catch (err) {
    console.log(err);
    res.json(serverError);
  }
}

export { updateImage };
