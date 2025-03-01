const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors"); // Import CORS

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

const connectDB = require("./config/db");
connectDB();

const userRoutes = require("./routes/userRoutes");
app.use("/api", userRoutes);

const cartRoutes = require("./routes/cartRoutes");
app.use("/api", cartRoutes);

const orderRoutes = require("./routes/orderRoutes");
app.use("/api", orderRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
