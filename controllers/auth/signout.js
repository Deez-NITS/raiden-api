import { serverError } from "../../globals/errors/index.js";
import { userLoggedOut } from "../../globals/success/index.js";

/**
 * @description Logs Out a user
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function userSignOut(req, res) {
  try {
    req.logout();
    res.json(userLoggedOut);
  } catch (err) {
    console.log(err);
    res.json(serverError);
  }
}

export { userSignOut };
