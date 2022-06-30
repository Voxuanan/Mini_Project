require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const mongoose = require("mongoose");
const routes = require("./routes/routes.js");
const Users = require("./models/userModel");

const app = express();

app.use(
    session({
        resave: false,
        saveUninitialized: true,
        secret: "SECRET",
    })
);

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function (user, cb) {
    cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.facebook_key,
            clientSecret: process.env.facebook_secret,
            callbackURL: process.env.callback_url,
            profileFields: ["id", "displayName", "photos", "email", "birthday"],
        },
        function (accessToken, refreshToken, profile, cb) {
            Users.findOrCreate(profile, function (err, user) {
                return cb(err, user);
            });
        }
    )
);

app.use("/", routes);

const URI = process.env.MONGO_URL;
mongoose.connect(
    URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) throw err;
        console.log("Connected to MongoDB");
    }
);

const port = 5000;

app.listen(port, () => {
    console.log("App listening on port " + port);
});
