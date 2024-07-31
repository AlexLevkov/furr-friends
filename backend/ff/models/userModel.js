const mongoose = require("mongoose");
const { ffDb } = require("../../db");

const userSchema = new mongoose.Schema({
  username: mongoose.Schema.Types.Mixed,
  password: mongoose.Schema.Types.Mixed,
  fullname: mongoose.Schema.Types.Mixed,
  isAdmin: mongoose.Schema.Types.Mixed,
  about: mongoose.Schema.Types.Mixed,
  avatar: mongoose.Schema.Types.Mixed,
});

const User = ffDb.model("user", userSchema, "user");

module.exports = User;
