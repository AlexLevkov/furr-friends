const mongoose = require("mongoose");
const { ffDb } = require("../../db");

const petSchema = new mongoose.Schema({
  name: mongoose.Schema.Types.Mixed,
  type: mongoose.Schema.Types.Mixed,
  imgUrl: mongoose.Schema.Types.Mixed,
  likes: mongoose.Schema.Types.Mixed,
  age: mongoose.Schema.Types.Mixed,
  gender: mongoose.Schema.Types.Mixed,
  size: mongoose.Schema.Types.Mixed,
  color: mongoose.Schema.Types.Mixed,
  isVaccinated: mongoose.Schema.Types.Mixed,
  trainedLevel: mongoose.Schema.Types.Mixed,
  isSafeWithChild: mongoose.Schema.Types.Mixed,
  bio: mongoose.Schema.Types.Mixed,
  owner: mongoose.Schema.Types.Mixed,
});

const Pet = ffDb.model("pet", petSchema, "pet");

module.exports = Pet;
