const passport = require("passport");
const GithubStrategy = require("passport-github2").Strategy;
const User = require("../models/user");

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      let profileData = {
        name: profile.displayName,
        username: profile.username,
        photo: profile._json.avatar_url,
      };

      User.findOne({ username: profile.username }, (err, user) => {
        if (err) return done(err);
        if (!user) {
          User.create(profileData, (err, newUser) => {
            if (err) return done(err);
            return done(null, newUser);
          });
        }
        return done(null, user);
      });
    }
  )
);

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, "name username", (err, user) => {
    return done(err, user);
  });
});
