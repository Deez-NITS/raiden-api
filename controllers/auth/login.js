import { serverError } from "../../globals/errors/index.js";
import { success } from "../../globals/success/index.js";

/**
 * @description Logs In the user
 *
 * @param {import('express').Request} _
 * @param {import('express').Response} res
 */

async function login(_, res) {
  try {
    res.json(success("Log In Successful"));
  } catch (err) {
    console.log(err);
    res.json(serverError);
  }
}

export { login };
