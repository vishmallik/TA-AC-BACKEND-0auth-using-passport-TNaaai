const express = require("express");
const passport = require("passport");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  return res.render("index", { title: "Express" });
});

router.get("/success", (req, res, next) => {
  return res.render("success");
});

router.get("/failure", (req, res, next) => {
  return res.render("failure");
});

router.get("/auth/github", passport.authenticate("github"));

router.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/failure",
  }),
  (req, res) => {
    return res.redirect("/success");
  }
);

module.exports = router;
