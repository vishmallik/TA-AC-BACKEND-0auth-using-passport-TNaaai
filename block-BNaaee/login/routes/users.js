var express = require("express");
const User = require("../models/user");
var router = express.Router();
const passport = require("passport");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", (req, res, next) => {
  let { email, password } = req.body;
  if (!email && !password) {
    req.flash("error", "Email/Password cannot be left blank");
    res.redirect("/");
  }
  User.create(req.body, (err, user) => {
    if (err) {
      console.log(err);
      if (err.code == 11000) {
        req.flash("error", "Email is already registered");
        res.redirect("/");
      }
      if (err.name == "ValidationError") {
        req.flash("error", "Password cannot be less than 5 characters");
        res.redirect("/");
      }
      return next(err);
    }
    req.flash("success", "User registered successfully");
    res.redirect("/");
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/failure",
  }),
  (req, res) => {
    res.redirect("/users");
  }
);

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.clearCookie("connect.sid");
  res.redirect("/");
});

module.exports = router;
