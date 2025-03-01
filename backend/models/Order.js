const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
  title: String,
  image: String,
  price: Number,
  quantity: { type: Number, default: 1 },
  location: { type: String, default: "" },
  serviceType: { type: String, default: "" },
});

const OrderSchema = new mongoose.Schema({
  email: { type: String, required: true },
  items: [CartItemSchema],
  totalPrice: { type: Number, required: true },
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
