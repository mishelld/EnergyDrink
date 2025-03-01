const express = require("express");
const cors = require("cors");

const setupMiddleware = (app) => {
  // Enable CORS
  app.use(
    cors({
      origin: "http://localhost:3000", // Adjust as needed
      methods: "GET, POST, PUT, DELETE",
      allowedHeaders: "Content-Type, Authorization",
    })
  );

  // Middleware for parsing JSON
  app.use(express.json());
};

module.exports = setupMiddleware;
