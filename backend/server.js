const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");
const setupMiddleware = require("./middleware/setupMiddleware");
const routes = require("./routes");

const app = express();

// Connect to MongoDB
connectDB();

// Setup Middleware
setupMiddleware(app);

// Load Routes
app.use("/api", routes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
