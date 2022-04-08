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

export { defaultProfilePic };
