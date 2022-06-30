const passport = require("passport");
const express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
    res.json({ msg: "Hello" });
});

router.get("/profile", isLoggedIn, function (req, res) {
    res.json({
        user: req.user,
    });
});

router.get("/error", isLoggedIn, function (req, res) {
    res.json({ msg: "Login fail" });
});

router.get(
    "/auth/facebook",
    passport.authenticate("facebook", {
        scope: ["public_profile", "email", "user_birthday"],
    })
);

router.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
        successRedirect: "/profile",
        failureRedirect: "/error",
    })
);

router.get("/logout", function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/");
}

module.exports = router;
