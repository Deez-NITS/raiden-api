import { errorUploading, serverError } from "../../globals/errors/index.js";
import { imageUploaded } from "../../globals/success/index.js";
import { prisma, uploadImage } from "../../utils/index.js";

async function updateProfileImage(req, res) {
  try {
    const url = await uploadImage(req);
    if (!url) {
      res.json(errorUploading);
    }

    await prisma.provider.update({
      where: {
        id: req.user.id,
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

export { updateProfileImage };
