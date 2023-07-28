const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
// const { promisify } = require("util");
const User = require("../models/user");

passport.use(
  new googleStrategy(
    {
      clientID:
        "122142816625-mnuj9cb21fdd9u1voer990b4macuoe8t.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3000/users/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const user = await User.findOne({
            email: profile.emails[0].value,
          });

        // console.log(accessToken, refreshToken);
        // console.log(profile);

        if (user) {
          // If Found return from request
          return done(null, user);
        } else {
          // if not found, create the user and set it as req.user
          const newUser = User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: crypto.randomBytes(20).toString("hex"),
          });

          return done(null, newUser);
        }
      } catch (err) {
        console.log("error in google strategy-passport", err);
        return done(err);
      }
    }
  )
);

module.exports = passport;
