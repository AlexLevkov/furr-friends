const mongoose = require("mongoose");
const { ffDb } = require("../../db");

const orderSchema = new mongoose.Schema({
  created: Date,
  orderBy: Object,
  orderFor: Object,
  orderOwner: Object,
  isApproved: mongoose.Schema.Types.Mixed,
});

const Order = ffDb.model("order", orderSchema, "order");

module.exports = Order;
