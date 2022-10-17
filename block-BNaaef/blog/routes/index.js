const express = require("express");
const passport = require("passport");
const router = express.Router();
const Article = require("../models/article");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Blog" });
});

router.get("/auth/github", passport.authenticate("github"));

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/user/login" }),
  (req, res, next) => {
    Article.find({}, (err, articles) => {
      if (err) return next(err);
      return res.render("article", { articles });
    });
  }
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/user/login" }),
  (req, res, next) => {
    Article.find({}, (err, articles) => {
      if (err) return next(err);
      return res.render("article", { articles });
    });
  }
);

module.exports = router;
