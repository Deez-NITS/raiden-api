import bcrypt from "bcrypt";

/**
 *
 * @description Hashes the given text
 * using bcrypt
 *
 * @param {string} text
 * @returns {Promise<string>} The hashed text
 */
async function hash(text) {
  try {
    const salt = await bcrypt.genSalt();
    const hashedText = await bcrypt.hash(text, salt);

    return hashedText;
  } catch (err) {
    console.log(err);
  }
}

export { hash };
