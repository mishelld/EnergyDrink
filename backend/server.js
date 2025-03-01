const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors"); // Import CORS
const setupMiddleware = require("./middleware/setupMiddleware");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
require("dotenv").config();

// Connect to MongoDB
connectDB();

// Setup Middleware
setupMiddleware(app);

const userRoutes = require("./routes/userRoutes");
app.use("/api", userRoutes);

const cartRoutes = require("./routes/cartRoutes");
app.use("/api", cartRoutes);

const orderRoutes = require("./routes/orderRoutes");
app.use("/api", orderRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
