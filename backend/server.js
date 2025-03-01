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

const cartRoutes = require("./cartRoutes");
app.use("/api", cartRoutes);

const orderRoutes = require("./orderRoutes");
app.use("/api", orderRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
