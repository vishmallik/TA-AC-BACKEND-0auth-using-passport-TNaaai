const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    firstname: String,
    lastname: String,
    github_firstname: String,
    github_lastname: String,
    google_firstname: String,
    google_lastname: String,
    email: { type: String, unique: true, match: /@/, required: true },
    password: { type: String, minlength: 5 },
    city: String,
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (this.password && this.isModified("password")) {
    bcrypt.hash(this.password, 10, (err, hashed) => {
      if (err) return next(err);
      this.password = hashed;
      return next();
    });
  } else {
    return next();
  }
});

userSchema.methods.fullName = function () {
  return this.firstname + " " + this.lastname;
};

userSchema.methods.verifyPassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, result) => {
    if (err) return next(err);
    return cb(err, result);
  });
};

module.exports = mongoose.model("User", userSchema);
