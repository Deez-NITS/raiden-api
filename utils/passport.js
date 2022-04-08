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
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        const { type } = req.params;

        let identity;
        if (type === "provider") {
          identity = await prisma.provider.findFirst({
            where: {
              email,
            },
          });
        } else {
          identity = await prisma.user.findFirst({
            where: {
              email,
            },
          });
        }

        // User Not Found
        if (!identity) {
          return done("User not found", false);
        }

        // Wrong Password
        if (!(await bcrypt.compare(password, identity.password))) {
          return done("Wrong Password", false);
        }

        // User Not Verified
        if (!identity.verified) {
          return done("User not verified", false);
        }

        // Successful Login
        return done(null, {
          role: type === "provider" ? "provider" : "user",
          ...identity,
        });
      }
    )
  );

  // Sets the cookie
  passport.serializeUser((user, done) => {
    done(null, {
      email: user.email,
      role: user.role,
    });
  });

  // Reads the cookie and sets `req.user`
  passport.deserializeUser(async (data, done) => {
    try {
      let user;

      if (data.role === "provider") {
        user = await prisma.provider.findFirst({
          where: {
            email: data.email,
          },
        });
      } else {
        user = await prisma.user.findFirst({
          where: {
            email: data.email,
          },
        });
      }

      done(null, { role: data.role, ...user });
    } catch (err) {
      console.log(err);
      done("User Not Found", false);
    }
  });
}

export { initializePassport };
