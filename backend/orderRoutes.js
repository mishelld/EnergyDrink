const express = require("express");
const Cart = require("./models/Cart");
const Order = require("./models/Order");
const User = require("./models/User");

const router = express.Router();

router.post("/cart/checkout/:email", async (req, res) => {
  const { email } = req.params;

  try {
    // Find the user's cart
    const cart = await Cart.findOne({ email });

    if (!cart || cart.items.length === 0) {
      return res.status(404).json({ message: "Cart is empty or not found" });
    }

    // Calculate total price
    const totalPrice = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Create a new order
    const newOrder = new Order({
      email,
      items: cart.items, // Copy items from cart
      totalPrice,
      status: "pending",
      createdAt: new Date(),
    });

    // Save the order
    await newOrder.save();

    // Increment order count for the user
    await User.findOneAndUpdate({ email }, { $inc: { orderCount: 1 } });

    // Delete the cart
    await Cart.deleteOne({ email });

    res
      .status(200)
      .json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Error processing order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
