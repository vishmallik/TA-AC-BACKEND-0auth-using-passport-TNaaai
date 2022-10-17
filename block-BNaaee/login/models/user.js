const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  email: { type: String, unique: true, required: true, match: /@/ },
  githubName: { type: String },
  googleName: { type: String },
  githubUsername: { type: String },
  googlePhoto: { type: String },
  githubPhoto: { type: String },
  password: { type: String },
});

userSchema.pre("save", function (next) {
  if (this.password || this.isModified("password")) {
    bcrypt.hash(this.password, 10, (err, hashed) => {
      if (err) return next(err);
      this.password = hashed;
      next();
    });
  } else {
    next();
  }
});

userSchema.methods.verifyPassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, result) => {
    return cb(err, result);
  });
};

module.exports = mongoose.model("User", userSchema);
