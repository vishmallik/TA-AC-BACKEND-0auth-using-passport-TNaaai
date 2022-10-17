const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  name: { type: String },
  email: { type: String, unique: true, required: true, match: /@/ },
  photo: { type: String },
});

module.exports = mongoose.model("User", userSchema);
