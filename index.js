const express = require("express");
const cookieParser = require("cookie-parser");
const port = 3000;
const expressLayout = require("express-ejs-layouts");

const app = express();
const db = require("./config/mongoose");
// Used for Session Cookies
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const MongoStore = require("connect-mongo");
const sassMiddleware = require("node-sass-middleware");

// MiddleWare
app.use(
  sassMiddleware({
    src: "./assets/scss", // where to look for scss
    dest: "./assets/css", // where to deliver the css which is made using scss
    debug: false, // this will print errors if any
    outputStyle: "extended", // similar to word-wrap thing
    prefix: "/css", // unclear concept
  })
);
app.use(express.urlencoded());
app.use(expressLayout);

app.use(cookieParser());

app.use(express.static("./assets"));

app.set("view engine", "ejs");
app.set("views", "views");

app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

app.use(
  session({
    name: "codeial",
    // TODO change the secret key before Deployment in Production mode
    secret: "laterChange",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost/Codeial_development",
      dbName: "Codeial_development",
      stringify: false,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// Use Express-router
app.use("/", require("./routes/index"));

// server is running on Port successfully or not
app.listen(port, (err) => {
  if (err) {
    console.log(`Error in running on Port :: ${port}`);
    return;
  }

  console.log(`Server is Running on Port :: ${port}`);
});
