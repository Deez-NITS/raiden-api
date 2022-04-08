import {
  serverError,
  unauthorizedAccess,
  userUnauthenticated,
} from "../globals/errors/index.js";
import { error } from "../globals/errors/error.js";

/**
 *
 * @description Checks if user requesting a route
 * is authenticated or not (sends a failure if not
 * authenticated)
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
async function authenticated(req, res, next) {
  try {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.json(userUnauthenticated);
    }
  } catch (err) {
    console.log(err);
    res.json(serverError);
  }
}

/**
 * @description Catch the errors of passport
 * on login and send them as JSON
 */
async function loginErrors(err, _, res, next) {
  if (err) {
    res.json(error(err));
  } else {
    next();
  }
}

/**
 * @description Checks if user has permission
 * required for particular route.
 *
 * @param level Role needed to access route
 */
function authLevel(level = "user") {
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} req
   */
  return async function (req, res, next) {
    if (!req.isAuthenticated()) {
      res.json(userUnauthenticated);
    } else if (level === req.user.role) {
      next();
    } else {
      res.json(unauthorizedAccess);
    }
  };
}

/**
 * @description Blocks a route
 */
async function blockRoute(req, res) {
  res.json(unauthorizedAccess);
}

export { authenticated, loginErrors, authLevel, blockRoute };
