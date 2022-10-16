var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/logout", function (req, res, next) {
  req.session.destroy();
  res.clearCookie("connect.sid");
  return res.redirect("/");
});

module.exports = router;
