const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
  title: String,
  image: String,
  price: Number,
  quantity: { type: Number, default: 1 },
  location: { type: String, default: "" },
  serviceType: { type: String, default: "" },
});

const CartSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  items: [CartItemSchema],
});

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
