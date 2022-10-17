const User = require("../models/user");

module.exports = {
  isLoggedIn: (req, res, next) => {
    if (req.session && (req.session.userId || req.session.passport.user)) {
      next();
    } else {
      req.flash("error", "Please Login");
      res.redirect("/users/login");
    }
  },
  userData: (req, res, next) => {
    let userId =
      req.session &&
      (req.session.userId ||
        (req.session.passport && req.session.passport.user));
    if (userId) {
      User.findById(
        userId,
        "google_firstname github_firstname firstname email",
        (err, user) => {
          if (err) return next(err);
          res.locals.user = user;
          req.user = user;
          return next();
        }
      );
    } else {
      res.locals.user = null;
      req.user = null;
      return next();
    }
  },
};
