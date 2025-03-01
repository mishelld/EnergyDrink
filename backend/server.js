const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cors = require("cors"); // Import CORS
const User = require("./models/User");
const Cart = require("./models/Cart");
const Order = require("./models/Order");

dotenv.config();

const app = express();
require("dotenv").config();

// **Enable CORS Middleware**
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from your frontend
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: "Content-Type, Authorization",
  })
);

// Middleware to parse JSON
app.use(express.json());

const mongoURI = `mongodb+srv://mish:mish@energy-drink.vx7dt.mongodb.net/?retryWrites=true&w=majority&appName=energy-drink`;

// MongoDB Connection
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

const userRoutes = require("./auth");
app.use("/api", userRoutes);

app.post("/api/cart/checkout/:email", async (req, res) => {
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

const cartRoutes = require("./cartRoutes");
app.use("/api", cartRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
