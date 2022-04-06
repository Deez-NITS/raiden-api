import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
import { prisma } from "../utils/index.js";

/**
 * @description Initializes passport for
 * authentication.
 */
function initializePassport() {
  // User sign-in
  passport.use(
    new LocalStrategy(
      {
        // Changing default username-password form field
        // values of passport
        usernameField: "email",
        passwordField: "password",
        session: true,
      },
      async (email, password, done) => {
        const user = await prisma.user.findFirst({
          where: {
            email,
          },
        });

        // User Not Found
        if (!user) {
          return done("User not found", false);
        }

        // Wrong Password
        if (!(await bcrypt.compare(password, user.password))) {
          return done("Wrong Password", false);
        }

        // User Not Verified
        if (!user.verified) {
          return done("User not verified", false);
        }

        // Successful Login
        return done(null, user);
      }
    )
  );

  // Sets the cookie
  passport.serializeUser((user, done) => {
    done(null, {
      email: user.email,
    });
  });

  // Reads the cookie and sets `req.user`
  passport.deserializeUser(async (data, done) => {
    try {
      let user = await prisma.user.findFirst({
        where: {
          email: data.email,
        },
      });

      done(null, user);
    } catch (err) {
      console.log(err);
      done("User Not Found", false);
    }
  });
}

export { initializePassport };
