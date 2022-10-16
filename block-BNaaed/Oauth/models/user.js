const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true, minlength: 5 },
});

module.exports = mongoose.model("User", userSchema);
