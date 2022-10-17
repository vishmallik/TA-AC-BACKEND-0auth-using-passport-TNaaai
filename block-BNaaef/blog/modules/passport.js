const passport = require("passport");
const GithubStrategy = require("passport-github").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.CLIENT_ID_GITHUB,
      clientSecret: process.env.CLIENT_SECRET_GITHUB,
      callbackURL: "/auth/github/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      let profileData = {
        github_firstname: profile.displayName.split(" ")[0],
        github_lastname: profile.displayName.split(" ")[1],
        email: profile._json.email,
        city: profile._json.location,
      };
      User.findOne({ email: profileData.email }, (err, user) => {
        if (err) return done(err);
        if (!user) {
          User.create(
            profileData,
            (err,
            (newUser) => {
              if (err) return done(err);
              return done(null, newUser);
            })
          );
        }
        done(null, user);
      });
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID_GOOGLE,
      clientSecret: process.env.CLIENT_SECRET_GOOGLE,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      let profileData = {
        google_firstname: profile._json.given_name,
        google_lastname: profile._json.family_name,
        email: profile._json.email,
      };
      User.findOne({ email: profileData.email }, (err, user) => {
        if (err) return done(err);
        if (!user) {
          User.create(
            profileData,
            (err,
            (newUser) => {
              if (err) return done(err);
              return done(null, newUser);
            })
          );
        }
        done(null, user);
      });
    }
  )
);

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if (err) return done(err);
    return done(null, user);
  });
});
