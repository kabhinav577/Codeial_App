const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

// Authenticate Using Passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async function (email, password, done) {
      try {
        // Find an User and establish the identity
        const user = await User.findOne({ email: email });
        if (!user || user.password != password) {
          console.log("Invalid Credentials");
          return done(null, false);
        }

        return done(null, user);
      } catch (err) {
        console.log("Error in Finding User --> Passport");
        return done(err);
      }
    }
  )
);

// Serializing the User to decide whichk key is to be kept in the Cookies
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserializing the User from the key in the Cookies
 passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    return done(null, user);
  } catch (err) {
    console.log("Error in Finding User --> Passport");
    return done(err);
  }
});


// check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
  // if the user is signed in, then pass on the request to the next function(controller's action)
  if (req.isAuthenticated()){
      return next();
  }

  // if the user is not signed in
  return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
  if (req.isAuthenticated()){
      // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
      res.locals.user = req.user;
  }
  // console.log(res.locals.user);

  next();
}


module.exports = passport;